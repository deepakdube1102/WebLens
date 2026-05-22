import { analyzeUrlWithSimulation } from './auditSimulator';

/**
 * Service to interface with the Google PageSpeed Insights API.
 * Safely fetches live audits and translates the raw JSON payload into our
 * clean, unified dashboard format. Falls back gracefully to simulation on failure.
 */
export const runPageSpeedAudit = async (url, apiKey = '', mode = 'live') => {
  // Strict argument type checking & sanitization to prevent runtime exceptions
  const safeUrl = typeof url === 'string' ? url.trim() : 'https://example.com';

  if (mode === 'simulation') {
    return analyzeUrlWithSimulation(safeUrl);
  }

  let cleanUrl = safeUrl;
  if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
    cleanUrl = 'https://' + cleanUrl;
  }

  // If no API Key is provided or it's a simulated run request, we can use the simulation.
  // However, PageSpeed API actually has a free tier that works WITHOUT a key for standard requests!
  // We will call the public API, but if the request fails (due to CORS or rate limit), we fall back.
  try {
    const categories = ['performance', 'seo', 'accessibility', 'best-practices'];
    const categoryParams = categories.map(cat => `category=${cat}`).join('&');
    let endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(cleanUrl)}&${categoryParams}`;
    
    if (apiKey) {
      endpoint += `&key=${apiKey}`;
    }

    // No JS-imposed timeout — the Google Lighthouse API can legitimately take 30-90 seconds
    // for complex sites. Let the browser manage its own network timeout.
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Google API returned status ${response.status}`);
    }

    const data = await response.json();

    // Explicitly check for a Lighthouse-level error embedded in a 200 response
    // (e.g. "Lighthouse returned error: Something went wrong" for blocked sites)
    if (data.error) {
      const msg = data.error.message || 'Lighthouse error';
      throw new Error(msg);
    }

    const lh = data.lighthouseResult;

    if (!lh || !lh.categories) {
      throw new Error("Invalid response format from Google PageSpeed API");
    }

    // Extract categories
    const perfScore = Math.round((lh.categories.performance?.score || 0) * 100);
    const seoScore = Math.round((lh.categories.seo?.score || 0) * 100);
    const accessScore = Math.round((lh.categories.accessibility?.score || 0) * 100);
    const bpScore = Math.round((lh.categories['best-practices']?.score || 0) * 100);
    const overallScore = Math.round((perfScore + seoScore + accessScore + bpScore) / 4);

    // Extract metrics
    const getMetric = (id, defaultLabel) => {
      const audit = lh.audits?.[id];
      if (!audit) return { value: 0, unit: '', label: defaultLabel, rating: 'poor' };
      
      const numVal = audit.numericValue || 0;
      let val = numVal;
      let unit = '';
      
      if (id === 'total-blocking-time') {
        val = Math.round(numVal);
        unit = 'ms';
      } else if (id === 'cumulative-layout-shift') {
        val = parseFloat(numVal.toFixed(3));
        unit = '';
      } else {
        val = parseFloat((numVal / 1000).toFixed(1));
        unit = 's';
      }

      let rating = 'good';
      if (id === 'first-contentful-paint') {
        rating = val < 1.8 ? 'good' : val < 3.0 ? 'needs-improvement' : 'poor';
      } else if (id === 'largest-contentful-paint') {
        rating = val < 2.5 ? 'good' : val < 4.0 ? 'needs-improvement' : 'poor';
      } else if (id === 'cumulative-layout-shift') {
        rating = val < 0.1 ? 'good' : val < 0.25 ? 'needs-improvement' : 'poor';
      } else if (id === 'total-blocking-time') {
        rating = val < 150 ? 'good' : val < 350 ? 'needs-improvement' : 'poor';
      } else if (id === 'speed-index') {
        rating = val < 3.4 ? 'good' : val < 5.8 ? 'needs-improvement' : 'poor';
      }

      return {
        value: val,
        unit,
        label: audit.title || defaultLabel,
        rating
      };
    };

    const metrics = {
      fcp: getMetric('first-contentful-paint', 'First Contentful Paint'),
      lcp: getMetric('largest-contentful-paint', 'Largest Contentful Paint'),
      cls: getMetric('cumulative-layout-shift', 'Cumulative Layout Shift'),
      tbt: getMetric('total-blocking-time', 'Total Blocking Time'),
      speedIndex: getMetric('speed-index', 'Speed Index')
    };

    // Extract audits status
    const parseAudits = (categoryKeys, fallbackTitle) => {
      return categoryKeys.map(key => {
        const audit = lh.audits?.[key];
        return {
          title: audit?.title || key.replace(/-/g, ' '),
          status: (audit?.score === null || audit?.score >= 0.9) ? 'pass' : 'fail',
          details: audit?.description || 'Audited successfully.'
        };
      });
    };

    const audits = {
      performance: parseAudits([
        'render-blocking-resources',
        'unused-javascript',
        'unused-css-rules',
        'uses-optimized-images',
        'uses-responsive-images'
      ]),
      seo: parseAudits([
        'document-title',
        'meta-description',
        'font-size',
        'link-text',
        'crawlable-anchors',
        'robots-txt'
      ]),
      accessibility: parseAudits([
        'image-alt',
        'button-name',
        'color-contrast',
        'document-title',
        'html-has-lang',
        'label'
      ]),
      bestPractices: parseAudits([
        'is-on-https',
        'errors-in-console',
        'external-anchors-use-rel-noopener',
        'doctype',
        'font-display'
      ])
    };

    // Generate actionable recommendations from the failed audits
    const recommendations = [];
    const collectRecs = (catId, lhCatKey) => {
      const auditRefs = lh.categories[lhCatKey]?.auditRefs || [];
      auditRefs.forEach(ref => {
        const audit = lh.audits?.[ref.id];
        if (audit && audit.score !== null && audit.score < 0.9 && recommendations.length < 6) {
          let scoreImpact = 5;
          let impact = 'Medium';
          if (ref.weight >= 5) {
            scoreImpact = 10;
            impact = 'High';
          } else if (ref.weight >= 10) {
            scoreImpact = 15;
            impact = 'Critical';
          }

          let solution = 'Review this item inside your codebase and optimize its structure.';
          let code = '';

          // Add some standard solutions based on audit IDs to make recommendations feel real
          if (ref.id === 'uses-optimized-images') {
            solution = 'Compress all heavy imagery and replace with high-efficiency formats like WebP or AVIF.';
            code = `<!-- Before -->\n<img src="banner.jpg" />\n\n<!-- Optimized -->\n<img src="banner.webp" alt="Compressed Banner" loading="lazy" />`;
          } else if (ref.id === 'render-blocking-resources') {
            solution = 'Defer load scripts and split heavy sheets using async attributes or media preloads.';
            code = `<script src="analytics.js" defer></script>\n<link rel="preload" href="styles.css" as="style">`;
          } else if (ref.id === 'color-contrast') {
            solution = 'Increase contrast between text and background to satisfy WCAG AA ratio standards (4.5:1).';
            code = `/* Fix text contrast */\n.btn-glow {\n  color: #ffffff; /* Contrast increased */\n  background-color: #6366f1;\n}`;
          } else if (ref.id === 'meta-description') {
            solution = 'Supply a descriptive, high-quality meta tag under 160 characters in the page header.';
            code = `<meta name="description" content="Explore WebLens - the high performance SEO auditing suite." />`;
          } else if (ref.id === 'image-alt') {
            solution = 'Include descriptive text labels inside the alt attribute for screen-readers.';
            code = `<img src="logo-neon.png" alt="WebLens dynamic neon logo element" />`;
          }

          recommendations.push({
            id: ref.id,
            category: catId,
            impact,
            scoreImpact,
            issue: audit.title,
            description: audit.description?.replace(/\[Learn more\]\(.*\)\.?/g, '') || 'Quality check did not pass.',
            solution,
            code
          });
        }
      });
    };

    collectRecs('Performance', 'performance');
    collectRecs('SEO', 'seo');
    collectRecs('Accessibility', 'accessibility');
    collectRecs('Best Practices', 'best-practices');

    let domain = 'example.com';
    try {
      domain = new URL(cleanUrl).hostname.replace('www.', '');
    } catch (e) {
      domain = cleanUrl.replace('https://', '').replace('http://', '').split('/')[0];
    }

    return {
      url,
      domain,
      dataSource: 'live',
      analyzedAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      isHttps: cleanUrl.startsWith('https://'),
      scores: {
        overall: overallScore,
        performance: perfScore,
        seo: seoScore,
        accessibility: accessScore,
        bestPractices: bpScore
      },
      metrics,
      audits,
      recommendations
    };

  } catch (error) {
    // Determine the reason for fallback for UI display
    const isLighthouseBlock = error.message?.toLowerCase().includes('lighthouse') ||
                              error.message?.toLowerCase().includes('something went wrong');
    const fallbackReason = isLighthouseBlock
      ? 'This site blocks automated Lighthouse audits. Showing estimated data based on domain profile.'
      : `Live API unavailable (${error.message}). Showing estimated data.`;

    console.warn('Live PageSpeed Audit failed, falling back to simulated data. Reason:', error.message);
    const simResult = await analyzeUrlWithSimulation(safeUrl);
    return { ...simResult, dataSource: 'simulated', fallbackReason };
  }
};
