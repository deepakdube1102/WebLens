import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function FaqItem({ question, answer, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      style={{ borderRadius: 16, border: open ? '1px solid rgba(20,184,166,0.3)' : '1px solid rgba(255,255,255,0.07)', background: open ? 'rgba(20,184,166,0.04)' : 'rgba(255,255,255,0.02)', transition: 'all 0.25s' }}
    >
      <button onClick={() => setOpen(!open)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '18px 24px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: '#fff', lineHeight: 1.4 }}>{question}</span>
        {open
          ? <ChevronUp style={{ width: 18, height: 18, color: '#14B8A6', flexShrink: 0 }} />
          : <ChevronDown style={{ width: 18, height: 18, color: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
            <p style={{ padding: '0 24px 20px', fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 16, marginTop: 0 }}>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function About({ onBack }) {
  const SCORE_GUIDE = [
    { range: '90–100', label: 'Excellent',  color: '#10b981', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.2)',  desc: 'Your site meets or exceeds industry benchmarks. Maintain with regular audits.' },
    { range: '50–89',  label: 'Needs Work', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.2)',  desc: 'Meaningful issues are impacting UX and SEO. Follow the optimization plan.' },
    { range: '0–49',   label: 'Poor',       color: '#f43f5e', bg: 'rgba(244,63,94,0.08)',   border: 'rgba(244,63,94,0.2)',   desc: 'Critical issues need immediate attention. Users are experiencing slow loads.' },
  ];

  const VITALS = [
    { title: 'First Contentful Paint (FCP)', desc: 'Time until the browser renders the first pixel of content. Signals to users that the page is loading.', threshold: '< 1.8s', color: '#2563EB' },
    { title: 'Largest Contentful Paint (LCP)', desc: 'Render time of the largest visible element. Directly measures perceived page readiness.', threshold: '< 2.5s', color: '#14B8A6' },
    { title: 'Cumulative Layout Shift (CLS)', desc: 'Sum of all unexpected layout shifts. Measures visual stability — lower is better.', threshold: '< 0.1', color: '#7c3aed' },
    { title: 'Total Blocking Time (TBT)', desc: 'Total time where the main thread is blocked by long script tasks, between FCP and TTI.', threshold: '< 150ms', color: '#f59e0b' },
    { title: 'Speed Index', desc: 'How quickly content is visually populated above the fold. Measures overall perceived loading.', threshold: '< 3.4s', color: '#10b981' },
  ];

  const CATEGORIES = [
    { color: '#2563EB', title: 'Performance', desc: 'Core Web Vitals, resource optimization, render-blocking scripts, image sizing, and payload efficiency.', checks: ['FCP · LCP · CLS · TBT', 'Unused JavaScript', 'Image Optimization', 'Render-Blocking Resources', 'Cache Policy', 'Network Payload'] },
    { color: '#14B8A6', title: 'SEO',         desc: 'Structural markup, crawlability, metadata, Open Graph tags, and heading hierarchy.', checks: ['Meta Title & Description', 'Open Graph Tags', 'Heading Structure', 'Robots.txt', 'Sitemap.xml', 'Canonical Links'] },
    { color: '#7c3aed', title: 'Accessibility', desc: 'WCAG AA compliance — alt text, color contrast, ARIA labels, keyboard navigation, form labels.', checks: ['Image Alt Text', 'Color Contrast (4.5:1)', 'Button Labels', 'Form Associations', 'HTML lang attr', 'ARIA Roles'] },
    { color: '#10b981', title: 'Best Practices', desc: 'Security, code hygiene, deprecated API usage, and console error detection.', checks: ['HTTPS / SSL', 'No Console Errors', 'rel="noopener"', 'Deprecated APIs', 'Correct Doctype', 'font-display'] },
  ];

  const TIPS = [
    { color: '#2563EB', title: 'Convert to WebP/AVIF',      desc: 'Switch hero and product images to modern formats. Add srcset for responsive sizing. Gains 10–20 performance points.' },
    { color: '#14B8A6', title: 'Write compelling meta tags', desc: 'Each page needs a unique meta description under 160 chars. This directly affects click-through rates from search results.' },
    { color: '#f59e0b', title: 'Defer non-critical scripts', desc: 'Add defer/async to analytics and chat widgets. Inline critical CSS. Reduces FCP and TBT significantly.' },
    { color: '#10b981', title: 'Add alt text to all images', desc: 'Every img element needs a descriptive alt attribute — improves accessibility scores and image SEO indexing.' },
    { color: '#7c3aed', title: 'Force HTTPS everywhere',     desc: "Use Let's Encrypt or Cloudflare for free SSL. HTTP sites are penalized in Best Practices and by browsers." },
    { color: '#f59e0b', title: 'Benchmark competitors',      desc: "Use the Compare tool to audit competitor sites. Find where they outperform you and create a targeted improvement list." },
  ];

  const FAQS = [
    { q: 'Is WebLens free?',                         a: 'Yes — completely free. It uses the Google PageSpeed Insights public API. Optionally add your own API key in Engine Configuration for higher rate limits.' },
    { q: 'Why does it fall back to simulation mode?', a: "The Google API can reject browser-based requests due to CORS policy or rate limiting. Our Audit Simulator generates domain-aware, realistic scores and recommendations without needing any external service." },
    { q: 'Can I audit localhost or private URLs?',    a: 'Live audits need the URL to be publicly accessible. Switch to "Simulator" mode in Engine Configuration to audit localhost, staging, or private network URLs.' },
    { q: 'How accurate is the simulation?',           a: "The simulator is domain-aware — it profiles the site category (tech, e-commerce, news, portfolio, etc.) and adjusts scores accordingly. Results are highly representative with realistic variance on each run." },
    { q: 'How often should I audit?',                 a: 'After every major deployment, design update, or content change. For active sites, monthly audits are a healthy baseline. Use the Re-Run button to compare before/after changes.' },
    { q: 'What is the difference between FCP and LCP?', a: 'FCP marks when the first pixel is painted. LCP marks when the largest visible element finishes loading. LCP is the more critical Core Web Vital and directly factors into Google Search rankings.' },
  ];

  const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 24 } }
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', color: '#CBD5E1' }}>

      {/* Cinematic Background */}
      <div style={{ position: 'absolute', top: 0, left: '20%', width: '60vw', height: '60vw', background: 'radial-gradient(ellipse, rgba(37,99,235,0.1) 0%, transparent 60%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 60%)', filter: 'blur(100px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px 100px', position: 'relative', zIndex: 1 }}>

        {/* ── Hero Header ── */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 80 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', fontSize: 11, fontWeight: 700, color: '#14B8A6', textTransform: 'uppercase', letterSpacing: '0.15em', background: 'rgba(20,184,166,0.07)', border: '1px solid rgba(20,184,166,0.2)', padding: '6px 18px', borderRadius: 9999, marginBottom: 24 }}>
            Methodology
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 52px)', color: '#FFFFFF', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 20 }}>
            How We Measure<br />
            <span style={{ background: 'linear-gradient(to right, #2563EB, #14B8A6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Website Quality</span>
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
            WebLens runs comprehensive Lighthouse audits powered by Google's PageSpeed Insights API — surfacing Core Web Vitals, SEO, accessibility, and best practices in one scan.
          </p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>

          {/* ── How it works ── */}
          <motion.section variants={fadeUp}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ gridColumn: '1 / -1', padding: '32px 36px', borderRadius: 24, background: 'linear-gradient(135deg, rgba(37,99,235,0.08), rgba(20,184,166,0.06))', border: '1px solid rgba(37,99,235,0.2)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, background: 'radial-gradient(circle, rgba(37,99,235,0.12), transparent)', pointerEvents: 'none' }} />
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 20, color: '#fff', letterSpacing: '-0.01em', marginBottom: 20 }}>How WebLens Works</h2>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: 12 }}>
                  WebLens queries the <strong style={{ color: '#fff' }}>Google PageSpeed Insights API</strong> to run Lighthouse audits against any public URL — retrieving Core Web Vitals, SEO metadata, accessibility signals, and development compliance indicators in one call.
                </p>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}>
                  When the API is unavailable due to rate limiting or CORS, our <strong style={{ color: '#fff' }}>built-in Audit Simulator</strong> takes over — a domain-aware scoring engine that generates realistic, reproducible results entirely in your browser.
                </p>
              </div>
            </div>
          </motion.section>

          {/* ── Score Guide ── */}
          <motion.section variants={fadeUp}>
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#14B8A6', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>
                Score Guide
              </p>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 26, color: '#fff', letterSpacing: '-0.02em' }}>What do the scores mean?</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {SCORE_GUIDE.map(g => (
                <motion.div key={g.range} whileHover={{ y: -4 }} style={{ padding: 28, borderRadius: 20, background: g.bg, border: `1px solid ${g.border}`, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 36, color: g.color, marginBottom: 4, letterSpacing: '-0.03em', textShadow: `0 0 20px ${g.color}50` }}>{g.range}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: g.color, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{g.label}</div>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{g.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ── Core Web Vitals ── */}
          <motion.section variants={fadeUp}>
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#14B8A6', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>
                Core Web Vitals
              </p>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 26, color: '#fff', letterSpacing: '-0.02em' }}>Performance metrics explained</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {VITALS.map((v, i) => (
                <motion.div key={v.title} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  style={{ borderRadius: 16, padding: '20px 24px', display: 'flex', gap: 18, alignItems: 'center', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', transition: 'all 0.2s' }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: `${v.color}18`, border: `1px solid ${v.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: v.color, boxShadow: `0 0 10px ${v.color}` }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 15, color: '#fff', marginBottom: 4 }}>{v.title}</h4>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{v.desc}</p>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#34d399', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', padding: '6px 14px', borderRadius: 999, flexShrink: 0, letterSpacing: '0.02em' }}>
                    {v.threshold}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ── Categories ── */}
          <motion.section variants={fadeUp}>
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#14B8A6', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>
                Audit Scopes
              </p>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 26, color: '#fff', letterSpacing: '-0.02em' }}>What we check in each category</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {CATEGORIES.map((cat, i) => (
                <motion.div key={cat.title} whileHover={{ y: -4, borderColor: `${cat.color}40` }}
                  style={{ borderRadius: 20, padding: '24px 26px', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', transition: 'all 0.25s', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, background: `radial-gradient(circle, ${cat.color}15, transparent)`, pointerEvents: 'none' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: cat.color, boxShadow: `0 0 10px ${cat.color}`, flexShrink: 0 }} />
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 17, color: '#fff' }}>{cat.title}</h4>
                  </div>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, marginBottom: 16 }}>{cat.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {cat.checks.map(c => (
                      <span key={c} style={{ fontSize: 11, fontWeight: 600, color: cat.color, background: `${cat.color}12`, border: `1px solid ${cat.color}25`, padding: '3px 10px', borderRadius: 999 }}>{c}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ── API Key Guide ── */}
          <motion.section variants={fadeUp}>
            <div style={{ padding: '36px 40px', borderRadius: 24, background: 'linear-gradient(135deg, rgba(37,99,235,0.07), rgba(20,184,166,0.05))', border: '1px solid rgba(37,99,235,0.2)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -30, right: -30, width: 200, height: 200, background: 'radial-gradient(circle, rgba(37,99,235,0.12), transparent)', pointerEvents: 'none' }} />
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 20, color: '#fff', letterSpacing: '-0.01em', marginBottom: 10 }}>Getting a Google PageSpeed API Key</h2>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 28, lineHeight: 1.65 }}>Optional — adding your own key removes rate limits for high-volume usage.</p>
              <ol style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  'Go to console.cloud.google.com and sign in with your Google account.',
                  'Create a new project — name it anything like "WebLens Audits".',
                  'Navigate to APIs & Services → Library. Search "PageSpeed Insights API" and enable it.',
                  'Go to APIs & Services → Credentials → Create Credentials → API Key. Copy the key.',
                  'In WebLens, click "Engine configuration" on the home page and paste your key.',
                ].map((text, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                    <div style={{ width: 30, height: 30, borderRadius: 9, background: 'rgba(37,99,235,0.18)', border: '1px solid rgba(37,99,235,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 13, color: '#60a5fa' }}>{i + 1}</span>
                    </div>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, paddingTop: 4 }}>{text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </motion.section>

          {/* ── Optimization Tips ── */}
          <motion.section variants={fadeUp}>
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#14B8A6', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>
                Optimization Tips
              </p>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 26, color: '#fff', letterSpacing: '-0.02em' }}>Quick wins for your site</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {TIPS.map((tip, i) => (
                <motion.div key={tip.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -4 }}
                  style={{ borderRadius: 18, padding: '24px 24px', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', transition: 'border-color 0.25s', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: tip.color, boxShadow: `0 0 10px ${tip.color}`, flexShrink: 0 }} />
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 14, color: '#fff' }}>{tip.title}</h4>
                  </div>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.65 }}>{tip.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ── FAQ ── */}
          <motion.section variants={fadeUp}>
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#14B8A6', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>
                FAQ
              </p>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 26, color: '#fff', letterSpacing: '-0.02em' }}>Frequently asked questions</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {FAQS.map((faq, i) => <FaqItem key={i} question={faq.q} answer={faq.a} index={i} />)}
            </div>
          </motion.section>

        </motion.div>
      </div>
    </div>
  );
}
