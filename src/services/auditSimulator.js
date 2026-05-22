/**
 * High-fidelity domain-specific website audit simulator.
 * Generates highly realistic and customized auditing reports based on the type
 * of URL entered, ensuring a gorgeous and fully functioning experience.
 * Each run has slight randomization to simulate real-world variance.
 */

// Helper: produce a value within ± variance of base (integer)
const jitter = (base, variance = 4) => Math.min(100, Math.max(0, base + Math.floor((Math.random() * variance * 2) - variance)));
// Helper: produce a float within ± variance
const jitterF = (base, variance = 0.2) => parseFloat(Math.max(0, base + (Math.random() * variance * 2) - variance).toFixed(2));

export const analyzeUrlWithSimulation = async (url) => {
  // Strict argument type checking & sanitization to prevent runtime exceptions
  const safeUrl = typeof url === 'string' ? url.trim() : 'https://example.com';

  // Simulate network delay for rapid, snappy auditing feel
  await new Promise((resolve) => setTimeout(resolve, 1200));

  let cleanUrl = safeUrl.toLowerCase();
  if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
    cleanUrl = 'https://' + cleanUrl;
  }

  let domain = 'example.com';
  try {
    const parsedUrl = new URL(cleanUrl);
    domain = parsedUrl.hostname.replace('www.', '');
  } catch (e) {
    domain = cleanUrl.replace('https://', '').replace('http://', '').split('/')[0];
  }

  // Determine site profile based on domain keywords to generate custom, domain-specific metrics
  const isTech    = /tech|dev|git|api|code|app|software|stack|cyber|vercel|netlify|heroku/.test(domain);
  const isEcom    = /shop|store|buy|cart|market|pay|brand|deal|commerce|amazon|ebay|etsy/.test(domain);
  const isNews    = /news|blog|press|times|post|journal|magazine|media|tribune|herald/.test(domain);
  const isEdu     = /\.edu|learn|academy|college|school|university|course|khan|coursera/.test(domain);
  const isSocial  = /twitter|facebook|instagram|linkedin|tiktok|youtube|reddit|discord|pinterest/.test(domain);
  const isPortfolio = /portfolio|resume|cv|personal|about\.me|bio|me\.io/.test(domain);
  const isGov     = /\.gov|government|official|public\./.test(domain);
  const isHealthcare = /health|hospital|medical|clinic|pharma|doctor|nurse|wellness/.test(domain);
  const isHttps   = cleanUrl.startsWith('https://');

  // Base scores
  let perfScore = 82;
  let seoScore  = 88;
  let accessScore = 85;
  let bpScore   = 90;

  // Domain-category based score profiles
  if (isTech) {
    perfScore = 94; seoScore = 85; accessScore = 80; bpScore = 95;
  } else if (isEcom) {
    perfScore = 66; seoScore = 92; accessScore = 89; bpScore = 78;
  } else if (isNews) {
    perfScore = 55; seoScore = 96; accessScore = 82; bpScore = 68;
  } else if (isEdu) {
    perfScore = 80; seoScore = 78; accessScore = 96; bpScore = 88;
  } else if (isSocial) {
    perfScore = 90; seoScore = 72; accessScore = 76; bpScore = 85;
  } else if (isPortfolio) {
    perfScore = 88; seoScore = 70; accessScore = 84; bpScore = 92;
  } else if (isGov) {
    perfScore = 72; seoScore = 82; accessScore = 94; bpScore = 90;
  } else if (isHealthcare) {
    perfScore = 70; seoScore = 88; accessScore = 90; bpScore = 82;
  }

  // HTTP penalty
  if (!isHttps) {
    bpScore = Math.max(bpScore - 30, 45);
    seoScore = Math.max(seoScore - 15, 55);
  }

  // Apply per-run jitter so re-runs produce realistic variance
  perfScore   = jitter(perfScore, 4);
  seoScore    = jitter(seoScore, 3);
  accessScore = jitter(accessScore, 3);
  bpScore     = jitter(bpScore, 4);

  const overallScore = Math.round((perfScore + seoScore + accessScore + bpScore) / 4);

  // Core Web Vitals based on profile
  let fcp = 1.2, lcp = 2.4, cls = 0.05, tbt = 150, speedIndex = 1.8;

  if (isTech)         { fcp = 0.6;  lcp = 1.3;  cls = 0.01; tbt = 60;  speedIndex = 0.9; }
  else if (isEcom)    { fcp = 1.8;  lcp = 3.6;  cls = 0.12; tbt = 450; speedIndex = 2.9; }
  else if (isNews)    { fcp = 2.4;  lcp = 4.8;  cls = 0.28; tbt = 780; speedIndex = 3.8; }
  else if (isEdu)     { fcp = 1.4;  lcp = 2.8;  cls = 0.04; tbt = 180; speedIndex = 2.1; }
  else if (isSocial)  { fcp = 0.9;  lcp = 2.1;  cls = 0.03; tbt = 120; speedIndex = 1.4; }
  else if (isPortfolio){ fcp = 0.7; lcp = 1.5;  cls = 0.02; tbt = 80;  speedIndex = 1.1; }
  else if (isGov)     { fcp = 1.6;  lcp = 3.1;  cls = 0.06; tbt = 220; speedIndex = 2.4; }
  else if (isHealthcare){ fcp = 1.5; lcp = 2.9; cls = 0.07; tbt = 200; speedIndex = 2.2; }

  // Jitter the vitals too
  fcp        = jitterF(fcp, 0.15);
  lcp        = jitterF(lcp, 0.2);
  cls        = parseFloat(Math.max(0, cls + (Math.random() * 0.03 - 0.015)).toFixed(3));
  tbt        = Math.max(0, Math.round(tbt + (Math.random() * 40 - 20)));
  speedIndex = jitterF(speedIndex, 0.2);

  // Generate recommendations
  const recommendations = [];

  if (perfScore < 85) {
    if (isEcom || isNews) {
      recommendations.push({
        id: 'rec-perf-images',
        category: 'Performance',
        impact: 'High',
        scoreImpact: 12,
        issue: 'Unoptimized hero banner and product assets',
        description: 'Large, uncompressed JPEG/PNG images are slowing down the initial render and increasing First Contentful Paint.',
        solution: 'Convert existing image assets into WebP or AVIF formats, and implement responsive srcset parameters.',
        code: `<img \n  src="hero-banner.webp" \n  srcset="hero-banner-400.webp 400w, hero-banner-800.webp 800w" \n  sizes="(max-width: 800px) 100vw, 800px"\n  alt="Optimized Banner"\n  loading="eager"\n/>`
      });
    } else {
      recommendations.push({
        id: 'rec-perf-bundle',
        category: 'Performance',
        impact: 'High',
        scoreImpact: 8,
        issue: 'Large JavaScript execution payload blocking main thread',
        description: 'Unused script bundles are delaying hydration and increasing the Total Blocking Time (TBT).',
        solution: 'Implement lazy loading, bundle splitting, and dynamic imports for non-critical dashboard components.',
        code: `// Route-level code splitting example\nconst Dashboard = React.lazy(() => import('./pages/Dashboard'));\n\nfunction App() {\n  return (\n    <Suspense fallback={<Loader />}>\n      <Dashboard />\n    </Suspense>\n  );\n}`
      });
    }
  }

  if (perfScore < 90) {
    recommendations.push({
      id: 'rec-perf-css',
      category: 'Performance',
      impact: 'Medium',
      scoreImpact: 5,
      issue: 'Render-blocking stylesheets detected',
      description: 'The browser is pausing document parsing to load CSS files before rendering text, raising FCP.',
      solution: 'Inline critical CSS styles directly inside index.html and defer loading of heavy design frameworks.',
      code: `<link rel="preload" href="heavy-theme.css" as="style" onload="this.onload=null;this.rel='stylesheet'">\n<noscript><link rel="stylesheet" href="heavy-theme.css"></noscript>`
    });
  }

  if (seoScore < 90) {
    recommendations.push({
      id: 'rec-seo-og',
      category: 'SEO',
      impact: 'High',
      scoreImpact: 10,
      issue: 'Missing Open Graph (OG) metadata properties',
      description: 'Essential tag parameters for social platforms (Facebook, Twitter, LinkedIn) are missing, resulting in poor link preview rendering.',
      solution: 'Embed required meta tags inside the website head section with absolute media URLs.',
      code: `<meta property="og:title" content="WebLens - Performance Auditing" />\n<meta property="og:description" content="Evaluate speed and SEO compliance." />\n<meta property="og:image" content="https://${domain}/assets/og-image.png" />\n<meta name="twitter:card" content="summary_large_image" />`
    });
  }

  if (seoScore < 80) {
    recommendations.push({
      id: 'rec-seo-meta',
      category: 'SEO',
      impact: 'High',
      scoreImpact: 8,
      issue: 'Missing or duplicate meta description',
      description: 'The page is either missing a meta description or has one that duplicates another page, reducing CTR from search results.',
      solution: 'Write a unique, compelling meta description under 160 characters for each page.',
      code: `<meta name="description" content="Discover the best [product/service] with [site name]. [Unique value proposition in 1 sentence]." />`
    });
  }

  if (!isHttps) {
    recommendations.push({
      id: 'rec-bp-https',
      category: 'Best Practices',
      impact: 'Critical',
      scoreImpact: 25,
      issue: 'Insecure web connection over HTTP',
      description: 'The site is missing secure SSL/TLS protocols. User data is transmitted in plain text, making it vulnerable to interception.',
      solution: "Configure a secure HTTPS redirect using an SSL certificate (e.g. via Let's Encrypt or Cloudflare).",
      code: `# Apache Redirect Rule\nRewriteEngine On\nRewriteCond %{HTTPS} off\nRewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]`
    });
  }

  if (accessScore < 90) {
    recommendations.push({
      id: 'rec-access-alt',
      category: 'Accessibility',
      impact: 'High',
      scoreImpact: 9,
      issue: 'Missing descriptive alternative text on images',
      description: 'Several critical visual image assets lack "alt" tags, creating barriers for screen-reader users.',
      solution: 'Audit all img elements and supply rich, contextual, readable alternative descriptions.',
      code: `<!-- Bad -->\n<img src="logo.png">\n\n<!-- Good -->\n<img src="logo.png" alt="WebLens company logo - obsidian lens inside a purple circle">`
    });

    recommendations.push({
      id: 'rec-access-contrast',
      category: 'Accessibility',
      impact: 'Medium',
      scoreImpact: 6,
      issue: 'Low text color contrast ratio in dashboard elements',
      description: 'Several button labels and body texts fail the WCAG AA minimum color contrast requirement of 4.5:1.',
      solution: 'Adjust background-to-foreground hex colors to guarantee adequate luminance and readability.',
      code: `/* Bad */\n.gray-text { color: #888; background: #fff; } /* Ratio ~2.3:1 */\n\n/* Good */\n.dark-text { color: #4b5563; background: #fff; } /* Ratio ~5.1:1 */`
    });
  }

  if (bpScore < 90) {
    recommendations.push({
      id: 'rec-bp-deprecated',
      category: 'Best Practices',
      impact: 'Medium',
      scoreImpact: 5,
      issue: 'Use of deprecated web APIs or script methods',
      description: 'The application contains outdated console scripts or legacy API listeners which might break in future browser releases.',
      solution: 'Refactor listeners to use standard passive event declarations or modern equivalents.',
      code: `// Deprecated\nwindow.addEventListener('scroll', handleScroll);\n\n// Modern / Recommended\nwindow.addEventListener('scroll', handleScroll, { passive: true });`
    });
  }

  // Return standard response structure
  return {
    url,
    domain,
    analyzedAt: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    isHttps,
    scores: {
      overall: overallScore,
      performance: perfScore,
      seo: seoScore,
      accessibility: accessScore,
      bestPractices: bpScore,
    },
    metrics: {
      fcp:        { value: fcp,        unit: 's',  label: 'First Contentful Paint',   rating: fcp        < 1.8  ? 'good' : fcp        < 3.0  ? 'needs-improvement' : 'poor' },
      lcp:        { value: lcp,        unit: 's',  label: 'Largest Contentful Paint', rating: lcp        < 2.5  ? 'good' : lcp        < 4.0  ? 'needs-improvement' : 'poor' },
      cls:        { value: cls,        unit: '',   label: 'Cumulative Layout Shift',  rating: cls        < 0.1  ? 'good' : cls        < 0.25 ? 'needs-improvement' : 'poor' },
      tbt:        { value: tbt,        unit: 'ms', label: 'Total Blocking Time',      rating: tbt        < 150  ? 'good' : tbt        < 350  ? 'needs-improvement' : 'poor' },
      speedIndex: { value: speedIndex, unit: 's',  label: 'Speed Index',              rating: speedIndex < 3.4  ? 'good' : speedIndex < 5.8  ? 'needs-improvement' : 'poor' },
    },
    audits: {
      performance: [
        { title: 'Properly size images',                 status: perfScore > 80 ? 'pass' : 'fail', details: 'All image assets correspond closely to display dimensions.' },
        { title: 'Reduce unused JavaScript',             status: perfScore > 85 ? 'pass' : 'fail', details: 'Unused script chunks represent less than 15% of bundle weights.' },
        { title: 'Eliminate render-blocking resources',  status: perfScore > 90 ? 'pass' : 'fail', details: 'Stylesheets and script anchors have deferred properties.' },
        { title: 'Avoids enormous network payloads',     status: perfScore > 75 ? 'pass' : 'fail', details: 'Total transfer size was under 1.6MB.' },
        { title: 'Minify CSS and JS',                    status: 'pass',                           details: 'Minified files compress transfer assets efficiently.' },
        { title: 'Efficient cache policy',               status: perfScore > 70 ? 'pass' : 'fail', details: 'Resources are served with appropriate cache-control headers.' },
      ],
      seo: [
        { title: 'Has a <title> element',                 status: 'pass',                         details: 'Document title matches indexing recommendations.' },
        { title: 'Document has a meta description',       status: seoScore > 80 ? 'pass' : 'fail', details: 'Meta description contains targeting keyword profiles.' },
        { title: 'Heading structure is ordered logically',status: 'pass',                         details: 'Document outlines use sequentially-descending headers (H1→H2→H3).' },
        { title: 'Links have descriptive text',           status: 'pass',                         details: 'Anchor references use clear, context-rich labeling.' },
        { title: 'Robots.txt is valid',                   status: 'pass',                         details: 'Search engine spider instruction configuration is active.' },
        { title: 'Sitemap.xml is accessible',             status: seoScore > 75 ? 'pass' : 'fail', details: 'XML sitemap registry links index locations correctly.' },
        { title: 'Open Graph tags present',               status: seoScore > 85 ? 'pass' : 'fail', details: 'Social sharing metadata is correctly embedded.' },
      ],
      accessibility: [
        { title: 'Image elements have [alt] attributes',  status: accessScore > 80 ? 'pass' : 'fail', details: 'Assistive descriptive labels accompany structural figures.' },
        { title: 'Buttons have descriptive names',        status: 'pass',                             details: 'Interactive elements supply clear context labels.' },
        { title: 'Document has a <title> element',        status: 'pass',                             details: 'Assistive screen-readers read window names on load.' },
        { title: 'HTML element has a [lang] attribute',   status: 'pass',                             details: 'Language declaration is correctly registered.' },
        { title: 'Form elements have associated labels',  status: accessScore > 70 ? 'pass' : 'fail', details: 'Inputs are tied to clear readable description fields.' },
        { title: 'Color contrast ratio is sufficient',    status: accessScore > 85 ? 'pass' : 'fail', details: 'Text/background contrast meets WCAG AA 4.5:1 minimum.' },
      ],
      bestPractices: [
        { title: 'Uses HTTPS connection',                       status: isHttps ? 'pass' : 'fail',    details: 'Site is operating with SSL/TLS encryption.' },
        { title: 'Avoids deprecated APIs',                      status: bpScore > 85 ? 'pass' : 'fail', details: 'Legacy method references have been successfully updated.' },
        { title: 'No browser console errors logged',            status: bpScore > 80 ? 'pass' : 'fail', details: 'No runtime JS exceptions occurred during load events.' },
        { title: 'Links to cross-origin destinations are safe', status: 'pass',                       details: 'External tags possess appropriate rel="noopener" rules.' },
        { title: 'Correct document doctype rule',               status: 'pass',                       details: 'HTML5 system declarations are correctly placed.' },
        { title: 'Avoids requesting geolocation on load',       status: 'pass',                       details: 'No permission prompts fired on initial page load.' },
      ],
    },
    recommendations,
  };
};
