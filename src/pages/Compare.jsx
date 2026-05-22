import React, { useState } from 'react';
import { Scale, Trophy, AlertCircle, ArrowRight, Loader2, CheckCircle2, XCircle, Activity, Globe, Shield, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { runPageSpeedAudit } from '../services/pagespeedApi';

function Skeleton({ style }) {
  return <div className="skeleton" style={{ borderRadius: 8, ...style }} />;
}

export default function Compare({ prefilledUrl = '', apiKey, mode, onBack }) {
  const [urlA, setUrlA] = useState(prefilledUrl);
  const [urlB, setUrlB] = useState('');
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');
  const [resultA, setResultA]       = useState(null);
  const [resultB, setResultB]       = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [checklistTab, setChecklistTab] = useState('performance');

  // Dynamically sync urlA when the prefilledUrl prop updates (e.g. navigating from a different Report audit)
  React.useEffect(() => {
    if (prefilledUrl) {
      setUrlA(prefilledUrl);
    }
  }, [prefilledUrl]);

  const handleCompare = async (e) => {
    e.preventDefault();
    if (!urlA || !urlB) { setError('Enter both URLs to compare.'); return; }
    setLoading(true); setError(''); setShowResults(false);
    try {
      const [a, b] = await Promise.all([
        runPageSpeedAudit(urlA, apiKey, mode),
        runPageSpeedAudit(urlB, apiKey, mode)
      ]);
      setResultA(a); setResultB(b); setShowResults(true);
    } catch { setError('Comparison failed. Please check your URLs and try again.'); }
    finally { setLoading(false); }
  };

  const radarData = () => !resultA || !resultB ? [] : [
    { subject: 'Overall',       A: resultA.scores.overall,       B: resultB.scores.overall },
    { subject: 'Performance',   A: resultA.scores.performance,   B: resultB.scores.performance },
    { subject: 'SEO',           A: resultA.scores.seo,           B: resultB.scores.seo },
    { subject: 'Accessibility', A: resultA.scores.accessibility, B: resultB.scores.accessibility },
    { subject: 'Best Practices',A: resultA.scores.bestPractices, B: resultB.scores.bestPractices },
  ];

  const winner = resultA && resultB
    ? resultA.scores.overall > resultB.scores.overall ? 'A'
    : resultB.scores.overall > resultA.scores.overall ? 'B' : 'tie'
    : null;

  const lowerBetter = ['fcp','lcp','tbt','speedIndex'];

  const TABS = [
    { key: 'performance',   label: 'Performance', icon: Activity },
    { key: 'seo',           label: 'SEO',         icon: Globe    },
    { key: 'accessibility', label: 'Accessibility', icon: Eye     },
    { key: 'bestPractices', label: 'Best Practices', icon: Shield },
  ];

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '40px 24px 80px', position: 'relative', overflow: 'hidden' }}>
      {/* Cinematic Background Mesh */}
      <div style={{ position: 'absolute', top: '0', left: '20%', width: '60vw', height: '60vw', background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.12) 0%, transparent 60%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle at center, rgba(6,182,212,0.08) 0%, transparent 60%)', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="no-print" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40, paddingBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 24, color: '#fff', display: 'flex', alignItems: 'center', gap: 10, letterSpacing: '-0.01em' }}>
              <Scale style={{ width: 22, height: 22, color: '#a78bfa' }} />
              Competitive Analysis
            </h1>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Evaluate two websites side-by-side across every quality dimension.</p>
          </div>
        </motion.div>

        {/* Input Form Area */}
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="glass-panel no-print" style={{ borderRadius: 24, padding: '36px', marginBottom: 32, position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
          <div style={{ position: 'absolute', top: -40, left: -40, width: 200, height: 200, background: 'radial-gradient(circle, rgba(124,58,237,0.15), transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -40, right: -40, width: 200, height: 200, background: 'radial-gradient(circle, rgba(6,182,212,0.15), transparent 70%)', pointerEvents: 'none' }} />
          
          <form onSubmit={handleCompare} style={{ position: 'relative', zIndex: 1 }}>
            <div className="flex flex-col md:flex-row md:items-end gap-6 mb-7 relative">
              
              <div className="flex-1 w-full">
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#7c3aed', boxShadow: '0 0 10px #7c3aed' }} /> Site A
                </label>
                <input type="text" value={urlA} onChange={e => setUrlA(e.target.value)} placeholder="e.g. apple.com" disabled={loading}
                  className="glass-input"
                  style={{ width: '100%', padding: '14px 18px', borderRadius: 14, fontSize: 15, color: '#fff', fontFamily: 'var(--font-sans)', boxSizing: 'border-box', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(124,58,237,0.3)', transition: 'all 0.3s' }}
                  onFocus={e => { e.target.style.borderColor = '#a78bfa'; e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.2)'; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(124,58,237,0.3)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>

              {/* VS Badge */}
              <div className="flex items-center justify-center self-center md:self-end md:mb-1.5 z-[2] flex-shrink-0">
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 14, color: '#fff', border: '3px solid #08080a', boxShadow: '0 4px 12px rgba(0,0,0,0.5), 0 0 20px rgba(124,58,237,0.4)' }}>VS</div>
              </div>

              <div className="flex-1 w-full">
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, color: '#67e8f9', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#06b6d4', boxShadow: '0 0 10px #06b6d4' }} /> Site B
                </label>
                <input type="text" value={urlB} onChange={e => setUrlB(e.target.value)} placeholder="e.g. samsung.com" disabled={loading}
                  className="glass-input"
                  style={{ width: '100%', padding: '14px 18px', borderRadius: 14, fontSize: 15, color: '#fff', fontFamily: 'var(--font-sans)', boxSizing: 'border-box', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(6,182,212,0.3)', transition: 'all 0.3s' }}
                  onFocus={e => { e.target.style.borderColor = '#67e8f9'; e.target.style.boxShadow = '0 0 0 3px rgba(6,182,212,0.2)'; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(6,182,212,0.3)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.03)', padding: '6px 12px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.05)' }}>
                <Activity style={{ width: 14, height: 14, color: mode === 'live' ? '#10b981' : '#a78bfa' }} />
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{mode === 'live' ? 'Live API Connected' : 'Local Simulation'}</span>
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="btn-primary" style={{ opacity: loading ? 0.7 : 1, pointerEvents: loading ? 'none' : 'auto', fontSize: 14, padding: '12px 28px', borderRadius: 12, background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}>
                {loading ? <><Loader2 style={{ width: 18, height: 18, animation: 'spin-slow 1s linear infinite' }} /> Analyzing...</> : <>Run Comparison <ArrowRight style={{ width: 18, height: 18 }} /></>}
              </motion.button>
            </div>
          </form>

          {error && (
            <motion.div initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 20, padding: '14px 20px', borderRadius: 12, background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.25)', color: '#fda4af', fontSize: 13, fontWeight: 500 }}>
              <AlertCircle style={{ width: 18, height: 18, flexShrink: 0, color: '#f43f5e' }} />{error}
            </motion.div>
          )}
        </motion.div>

        {/* Dynamic Loading State */}
        <AnimatePresence>
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center', padding: '60px 0' }}>
              <div style={{ position: 'relative', width: 120, height: 120 }}>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px dashed rgba(124,58,237,0.3)', borderTopColor: '#7c3aed' }} />
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} style={{ position: 'absolute', inset: 10, borderRadius: '50%', border: '2px dashed rgba(6,182,212,0.3)', borderBottomColor: '#06b6d4' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Scale style={{ width: 32, height: 32, color: '#fff', opacity: 0.5 }} />
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Comparing Profiles</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Fetching metrics, scanning accessibility, and evaluating performance...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Dashboard */}
        <AnimatePresence>
          {showResults && !loading && (
            <motion.div variants={staggerContainer} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

              {/* Triumphant Winner Banner */}
              <motion.div variants={itemAnim} style={{ padding: '32px 40px', borderRadius: 24, background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(16,185,129,0.03))', border: '1px solid rgba(16,185,129,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
                <div style={{ position: 'absolute', right: '-5%', top: '-50%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(16,185,129,0.15), transparent 70%)', pointerEvents: 'none' }} />
                
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, position: 'relative' }}>
                  <div style={{ width: 64, height: 64, borderRadius: 18, background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.05))', border: '1px solid rgba(16,185,129,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(16,185,129,0.2)' }}>
                    <Trophy style={{ width: 30, height: 30, color: '#34d399' }} />
                  </div>
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 24, color: '#fff', marginBottom: 6, letterSpacing: '-0.02em' }}>Audit Complete</h2>
                    <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
                      {winner === 'tie'
                        ? <><strong style={{ color: '#fff' }}>It\'s a tie!</strong> Both sites scored exactly {resultA.scores.overall}/100.</>
                        : winner === 'A'
                          ? <><strong style={{ color: '#c4b5fd' }}>{resultA.domain}</strong> wins the face-off with <strong style={{ color: '#6ee7b7' }}>{resultA.scores.overall}</strong> vs {resultB.scores.overall}.</>
                          : <><strong style={{ color: '#67e8f9' }}>{resultB.domain}</strong> wins the face-off with <strong style={{ color: '#6ee7b7' }}>{resultB.scores.overall}</strong> vs {resultA.scores.overall}.</>
                      }
                    </p>
                  </div>
                </div>
                
                {winner !== 'tie' && (
                  <div style={{ textAlign: 'center', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', padding: '18px 32px', borderRadius: 18, flexShrink: 0, position: 'relative', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)' }}>
                    <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Score Margin</p>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 32, color: '#34d399', letterSpacing: '-0.02em', textShadow: '0 0 20px rgba(16,185,129,0.4)' }}>
                      +{Math.abs(resultA.scores.overall - resultB.scores.overall)}
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Radar + Bars */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 24 }}>

                {/* Radar */}
                <motion.div variants={itemAnim} className="glass-panel" style={{ borderRadius: 24, padding: 32, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 4 }}>Radar Overview</h3>
                      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Multi-axis capability comparison</p>
                    </div>
                  </div>
                  <div style={{ flex: 1, minHeight: 280 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData()}>
                        <PolarGrid stroke="rgba(255,255,255,0.1)" strokeDasharray="3 3" />
                        <PolarAngleAxis dataKey="subject" stroke="rgba(255,255,255,0.4)" fontSize={11} fontWeight={600} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(255,255,255,0)" tick={false} />
                        <Radar name={resultA.domain} dataKey="A" stroke="#a78bfa" fill="#7c3aed" fillOpacity={0.25} strokeWidth={2.5} />
                        <Radar name={resultB.domain} dataKey="B" stroke="#67e8f9" fill="#06b6d4" fillOpacity={0.25} strokeWidth={2.5} />
                        <Tooltip contentStyle={{ background: 'rgba(10,10,12,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 20, padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: 12 }}>
                    {[{ d: resultA.domain, color: '#a78bfa' }, { d: resultB.domain, color: '#67e8f9' }].map(({ d, color }) => (
                      <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>
                        <span style={{ width: 12, height: 12, borderRadius: '50%', background: color, boxShadow: `0 0 10px ${color}` }} />{d}
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Score Bars */}
                <motion.div variants={itemAnim} className="glass-panel" style={{ borderRadius: 24, padding: 32 }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 4 }}>Category Head-to-Head</h3>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 32 }}>Score breakdowns across key metrics</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                    {radarData().map((item, idx) => {
                      const winA = item.A >= item.B, winB = item.B >= item.A;
                      return (
                        <div key={item.subject}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                            <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.subject}</span>
                            <div style={{ display: 'flex', gap: 14, fontSize: 15, fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
                              <span style={{ color: winA ? '#a78bfa' : 'rgba(255,255,255,0.3)' }}>{item.A}</span>
                              <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 12, alignSelf: 'center' }}>VS</span>
                              <span style={{ color: winB ? '#67e8f9' : 'rgba(255,255,255,0.3)' }}>{item.B}</span>
                            </div>
                          </div>
                          <div style={{ position: 'relative', height: 10, background: 'rgba(255,255,255,0.05)', borderRadius: 999, display: 'flex', overflow: 'hidden', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)' }}>
                            <motion.div initial={{ width: 0 }} animate={{ width: `${item.A / 2}%` }} transition={{ duration: 1, delay: idx * 0.1 }} style={{ height: '100%', background: 'linear-gradient(90deg, #5b21b6, #8b5cf6)', borderRadius: '999px 0 0 999px', position: 'relative' }}>
                              {winA && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)', animation: 'shimmer 2s infinite' }} />}
                            </motion.div>
                            <div style={{ width: 2, background: 'rgba(255,255,255,0.1)', flexShrink: 0 }} />
                            <motion.div initial={{ width: 0 }} animate={{ width: `${item.B / 2}%` }} transition={{ duration: 1, delay: 0.1 + idx * 0.1 }} style={{ height: '100%', background: 'linear-gradient(90deg, #0891b2, #06b6d4)', borderRadius: '0 999px 999px 0', position: 'relative' }}>
                              {winB && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)', animation: 'shimmer 2s infinite' }} />}
                            </motion.div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>

              {/* Core Vitals Grid */}
              <motion.div variants={itemAnim}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 20, color: '#fff', letterSpacing: '-0.01em' }}>Core Web Vitals</h3>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Direct performance comparisons</p>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                  {Object.entries(resultA.metrics).map(([key, metric], idx) => {
                    const vA = metric.value, vB = resultB.metrics[key].value;
                    const lb = lowerBetter.includes(key);
                    const wA = lb ? vA < vB : vA > vB, wB = lb ? vB < vA : vB > vA;
                    return (
                      <motion.div key={key} whileHover={{ y: -4, boxShadow: '0 10px 25px rgba(0,0,0,0.4)' }} className="glass-panel" style={{ borderRadius: 18, padding: 20, position: 'relative', overflow: 'hidden', border: `1px solid rgba(255,255,255,0.05)` }}>
                        {wA && <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: 2, background: '#a78bfa', boxShadow: '0 0 10px #a78bfa' }} />}
                        {wB && <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: 2, background: '#67e8f9', boxShadow: '0 0 10px #67e8f9' }} />}
                        
                        <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>{metric.label}</p>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: 16, alignItems: 'center' }}>
                          <div>
                            <span style={{ fontSize: 10, fontWeight: 800, color: '#a78bfa', display: 'block', marginBottom: 4 }}>SITE A</span>
                            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 22, color: wA ? '#fff' : 'rgba(255,255,255,0.4)' }}>{vA}</span>
                            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginLeft: 2 }}>{metric.unit}</span>
                          </div>
                          <div style={{ width: 1, height: '100%', background: 'rgba(255,255,255,0.08)' }} />
                          <div>
                            <span style={{ fontSize: 10, fontWeight: 800, color: '#67e8f9', display: 'block', marginBottom: 4 }}>SITE B</span>
                            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 22, color: wB ? '#fff' : 'rgba(255,255,255,0.4)' }}>{vB}</span>
                            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginLeft: 2 }}>{metric.unit}</span>
                          </div>
                        </div>
                        
                        {wA !== wB && (
                          <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ fontSize: 10, fontWeight: 700, color: '#34d399', background: 'rgba(16,185,129,0.1)', padding: '4px 8px', borderRadius: 6, border: '1px solid rgba(16,185,129,0.2)' }}>
                              {Math.abs(vA - vB).toFixed(2)}{metric.unit} dif.
                            </span>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Side-by-Side Checklist */}
              <motion.div variants={itemAnim}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 20, color: '#fff', letterSpacing: '-0.01em' }}>Audit Checklist</h3>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Detailed pass/fail conditions</p>
                  </div>
                </div>
                
                {/* Custom Tab Bar */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 24, background: 'rgba(0,0,0,0.3)', padding: 6, borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)', flexWrap: 'wrap' }}>
                  {TABS.map(tab => {
                    const active = checklistTab === tab.key;
                    return (
                      <button key={tab.key} onClick={() => setChecklistTab(tab.key)}
                        style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px 16px', borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', background: active ? 'rgba(255,255,255,0.1)' : 'transparent', color: active ? '#fff' : 'rgba(255,255,255,0.4)', border: 'none', fontFamily: 'var(--font-sans)', boxShadow: active ? '0 4px 12px rgba(0,0,0,0.2)' : 'none' }}
                      >
                        <tab.icon style={{ width: 16, height: 16, color: active ? '#67e8f9' : 'currentColor' }} /> <span className="hidden sm:inline">{tab.label}</span>
                      </button>
                    )
                  })}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 24 }}>
                  {[{ result: resultA, color: '#a78bfa', glow: 'rgba(124,58,237,0.1)' }, { result: resultB, color: '#67e8f9', glow: 'rgba(6,182,212,0.1)' }].map(({ result, color, glow }) => (
                    <div key={result.domain} className="glass-panel" style={{ borderRadius: 24, padding: 28, position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 100, background: `linear-gradient(180deg, ${glow}, transparent)`, pointerEvents: 'none' }} />
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, position: 'relative' }}>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: glow, border: `1px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Globe style={{ width: 18, height: 18, color }} />
                        </div>
                        <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 18, color: '#fff' }}>{result.domain}</h4>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, position: 'relative' }}>
                        {result.audits[checklistTab]?.map((item, i) => (
                          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 12, background: item.status === 'pass' ? 'rgba(16,185,129,0.06)' : 'rgba(244,63,94,0.06)', border: item.status === 'pass' ? '1px solid rgba(16,185,129,0.15)' : '1px solid rgba(244,63,94,0.15)' }}>
                            {item.status === 'pass'
                              ? <CheckCircle2 style={{ width: 18, height: 18, color: '#34d399', flexShrink: 0 }} />
                              : <XCircle    style={{ width: 18, height: 18, color: '#fb7185', flexShrink: 0 }} />}
                            <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.85)', lineHeight: 1.4 }}>{item.title}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
