import React, { useState } from 'react';
import { RefreshCw, Printer, AlertTriangle, CheckCircle2, XCircle, ChevronDown, ChevronUp, Copy, Check, Scale, Download, BarChart3, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';

const getScoreColor = (s) => s >= 90 ? '#10b981' : s >= 50 ? '#f59e0b' : '#f43f5e';
const getScoreBadge = (s) => s >= 90 ? { label: 'Excellent', color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.25)' }
  : s >= 50 ? { label: 'Needs Work', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)' }
  : { label: 'Poor', color: '#f43f5e', bg: 'rgba(244,63,94,0.1)', border: 'rgba(244,63,94,0.25)' };
const getRatingColor = (r) => r === 'good' ? '#10b981' : r === 'needs-improvement' ? '#f59e0b' : '#f43f5e';

function ScoreRing({ score, size = 120, stroke = 8, label }) {
  const r = (size - stroke) / 2;
  const circ = r * 2 * Math.PI;
  const offset = circ - (score / 100) * circ;
  const color = getScoreColor(score);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
          <circle strokeWidth={stroke} stroke="rgba(255,255,255,0.06)" fill="transparent" r={r} cx={size/2} cy={size/2} />
          <circle className="score-circle" strokeWidth={stroke} strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" stroke={color} fill="transparent" r={r} cx={size/2} cy={size/2} />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: size > 110 ? 28 : 22, color: '#fff' }}>{score}</span>
        </div>
      </div>
      {label && <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', marginTop: 10, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{label}</span>}
    </div>
  );
}

const BarTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const s = payload[0].value;
  return (
    <div style={{ background: 'rgba(10,10,12,0.97)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px' }}>
      <p style={{ fontWeight: 600, color: '#fff', marginBottom: 4, fontSize: 13 }}>{label}</p>
      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 22, color: getScoreColor(s) }}>{s}<span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginLeft: 2 }}>/100</span></p>
    </div>
  );
};

export default function Report({ data, onBack, onReRun, onNavigateCompare }) {
  const [activeTab, setActiveTab]     = useState('performance');
  const [expandedRec, setExpandedRec] = useState(null);
  const [copiedId, setCopiedId]       = useState(null);
  const [expandedAudit, setExpandedAudit] = useState({});
  const [recFilter, setRecFilter]     = useState('All');
  const [showChart, setShowChart]     = useState(true);

  const { url, domain, analyzedAt, isHttps, scores, metrics, audits, recommendations } = data;

  const handleCopy = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `weblens-${domain}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const chartData = [
    { name: 'Performance',     score: scores.performance },
    { name: 'SEO',             score: scores.seo },
    { name: 'Accessibility',   score: scores.accessibility },
    { name: 'Best Practices',  score: scores.bestPractices },
  ];

  const recCategories = ['All', ...new Set(recommendations.map(r => r.category))];
  const filteredRecs  = recFilter === 'All' ? recommendations : recommendations.filter(r => r.category === recFilter);
  const scoreBadge    = getScoreBadge(scores.overall);

  return (
    <div style={{ minHeight: '100vh', padding: '40px 24px 80px', position: 'relative' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* ── Header ── */}
        <div className="no-print" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40, paddingBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.07)', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 22, color: '#fff', letterSpacing: '-0.01em' }}>{domain}</h1>
                <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 999, background: isHttps ? 'rgba(16,185,129,0.1)' : 'rgba(244,63,94,0.1)', color: isHttps ? '#6ee7b7' : '#fda4af', border: `1px solid ${isHttps ? 'rgba(16,185,129,0.25)' : 'rgba(244,63,94,0.25)'}` }}>
                  {isHttps ? '✓ HTTPS' : '✕ HTTP'}
                </span>
              </div>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 3 }}>Audited {analyzedAt}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[
              { icon: Scale, label: 'Compare', color: '#7c3aed', onClick: () => onNavigateCompare(url) },
              { icon: RefreshCw, label: 'Re-run', color: 'rgba(255,255,255,0.5)', onClick: onReRun },
              { icon: Download, label: 'Export JSON', color: 'rgba(255,255,255,0.5)', onClick: handleExportJSON },
            ].map(b => (
              <button key={b.label} onClick={b.onClick} className="btn-secondary" style={{ fontSize: 13 }}>
                <b.icon style={{ width: 15, height: 15, color: b.color }} />
                <span className="hidden sm:inline">{b.label}</span>
              </button>
            ))}
            <button onClick={() => window.print()} className="btn-primary" style={{ fontSize: 13, padding: '9px 16px' }}>
              <Printer style={{ width: 15, height: 15 }} /> Print PDF
            </button>
          </div>
        </div>

        {/* ── Print Header ── */}
        <div className="hidden print:block" style={{ marginBottom: 32, paddingBottom: 24, borderBottom: '1px solid #e5e7eb' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 28, color: '#000' }}>WebLens Audit Report</h1>
          <p style={{ fontSize: 14, color: '#6b7280' }}>{url} · {analyzedAt} · Score: {scores.overall}/100</p>
        </div>

        {/* ── Score Grid ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20, marginBottom: 20 }} className="grid-cols-1 lg:grid-cols-auto">

          {/* Overall Score Card */}
          <div className="glass-panel" style={{ borderRadius: 20, padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, background: `radial-gradient(circle, ${getScoreColor(scores.overall)}25, transparent)`, pointerEvents: 'none' }} />
            <ScoreRing score={scores.overall} size={140} stroke={10} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 16, color: '#fff', marginTop: 20, marginBottom: 6 }}>Overall Score</h3>
            <span style={{ fontSize: 12, fontWeight: 600, color: scoreBadge.color, background: scoreBadge.bg, border: `1px solid ${scoreBadge.border}`, padding: '4px 12px', borderRadius: 999 }}>{scoreBadge.label}</span>
          </div>

          {/* Category Scores */}
          <div className="glass-panel" style={{ borderRadius: 20, padding: 28, position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 16, color: '#fff', marginBottom: 2 }}>Category Scores</h3>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>Performance · SEO · Accessibility · Best Practices</p>
              </div>
              <div style={{ display: 'flex', gap: 2, padding: 3, background: 'rgba(0,0,0,0.3)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)' }}>
                {[{ icon: List, key: false }, { icon: BarChart3, key: true }].map(v => (
                  <button key={String(v.key)} onClick={() => setShowChart(v.key)}
                    style={{ padding: '6px 8px', borderRadius: 6, background: showChart === v.key ? 'rgba(255,255,255,0.1)' : 'transparent', color: showChart === v.key ? '#fff' : 'rgba(255,255,255,0.35)', border: 'none', cursor: 'pointer', transition: 'all 0.18s' }}>
                    <v.icon style={{ width: 14, height: 14 }} />
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {showChart ? (
                <motion.div key="chart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ height: 200 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} barCategoryGap="28%">
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.25)" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis domain={[0, 100]} stroke="rgba(255,255,255,0.25)" fontSize={11} tickLine={false} axisLine={false} width={28} />
                      <Tooltip content={<BarTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                      <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                        {chartData.map((d, i) => <Cell key={i} fill={getScoreColor(d.score)} fillOpacity={0.85} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>
              ) : (
                <motion.div key="rings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, paddingTop: 12 }}>
                  <ScoreRing score={scores.performance}  size={96} label="Performance"   />
                  <ScoreRing score={scores.seo}          size={96} label="SEO"            />
                  <ScoreRing score={scores.accessibility} size={96} label="Accessibility" />
                  <ScoreRing score={scores.bestPractices} size={96} label="Best Practices"/>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Core Web Vitals ── */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, color: '#fff', letterSpacing: '-0.01em' }}>Core Web Vitals</h3>
            <div style={{ display: 'flex', gap: 16 }}>
              {[['#10b981','Good'], ['#f59e0b','Needs Work'], ['#f43f5e','Poor']].map(([c,l]) => (
                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: c, display: 'inline-block' }} />{l}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }} className="grid-cols-2 md:grid-cols-5">
            {Object.entries(metrics).map(([key, item]) => {
              const color = getRatingColor(item.rating);
              return (
                <div key={key} className="glass-panel" style={{ borderRadius: 14, padding: 18, borderColor: `${color}20` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{item.label}</span>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginBottom: 12 }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 28, color: '#fff', letterSpacing: '-0.02em' }}>{item.value}</span>
                    {item.unit && <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>{item.unit}</span>}
                  </div>
                  <div style={{ height: 3, background: 'rgba(255,255,255,0.07)', borderRadius: 999, overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: item.rating === 'good' ? '33%' : item.rating === 'needs-improvement' ? '66%' : '100%' }}
                      transition={{ duration: 0.9, delay: 0.2 }}
                      style={{ height: '100%', background: color, borderRadius: 999 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Recommendations + Checklist ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 20 }} className="grid-cols-1 lg:grid-cols-auto">

          {/* Recommendations */}
          <div className="glass-panel" style={{ borderRadius: 20, padding: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 17, color: '#fff', marginBottom: 2 }}>Optimization Plan</h3>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{recommendations.length} issues found</p>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#a78bfa', background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.2)', padding: '4px 10px', borderRadius: 999 }}>
                {recommendations.length} items
              </span>
            </div>

            {/* Category filters */}
            {recommendations.length > 0 && (
              <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
                {recCategories.map(cat => (
                  <button key={cat} onClick={() => setRecFilter(cat)}
                    style={{ fontSize: 11, fontWeight: 600, padding: '5px 12px', borderRadius: 999, cursor: 'pointer', transition: 'all 0.18s', background: recFilter === cat ? 'linear-gradient(135deg, #7c3aed, #4f46e5)' : 'rgba(255,255,255,0.05)', color: recFilter === cat ? '#fff' : 'rgba(255,255,255,0.45)', border: recFilter === cat ? '1px solid rgba(124,58,237,0.3)' : '1px solid rgba(255,255,255,0.08)', boxShadow: recFilter === cat ? '0 2px 8px rgba(124,58,237,0.25)' : 'none', fontFamily: 'var(--font-sans)' }}
                  >{cat}</button>
                ))}
              </div>
            )}

            {filteredRecs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <CheckCircle2 style={{ width: 40, height: 40, color: '#10b981', margin: '0 auto 12px' }} />
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#fff', fontSize: 16, marginBottom: 6 }}>Perfect score!</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>No issues found in this category.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {filteredRecs.map(rec => {
                  const isExp = expandedRec === rec.id;
                  const isCrit = rec.impact === 'Critical' || rec.impact === 'High';
                  const impactColor = isCrit ? '#f43f5e' : '#f59e0b';

                  return (
                    <div key={rec.id} style={{ borderRadius: 14, border: isExp ? '1px solid rgba(124,58,237,0.3)' : '1px solid rgba(255,255,255,0.07)', background: isExp ? 'rgba(124,58,237,0.06)' : 'rgba(255,255,255,0.02)', transition: 'all 0.2s' }}>
                      <div onClick={() => setExpandedRec(isExp ? null : rec.id)} style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', userSelect: 'none' }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: `${impactColor}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <AlertTriangle style={{ width: 14, height: 14, color: impactColor }} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                            <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{rec.category}</span>
                            <span style={{ fontSize: 10, fontWeight: 700, color: impactColor, background: `${impactColor}15`, border: `1px solid ${impactColor}25`, padding: '1px 6px', borderRadius: 4 }}>{rec.impact}</span>
                          </div>
                          <p style={{ fontSize: 13, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{rec.issue}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: '#6ee7b7', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', padding: '3px 9px', borderRadius: 999 }}>+{rec.scoreImpact}</span>
                          {isExp ? <ChevronUp style={{ width: 16, height: 16, color: 'rgba(255,255,255,0.35)' }} /> : <ChevronDown style={{ width: 16, height: 16, color: 'rgba(255,255,255,0.35)' }} />}
                        </div>
                      </div>

                      <AnimatePresence>
                        {isExp && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                            <div style={{ padding: '0 18px 18px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 16 }}>
                              <div style={{ marginBottom: 12 }}>
                                <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 5 }}>Issue</p>
                                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{rec.description}</p>
                              </div>
                              <div style={{ marginBottom: 12 }}>
                                <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 5 }}>How to fix</p>
                                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{rec.solution}</p>
                              </div>
                              {rec.code && (
                                <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 14px', background: 'rgba(0,0,0,0.4)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                    <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Code example</span>
                                    <button onClick={() => handleCopy(rec.id, rec.code)} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 500, color: copiedId === rec.id ? '#6ee7b7' : 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s', fontFamily: 'var(--font-sans)' }}>
                                      {copiedId === rec.id ? <><Check style={{ width: 12, height: 12 }} />Copied</> : <><Copy style={{ width: 12, height: 12 }} />Copy</>}
                                    </button>
                                  </div>
                                  <pre style={{ margin: 0, padding: '14px', background: 'rgba(0,0,0,0.3)', fontSize: 11, color: '#c4b5fd', fontFamily: 'monospace', lineHeight: 1.6, overflowX: 'auto' }}><code>{rec.code}</code></pre>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Audit Checklist */}
          <div className="glass-panel" style={{ borderRadius: 20, padding: 28, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 17, color: '#fff', marginBottom: 20 }}>Audit Checklist</h3>

            {/* Tab bar */}
            <div style={{ display: 'flex', gap: 2, padding: 3, background: 'rgba(0,0,0,0.3)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)', marginBottom: 20 }}>
              {[['performance','Perf'], ['seo','SEO'], ['accessibility','A11y'], ['bestPractices','Best']].map(([k, lbl]) => (
                <button key={k} onClick={() => setActiveTab(k)}
                  style={{ flex: 1, padding: '7px 6px', borderRadius: 7, fontSize: 11, fontWeight: 600, cursor: 'pointer', transition: 'all 0.18s', background: activeTab === k ? 'rgba(255,255,255,0.1)' : 'transparent', color: activeTab === k ? '#fff' : 'rgba(255,255,255,0.35)', border: 'none', fontFamily: 'var(--font-sans)' }}
                >{lbl}</button>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, overflowY: 'auto', maxHeight: 480 }}>
              {audits[activeTab]?.map((item, idx) => {
                const id = `${activeTab}-${idx}`;
                const isExp = expandedAudit[id];
                const passed = item.status === 'pass';
                return (
                  <div key={id} style={{ borderRadius: 10, border: passed ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(244,63,94,0.15)', background: passed ? 'rgba(255,255,255,0.02)' : 'rgba(244,63,94,0.04)', padding: '10px 14px', cursor: 'pointer' }}
                    onClick={() => setExpandedAudit(p => ({ ...p, [id]: !p[id] }))}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {passed
                          ? <CheckCircle2 style={{ width: 15, height: 15, color: '#10b981', flexShrink: 0 }} />
                          : <XCircle    style={{ width: 15, height: 15, color: '#f43f5e', flexShrink: 0 }} />}
                        <span style={{ fontSize: 13, fontWeight: 500, color: '#fff' }}>{item.title}</span>
                      </div>
                      {isExp ? <ChevronUp style={{ width: 14, height: 14, color: 'rgba(255,255,255,0.3)' }} /> : <ChevronDown style={{ width: 14, height: 14, color: 'rgba(255,255,255,0.3)' }} />}
                    </div>
                    <AnimatePresence>
                      {isExp && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 8, paddingLeft: 23, lineHeight: 1.5 }}>{item.details}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
