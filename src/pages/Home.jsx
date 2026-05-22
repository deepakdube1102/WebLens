import React, { useState } from 'react';
import { 
  ArrowRight, Globe, Settings, AlertCircle, Sparkles, Check, 
  Activity, Search, Eye, Shield, User, HelpCircle, ChevronRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Float animation config for cards
const floatTransition = (delay = 0) => ({
  y: {
    duration: 3,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
    delay: delay
  },
  opacity: {
    duration: 0.6
  }
});

export default function Home({ onStartAnalysis, onNavigate, apiKey, setApiKey, mode, setMode }) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  const validateUrl = (val) => {
    if (!val) {
      setError('Please enter a website URL');
      return false;
    }
    const ok = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/i.test(val);
    if (!ok) {
      setError('Please enter a valid URL — e.g. stripe.com');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateUrl(url)) {
      onStartAnalysis(url);
    }
  };

  const QUICK_LINKS = [
    { label: 'vercel.com', icon: '▲' },
    { label: 'stripe.com', icon: 'S' },
    { label: 'github.com', icon: '⌘' },
    { label: 'figma.com', icon: '❖' }
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      position: 'relative', 
      overflow: 'hidden', 
      backgroundColor: '#000000', 
      color: '#CBD5E1',
      fontFamily: 'var(--font-sans)'
    }}>
      
      {/* ── Premium Ambient Background, Particles & Spotlights ── */}
      {/* Grid Texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
        backgroundSize: '70px 70px',
        backgroundPosition: 'center top',
        pointerEvents: 'none',
        opacity: 0.85,
        zIndex: 0
      }} />

      {/* Interactive Floating Particles Component */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        {Array.from({ length: 24 }).map((_, i) => {
          const size = Math.random() * 3 + 1;
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const duration = Math.random() * 8 + 8;
          const delay = Math.random() * 4;
          return (
            <motion.div
              key={i}
              animate={{
                y: [0, -35, 0],
                x: [0, Math.random() * 16 - 8, 0],
                opacity: [0.12, 0.45, 0.12]
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay
              }}
              style={{
                position: 'absolute',
                width: size,
                height: size,
                background: i % 2 === 0 ? '#14B8A6' : '#2563EB',
                borderRadius: '50%',
                left: `${left}%`,
                top: `${top}%`,
                boxShadow: i % 2 === 0 ? '0 0 8px #14B8A6' : '0 0 8px #2563EB'
              }}
            />
          );
        })}
      </div>

      {/* Blue Left Glow */}
      <div style={{
        position: 'absolute',
        top: '8%',
        left: '-12%',
        width: '55vw',
        height: '55vw',
        background: 'radial-gradient(circle, rgba(37,99,235,0.09) 0%, transparent 68%)',
        filter: 'blur(110px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Moving Circular Gradient Mix of Teal and Blue */}
      <motion.div
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 50, -30, 0],
          scale: [1, 1.15, 0.9, 1],
          opacity: [0.65, 0.9, 0.7, 0.65]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '12%',
          right: '-18%',
          width: '55vw',
          height: '55vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 40% 40%, rgba(20,184,166,0.16) 0%, rgba(37,99,235,0.1) 40%, transparent 72%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* ── HERO SECTION ── */}
      <section style={{ 
        position: 'relative', 
        zIndex: 10, 
        maxWidth: 1200, 
        margin: '0 auto', 
        padding: '130px 24px 10px', 
        textAlign: 'center' 
      }}>
        
        {/* Massive Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, delay: 0.05 }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: 'clamp(36px, 5.5vw, 62px)',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
            marginBottom: 16,
            maxWidth: 980,
            marginLeft: 'auto',
            marginRight: 'auto',
            textShadow: '0 4px 30px rgba(0,0,0,0.6)'
          }}
        >
          Analyze Your Site,<br />
          <span style={{
            background: 'linear-gradient(to right, #2563EB, #14B8A6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>Optimize Faster.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, delay: 0.12 }}
          style={{
            fontSize: 'clamp(14px, 1.8vw, 15.5px)',
            color: '#CBD5E1',
            opacity: 0.8,
            maxWidth: 680,
            margin: '0 auto 20px',
            lineHeight: 1.5,
            letterSpacing: '-0.01em'
          }}
        >
          Uncover performance, SEO, and accessibility insights in seconds.
        </motion.p>

        {/* ── Sleek Capsule URL Input ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
          style={{ maxWidth: 660, margin: '0 auto 16px', position: 'relative', zIndex: 30 }}
        >
          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            alignItems: 'center',
            padding: '5px 5px 5px 22px',
            borderRadius: 9999,
            background: 'rgba(10,10,12,0.5)',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.03)',
            transition: 'border-color 0.3s, box-shadow 0.3s'
          }}
          onFocusCapture={(e) => {
            e.currentTarget.style.borderColor = 'rgba(20,184,166,0.35)';
            e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.65), 0 0 25px rgba(20,184,166,0.15)';
          }}
          onBlurCapture={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
            e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.55)';
          }}
          >
            <Globe style={{ width: 18, height: 18, color: 'rgba(20,184,166,0.4)', marginRight: 12, flexShrink: 0 }} />
            <input
              type="text"
              value={url}
              onChange={e => { setUrl(e.target.value); setError(''); }}
              placeholder="https://yourwebsite.com"
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#FFFFFF',
                fontSize: 15,
                padding: '12px 0',
                fontFamily: 'var(--font-sans)'
              }}
            />
            <button type="submit" style={{
              flexShrink: 0,
              borderRadius: 9999,
              background: 'linear-gradient(135deg, #2563EB, #14B8A6)',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: 14,
              padding: '12px 28px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 4px 20px rgba(20,184,166,0.22)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 24px rgba(20,184,166,0.38)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(20,184,166,0.22)';
            }}
            >
              Analyze Website →
            </button>
          </form>

          {error && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, color: '#f43f5e', fontSize: 13, paddingLeft: 16 }}>
              <AlertCircle style={{ width: 14, height: 14 }} />
              {error}
            </motion.div>
          )}

          {/* Quick link tags with icons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginTop: 12 }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', alignSelf: 'center' }}>Try with one of these:</span>
            {QUICK_LINKS.map(q => (
              <button key={q.label} type="button" onClick={() => { setUrl(q.label); setError(''); }}
                style={{
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.45)',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 9999,
                  padding: '5px 14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'all 0.2s'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                }}
              >
                <span style={{ fontSize: 10, opacity: 0.6 }}>{q.icon}</span>
                {q.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              style={{
                fontSize: 11,
                color: showSettings ? '#14B8A6' : 'rgba(255,255,255,0.35)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                marginLeft: 12,
                transition: 'color 0.2s'
              }}
            >
              <Settings style={{ width: 12, height: 12, transform: showSettings ? 'rotate(90deg)' : 'none', transition: 'transform 0.4s' }} />
              Settings
            </button>
          </div>
        </motion.div>

        {/* Engine Settings Drawer */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ maxWidth: 650, margin: '0 auto 24px', overflow: 'hidden', position: 'relative', zIndex: 30 }}
            >
              <div style={{
                background: 'rgba(10,10,12,0.8)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 16,
                padding: 16,
                textAlign: 'left'
              }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>Audit Engine</label>
                  <div style={{ display: 'flex', gap: 4, padding: 3, background: 'rgba(0,0,0,0.3)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)' }}>
                    {[['live','Google API'], ['simulation','Simulator']].map(([val, lbl]) => (
                      <button key={val} type="button" onClick={() => setMode(val)}
                        style={{
                          flex: 1,
                          padding: '6px 10px',
                          borderRadius: 6,
                          fontSize: 11,
                          fontWeight: 500,
                          cursor: 'pointer',
                          background: mode === val ? 'linear-gradient(135deg, #2563EB, #14B8A6)' : 'transparent',
                          color: mode === val ? '#FFFFFF' : 'rgba(255,255,255,0.4)',
                          border: 'none',
                          boxShadow: mode === val ? '0 2px 6px rgba(20,184,166,0.2)' : 'none'
                        }}
                      >{lbl}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>Google API Key (Optional)</label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={e => setApiKey(e.target.value)}
                    placeholder="Enter PageSpeed API Key"
                    style={{
                      width: '100%',
                      background: 'rgba(0,0,0,0.3)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      borderRadius: 8,
                      padding: '8px 12px',
                      fontSize: 12,
                      color: '#FFFFFF',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>



        {/* ── Visual Story Section: Curved Glowing Line crossing screen ── */}
        {/* Desktop Curved Story Section */}
        <div id="how-it-works" className="hidden md:block" style={{ position: 'relative', width: '100%', height: '180px', marginTop: '60px', zIndex: 1 }}>
          <svg viewBox="0 0 1200 100" width="100%" height="100px" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
            
            <defs>
              <linearGradient id="blueTealGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="50%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#14B8A6" />
              </linearGradient>
              <filter id="neonGlowEffect" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="7" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Smooth glowing curved growth line crossing screen with scanning visual sweep */}
            <motion.path 
              d="M 50 85 Q 280 5 496 68 T 912 15 Q 1030 -15 1150 -30" 
              stroke="url(#blueTealGradient)" 
              strokeWidth="3.5" 
              filter="url(#neonGlowEffect)"
              strokeLinecap="round"
              strokeDasharray="20, 10"
              animate={{ strokeDashoffset: [-60, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            
            <path 
              d="M 50 85 Q 280 5 496 68 T 912 15 Q 1030 -15 1150 -30" 
              stroke="url(#blueTealGradient)" 
              strokeWidth="9" 
              opacity="0.12"
              strokeLinecap="round"
            />

            {/* Connected milestones represented by glowing nodes */}
            {/* Performance Node */}
            <circle cx="288" cy="40" r="7.5" fill="#2563EB" stroke="#000000" strokeWidth="2.5" style={{ filter: 'drop-shadow(0 0 8px #2563EB)' }} />
            {/* SEO Node */}
            <circle cx="496" cy="68" r="7.5" fill="#2563EB" stroke="#000000" strokeWidth="2.5" style={{ filter: 'drop-shadow(0 0 8px #2563EB)' }} />
            {/* Accessibility Node */}
            <circle cx="704" cy="86" r="7.5" fill="#14B8A6" stroke="#000000" strokeWidth="2.5" style={{ filter: 'drop-shadow(0 0 8px #14B8A6)' }} />
            {/* Best Practices Node */}
            <circle cx="912" cy="15" r="7.5" fill="#14B8A6" stroke="#000000" strokeWidth="2.5" style={{ filter: 'drop-shadow(0 0 8px #14B8A6)' }} />
          </svg>

          {/* 4 floating milestone labels below corresponding nodes */}
          <div style={{
            position: 'absolute',
            top: '110px',
            left: 0,
            right: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            textAlign: 'center',
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 40px'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Activity style={{ width: 10, height: 10, color: '#2563EB' }} />
                </div>
              </div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 13, color: '#FFFFFF', marginBottom: 4 }}>Performance</h4>
              <p style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.4)', maxWidth: 200, margin: '0 auto', lineHeight: 1.4 }}>
                Real-time analysis of page load speed, layout shifts, and visual feedback.
              </p>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Search style={{ width: 10, height: 10, color: '#2563EB' }} />
                </div>
              </div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 13, color: '#FFFFFF', marginBottom: 4 }}>SEO</h4>
              <p style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.4)', maxWidth: 200, margin: '0 auto', lineHeight: 1.4 }}>
                Indexability scanning, header integrity, meta validity and search schemas.
              </p>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User style={{ width: 10, height: 10, color: '#14B8A6' }} />
                </div>
              </div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 13, color: '#FFFFFF', marginBottom: 4 }}>Accessibility</h4>
              <p style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.4)', maxWidth: 200, margin: '0 auto', lineHeight: 1.4 }}>
                Ensure WCAG compliance, screen reader support, and robust contrast checks.
              </p>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Shield style={{ width: 10, height: 10, color: '#14B8A6' }} />
                </div>
              </div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 13, color: '#FFFFFF', marginBottom: 4 }}>Best Practices</h4>
              <p style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.4)', maxWidth: 200, margin: '0 auto', lineHeight: 1.4 }}>
                Validate package security layers, code quality metrics, and modern standards.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Vertical Milestones Flow */}
        <div className="block md:hidden" style={{ marginTop: '40px', padding: '0 16px', zIndex: 1, position: 'relative' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, textAlign: 'left' }}>
            {[
              {
                title: 'Performance',
                desc: 'Real-time analysis of page load speed, layout shifts, and visual feedback.',
                ic: <Activity style={{ width: 12, height: 12, color: '#2563EB' }} />,
                bg: 'rgba(37,99,235,0.1)',
                border: '1px solid rgba(37,99,235,0.2)'
              },
              {
                title: 'SEO',
                desc: 'Indexability scanning, header integrity, meta validity and search schemas.',
                ic: <Search style={{ width: 12, height: 12, color: '#2563EB' }} />,
                bg: 'rgba(37,99,235,0.1)',
                border: '1px solid rgba(37,99,235,0.2)'
              },
              {
                title: 'Accessibility',
                desc: 'Ensure WCAG compliance, screen reader support, and robust contrast checks.',
                ic: <User style={{ width: 12, height: 12, color: '#14B8A6' }} />,
                bg: 'rgba(20,184,166,0.1)',
                border: '1px solid rgba(20,184,166,0.2)'
              },
              {
                title: 'Best Practices',
                desc: 'Validate package security layers, code quality metrics, and modern standards.',
                ic: <Shield style={{ width: 12, height: 12, color: '#14B8A6' }} />,
                bg: 'rgba(20,184,166,0.1)',
                border: '1px solid rgba(20,184,166,0.2)'
              }
            ].map((item, idx) => (
              <div key={idx} style={{
                display: 'flex',
                gap: 16,
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.04)',
                borderRadius: 16,
                padding: 16,
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: item.bg, border: item.border, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {item.ic}
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 14, color: '#FFFFFF', marginBottom: 4 }}>{item.title}</h4>
                  <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.4)', lineHeight: 1.4, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ── TRUST SECTION ── */}
      <section style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: 820,
        margin: '0 auto',
        padding: '90px 24px 70px',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.03)'
      }}>
        
        {/* Avatar cluster centered with premium alignment */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ display: 'inline-flex', position: 'relative', height: 36, width: 88 }}>
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64&q=80" alt="User 1" style={{ width: 30, height: 30, borderRadius: '50%', border: '2px solid #000000', position: 'absolute', left: 0, zIndex: 3 }} />
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64&q=80" alt="User 2" style={{ width: 30, height: 30, borderRadius: '50%', border: '2px solid #000000', position: 'absolute', left: 16, zIndex: 2 }} />
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64&q=80" alt="User 3" style={{ width: 30, height: 30, borderRadius: '50%', border: '2px solid #000000', position: 'absolute', left: 32, zIndex: 1 }} />
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, #2563EB, #14B8A6)', border: '2px solid #000000', position: 'absolute', left: 48, zIndex: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff' }}>+5k</div>
          </div>
        </div>

        {/* Centered Premium Typography */}
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 500,
          fontSize: 'clamp(20px, 2.9vw, 25px)',
          lineHeight: 1.45,
          color: '#FFFFFF',
          maxWidth: 640,
          margin: '0 auto 36px',
          letterSpacing: '-0.02em',
          textShadow: '0 2px 10px rgba(0,0,0,0.4)'
        }}>
          "We help developers, startups and businesses understand their websites better."
        </p>

        {/* 4 Capsule Tags underneath - strict brand colors */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          justifyContent: 'center',
          marginTop: 10
        }}>
          {[
            { label: 'Search Engine', dot: '#2563EB', icon: Search },
            { label: 'Digital Content', dot: '#14B8A6', icon: Globe },
            { label: 'Social Media', dot: '#2563EB', icon: Activity },
            { label: 'Lead Collection', dot: '#14B8A6', icon: User }
          ].map(tag => (
            <span key={tag.label} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 12,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.7)',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '6px 16px',
              borderRadius: 9999
            }}>
              <tag.icon style={{ width: 12, height: 12, color: tag.dot }} />
              {tag.label}
            </span>
          ))}
        </div>

      </section>

      {/* ── FEATURES SECTION ("Why Choose WebLens?") ── */}
      <div style={{
        width: '100%',
        backgroundColor: '#030712',
        borderTop: '1px solid rgba(255, 255, 255, 0.03)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* Subtle repeating grid overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: 'center top',
          pointerEvents: 'none',
          opacity: 0.75,
          zIndex: 0
        }} />

        {/* Cinematic Neon Light Emitter & Spotlight Cone */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '360px',
          height: '5px',
          background: 'linear-gradient(90deg, transparent, #3b82f6 12%, #2dd4bf 32%, #22d3ee 50%, #2dd4bf 68%, #3b82f6 88%, transparent)',
          boxShadow: '0 0 20px #2dd4bf, 0 0 40px #3b82f6, 0 0 80px rgba(34, 211, 238, 0.95)',
          zIndex: 3
        }} />

        {/* Volumetric spotlight cone projection */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '850px',
          height: '450px',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 1.0
        }}>
          <svg viewBox="0 0 800 420" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <defs>
              <linearGradient id="blueTealVolumetric" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.65" />
                <stop offset="25%" stopColor="#22d3ee" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#030712" stopOpacity="0" />
              </linearGradient>
              <filter id="cinematicGlowBlur">
                <feGaussianBlur stdDeviation="35" />
              </filter>
            </defs>
            <polygon 
              points="260,0 540,0 750,420 50,420" 
              fill="url(#blueTealVolumetric)" 
              filter="url(#cinematicGlowBlur)"
            />
          </svg>
        </div>

        {/* Subtle background particles & stars */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          {/* Low contrast star points */}
          {[
            { t: 40, l: 15 }, { t: 25, l: 82 }, { t: 65, l: 8 }, { t: 75, l: 88 },
            { t: 15, l: 45 }, { t: 55, l: 78 }, { t: 82, l: 24 }, { t: 90, l: 65 }
          ].map((st, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: `${st.t}%`,
              left: `${st.l}%`,
              width: i % 2 === 0 ? '2px' : '3px',
              height: i % 2 === 0 ? '2px' : '3px',
              backgroundColor: i % 2 === 0 ? '#14B8A6' : '#2563EB',
              borderRadius: '50%',
              opacity: 0.25,
              boxShadow: i % 2 === 0 ? '0 0 6px #14B8A6' : '0 0 6px #2563EB'
            }} />
          ))}
        </div>

        <section id="features" style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: 1200,
          margin: '0 auto',
          padding: '100px 24px 150px',
          textAlign: 'center'
        }}>
          
          {/* Badge: "FEATURES" */}
          <div style={{ display: 'inline-flex', marginBottom: 24, position: 'relative', zIndex: 5 }}>
            <span style={{
              fontSize: 10.5,
              fontWeight: 600,
              color: '#2dd4bf',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              background: 'rgba(45,212,191,0.08)',
              border: '1px solid rgba(45,212,191,0.38)',
              padding: '5px 16px',
              borderRadius: 9999,
              boxShadow: '0 0 18px rgba(45,212,191,0.25)',
              backdropFilter: 'blur(8px)'
            }}>
              FEATURES
            </span>
          </div>

          {/* Heading */}
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: 'clamp(28px, 4vw, 42px)',
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            marginBottom: 80,
            position: 'relative',
            zIndex: 5
          }}>
            Reason to Choose <span style={{ background: 'linear-gradient(to right, #2563EB, #14B8A6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>WebLens</span>
          </h2>

          {/* Three Ultra-Premium Mockup Cards */}
          <div style={{
            position: 'relative',
            zIndex: 10
          }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* CARD 1: Performance Intelligence (honeycomb folder directory) */}
            <motion.div 
              whileHover={{ 
                y: -8, 
                borderColor: 'rgba(255,255,255,0.12)', 
                boxShadow: '0 40px 80px rgba(0,0,0,0.8), 0 0 40px rgba(20,184,166,0.08)' 
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              style={{
                background: 'rgba(8, 8, 11, 0.75)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderTop: '3px solid #14B8A6',
                borderRadius: 24,
                padding: '24px 24px 36px',
                minHeight: '480px',
                height: 'auto',
                backdropFilter: 'blur(20px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 30px 60px rgba(0,0,0,0.65)',
                textAlign: 'left',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer'
              }}
            >
              {/* Premium Tag */}
              <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 10 }}>
                <span style={{ fontSize: '9px', fontWeight: 700, color: '#14B8A6', background: 'rgba(20,184,166,0.08)', padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(20,184,166,0.2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Speed</span>
              </div>
              {/* Visual Container */}
              <div style={{ position: 'relative', width: '100%', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                
                {/* Honeycomb Background */}
                <svg style={{ position: 'absolute', width: '230px', height: '190px', opacity: 0.16, overflow: 'visible', zIndex: 0 }} viewBox="0 0 120 100">
                  <defs>
                    <radialGradient id="honeycombGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.6"/>
                      <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
                    </radialGradient>
                  </defs>
                  <path d="M30,15 L45,6 L60,15 L60,33 L45,42 L30,33 Z M55,30 L70,21 L85,30 L85,48 L70,57 L55,48 Z M30,45 L45,36 L60,45 L60,63 L45,72 L30,63 Z M80,15 L95,6 L110,15 L110,33 L95,42 L80,33 Z M5,30 L20,21 L35,30 L35,48 L20,57 L5,48 Z" stroke="#14B8A6" strokeWidth="1" fill="none" />
                  <circle cx="45" cy="6" r="2.5" fill="#14B8A6" style={{ filter: 'drop-shadow(0 0 5px #14B8A6)' }} />
                  <circle cx="85" cy="30" r="2.5" fill="#2563EB" style={{ filter: 'drop-shadow(0 0 5px #2563EB)' }} />
                </svg>

                {/* Connecting lines for float modules */}
                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
                  <path d="M 40 85 L 75 100" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
                  <path d="M 40 135 L 75 125" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
                  <path d="M 230 75 L 195 90" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
                  <path d="M 230 115 L 195 110" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
                  <path d="M 230 155 L 195 130" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
                </svg>
                
                {/* Central Folder Container */}
                <div style={{ position: 'relative', width: '160px', height: '115px', zIndex: 2, marginTop: '20px' }}>
                  {/* Folder Back Tab */}
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '10px',
                    width: '52px',
                    height: '14px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderBottom: 'none',
                    borderRadius: '6px 6px 0 0',
                    zIndex: 1
                  }} />
                  
                  {/* Folder Body Sheet */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(12, 12, 16, 0.85)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '14px',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.04)',
                    zIndex: 2,
                    padding: '14px 12px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    {/* Folder Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                      </div>
                      <div style={{ width: '38px', height: '7px', borderRadius: '4px', background: 'rgba(255,255,255,0.08)' }} />
                    </div>
                    
                    {/* Folder Inner Card Widget */}
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '10px',
                      padding: '8px 10px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      marginTop: '8px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ width: '48px', height: '5px', borderRadius: '3px', background: 'rgba(255,255,255,0.2)' }} />
                        <div style={{ width: '16px', height: '5px', borderRadius: '3px', background: '#14B8A6', opacity: 0.8 }} />
                      </div>
                      <div style={{ width: '72px', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.08)' }} />
                    </div>
                    
                    {/* Pulsing blue pill action with Plus Button on bottom-left */}
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: '6px' }}>
                      <motion.div 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #2563EB, #14B8A6)',
                          boxShadow: '0 0 12px rgba(37,99,235,0.6)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '13px',
                          fontWeight: 800,
                          color: '#FFFFFF'
                        }}
                      >
                        +
                      </motion.div>
                      <div style={{ marginLeft: 8, width: '42px', height: '5px', borderRadius: '2.5px', background: 'rgba(255,255,255,0.15)' }} />
                    </div>
                  </div>
                  
                  {/* Left Floating sidebar widget */}
                  <div style={{
                    position: 'absolute',
                    left: '-48px',
                    top: '24px',
                    width: '36px',
                    height: '62px',
                    background: 'rgba(10,10,12,0.8)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '10px',
                    backdropFilter: 'blur(12px)',
                    zIndex: 3,
                    padding: '8px 6px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '-10px 15px 30px rgba(0,0,0,0.55)'
                  }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'rgba(37,99,235,0.2)', border: '1px solid rgba(37,99,235,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', color: '#2563EB', fontWeight: 800 }}>✓</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <div style={{ width: '20px', height: '3px', borderRadius: '1.5px', background: 'rgba(255,255,255,0.2)' }} />
                      <div style={{ width: '14px', height: '3px', borderRadius: '1.5px', background: 'rgba(255,255,255,0.1)' }} />
                    </div>
                  </div>

                  {/* Right Floating sidebar widget */}
                  <div style={{
                    position: 'absolute',
                    right: '-46px',
                    bottom: '12px',
                    width: '42px',
                    height: '56px',
                    background: 'rgba(10,10,12,0.8)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '10px',
                    backdropFilter: 'blur(12px)',
                    zIndex: 3,
                    padding: '8px 6px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '10px 15px 30px rgba(0,0,0,0.55)'
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ width: '26px', height: '3px', borderRadius: '1.5px', background: 'rgba(255,255,255,0.3)' }} />
                      <div style={{ width: '18px', height: '3px', borderRadius: '1.5px', background: 'rgba(255,255,255,0.12)' }} />
                    </div>
                    <div style={{ width: '22px', height: '6px', borderRadius: '3px', background: 'rgba(20,184,166,0.2)', border: '1px solid rgba(20,184,166,0.45)' }} />
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <div style={{ position: 'relative', zIndex: 5, padding: '0 8px 12px', marginTop: '20px' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 18, color: '#FFFFFF', margin: '0 0 12px 0', textAlign: 'left' }}>
                  Performance Intelligence
                </h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, margin: '0 0 20px 0' }}>
                  Unlock lightning-fast responsiveness. WebLens parses complex Core Web Vitals in milliseconds, providing an automated breakdown of loading delays, interaction latency, and rendering shifts.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    'Sub-second diagnostic feedback',
                    'Real-time Interaction to Next Paint (INP) analysis',
                    'Automated performance scoring & metrics optimization'
                  ].map((bullet, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#14B8A6', boxShadow: '0 0 8px #14B8A6', flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.4 }}>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* CARD 2: Website Health (stacked card decks + outline) */}
            <motion.div 
              whileHover={{ 
                y: -8, 
                borderColor: 'rgba(255,255,255,0.12)', 
                boxShadow: '0 40px 80px rgba(0,0,0,0.8), 0 0 40px rgba(20,184,166,0.08)' 
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              style={{
                background: 'rgba(8, 8, 11, 0.75)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderTop: '3px solid #2563EB',
                borderRadius: 24,
                padding: '24px 24px 36px',
                minHeight: '480px',
                height: 'auto',
                backdropFilter: 'blur(20px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 30px 60px rgba(0,0,0,0.65)',
                textAlign: 'left',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer'
              }}
            >
              {/* Premium Tag */}
              <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 10 }}>
                <span style={{ fontSize: '9px', fontWeight: 700, color: '#2563EB', background: 'rgba(37,99,235,0.08)', padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(37,99,235,0.2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Structure</span>
              </div>
              {/* Visual Container */}
              <div style={{ position: 'relative', width: '100%', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  position: 'absolute',
                  width: '180px',
                  height: '150px',
                  border: '1px solid rgba(255,255,255,0.03)',
                  borderRadius: '20px',
                  background: 'radial-gradient(circle at 50% 50%, rgba(37,99,235,0.02) 0%, transparent 80%)',
                  pointerEvents: 'none',
                  zIndex: 0
                }} />
                
                {/* Cascading Card Stack */}
                <div style={{ position: 'relative', width: '144px', height: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
                  
                  {/* Card 3 (Back) */}
                  <div style={{
                    position: 'absolute',
                    width: '124px',
                    height: '84px',
                    background: 'rgba(255,255,255,0.01)',
                    border: '1px solid rgba(255,255,255,0.02)',
                    borderRadius: '10px',
                    transform: 'translateY(-14px) scale(0.9)',
                    opacity: 0.15,
                    zIndex: 1
                  }} />
                  
                  {/* Card 2 (Middle) */}
                  <div style={{
                    position: 'absolute',
                    width: '134px',
                    height: '92px',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.04)',
                    borderRadius: '12px',
                    transform: 'translateY(-7px) scale(0.95)',
                    opacity: 0.45,
                    zIndex: 2
                  }} />
                  
                  {/* Card 1 (Front Card) */}
                  <div style={{
                    position: 'absolute',
                    width: '144px',
                    height: '100px',
                    background: 'rgba(8, 8, 12, 0.92)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '14px',
                    padding: '12px 14px',
                    zIndex: 3,
                    boxShadow: '0 25px 50px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '1.5px',
                      background: 'linear-gradient(90deg, #2563EB, #14B8A6)'
                    }} />

                    {/* Header Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '10px', fontWeight: 500, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-sans)', letterSpacing: '0.02em' }}>Send</span>
                      
                      <motion.div
                        animate={{ boxShadow: ['0 0 6px rgba(37,99,235,0.4)', '0 0 14px rgba(37,99,235,0.8)', '0 0 6px rgba(37,99,235,0.4)'] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          background: '#2563EB',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '9px',
                          color: '#FFFFFF'
                        }}
                      >
                        ↗
                      </motion.div>
                    </div>
                    
                    {/* Balance */}
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em', margin: '4px 0 2px' }}>
                      $16,789.00
                    </div>
                    
                    {/* Bottom details */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '8.5px', color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>Overall:</span>
                      <span style={{ fontSize: '8.5px', color: '#10b981', fontWeight: 700, background: 'rgba(16,185,129,0.08)', padding: '1px 5px', borderRadius: '4px' }}>+12.4%</span>
                    </div>
                  </div>
                </div>

                {/* Top Floating Badge */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'rgba(10,10,12,0.8)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '8px',
                  padding: '5px 9px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  zIndex: 4,
                  boxShadow: '0 10px 20px rgba(0,0,0,0.45)'
                }}>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px #10B981' }} />
                  <span style={{ fontSize: '9px', fontWeight: 600, color: '#FFFFFF', opacity: 0.9 }}>+$100.00</span>
                </div>

                {/* Bottom Floating Badge */}
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  background: 'rgba(10,10,12,0.8)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '8px',
                  padding: '5px 9px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  zIndex: 4,
                  boxShadow: '0 10px 20px rgba(0,0,0,0.45)'
                }}>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#2563EB', boxShadow: '0 0 6px #2563EB' }} />
                  <span style={{ fontSize: '9px', fontWeight: 500, color: 'rgba(255,255,255,0.5)' }}>Dec 30, 2026</span>
                </div>
              </div>

              {/* Title & Description */}
              <div style={{ position: 'relative', zIndex: 5, padding: '0 8px 12px', marginTop: '20px' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 18, color: '#FFFFFF', margin: '0 0 12px 0', textAlign: 'left' }}>
                  Website Health
                </h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, margin: '0 0 20px 0' }}>
                  Ensure your structural baseline is bulletproof. Deeply inspect SEO signals, security standards, and metadata declarations to protect your site against regressions and ranking drops.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    'Comprehensive HTML markup diagnostics',
                    'SEO meta tags validation & crawlability audit',
                    'Security protocol and HTTPS compliance tracking'
                  ].map((bullet, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563EB', boxShadow: '0 0 8px #2563EB', flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.4 }}>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* CARD 3: Opportunity Detection (central scanner connected horizontally) */}
            <motion.div 
              whileHover={{ 
                y: -8, 
                borderColor: 'rgba(255,255,255,0.12)', 
                boxShadow: '0 40px 80px rgba(0,0,0,0.8), 0 0 40px rgba(20,184,166,0.08)' 
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              style={{
                background: 'rgba(8, 8, 11, 0.75)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderTop: '3px solid #F59E0B',
                borderRadius: 24,
                padding: '24px 24px 36px',
                minHeight: '480px',
                height: 'auto',
                backdropFilter: 'blur(20px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 30px 60px rgba(0,0,0,0.65)',
                textAlign: 'left',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer'
              }}
            >
              {/* Premium Tag */}
              <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 10 }}>
                <span style={{ fontSize: '9px', fontWeight: 700, color: '#F59E0B', background: 'rgba(245,158,11,0.08)', padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(245,158,11,0.2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Growth</span>
              </div>
              {/* Visual Container */}
              <div style={{ position: 'relative', width: '100%', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                
                {/* Left vertical pill capsule bar */}
                <div style={{
                  position: 'absolute',
                  left: '8px',
                  width: '32px',
                  height: '136px',
                  background: 'rgba(10,10,12,0.85)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '999px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  padding: '8px 0',
                  zIndex: 2,
                  boxShadow: '0 12px 24px rgba(0,0,0,0.5)'
                }}>
                  {[
                    { ic: '⚙️', active: false },
                    { ic: '👁️', active: false },
                    { ic: '💬', active: false },
                    { ic: '✓', active: true }
                  ].map((item, idx) => (
                    <div key={idx} style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: item.active ? '#2563EB' : 'rgba(255,255,255,0.02)',
                      border: item.active ? 'none' : '1px solid rgba(255,255,255,0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '9px',
                      color: '#FFFFFF',
                      boxShadow: item.active ? '0 0 8px rgba(37,99,235,0.6)' : 'none',
                      fontWeight: 700
                    }}>
                      {item.ic}
                    </div>
                  ))}
                </div>

                {/* Right vertical nodes list */}
                <div style={{
                  position: 'absolute',
                  right: '8px',
                  height: '144px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  zIndex: 2
                }}>
                  {[
                    { bg: '#2563EB', ic: '👤' },
                    { bg: '#14B8A6', ic: '🎈' },
                    { bg: '#EF4444', ic: '🔥' },
                    { bg: '#F59E0B', ic: '✨' },
                    { bg: '#10B981', ic: '😊' }
                  ].map((item, idx) => (
                    <div key={idx} style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: 'rgba(10,10,12,0.9)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                      position: 'relative'
                    }}>
                      <span style={{
                        position: 'absolute',
                        right: '-3px',
                        top: '2px',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: item.bg,
                        boxShadow: `0 0 6px ${item.bg}`
                      }} />
                      {item.ic}
                    </div>
                  ))}
                </div>

                {/* Connection Lines (SVG) */}
                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
                  <path d="M 40 60 L 140 110" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
                  <path d="M 40 82 L 140 110" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" fill="none" />
                  <path d="M 40 104 L 140 110" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
                  <path d="M 40 128 L 140 110" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />

                  <path d="M 180 110 L 268 46" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
                  <path d="M 180 110 L 268 76" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
                  <path d="M 180 110 L 268 110" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" fill="none" />
                  <path d="M 180 110 L 268 140" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
                  <path d="M 180 110 L 268 174" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
                  
                  <motion.circle
                    r="2"
                    fill="#14B8A6"
                    style={{ filter: 'drop-shadow(0 0 4px #14B8A6)' }}
                    animate={{ cx: [140, 40], cy: [110, 82] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.circle
                    r="2"
                    fill="#2563EB"
                    style={{ filter: 'drop-shadow(0 0 4px #2563EB)' }}
                    animate={{ cx: [180, 268], cy: [110, 110] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1.5 }}
                  />
                </svg>

                {/* Central Card with Multi-colored Glowing border and Solid White Circular Disk */}
                <div style={{ position: 'relative', width: '82px', height: '82px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '20px',
                    background: 'rgba(8, 8, 10, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 25px rgba(20,184,166,0.15), 0 15px 30px rgba(0,0,0,0.65)'
                  }}>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      style={{
                        position: 'absolute',
                        inset: '-1px',
                        borderRadius: '20px',
                        background: 'conic-gradient(from 0deg, #2563EB, #14B8A6, #2563EB)',
                        zIndex: -1,
                        opacity: 0.65
                      }}
                    />

                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                      zIndex: 2,
                      overflow: 'hidden'
                    }}>
                      <svg viewBox="0 0 100 100" width="38px" height="38px">
                        <circle cx="50" cy="50" r="32" stroke="#2563EB" strokeWidth="6" fill="none" opacity="0.15" />
                        <circle cx="50" cy="50" r="24" stroke="url(#logoGrad)" strokeWidth="8" fill="none" />
                        <path d="M 50 15 L 50 85" stroke="#14B8A6" strokeWidth="6" strokeLinecap="round" />
                        <defs>
                          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#2563EB" />
                            <stop offset="100%" stopColor="#14B8A6" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <div style={{ position: 'relative', zIndex: 5, padding: '0 8px 12px', marginTop: '20px' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 18, color: '#FFFFFF', margin: '0 0 12px 0', textAlign: 'left' }}>
                  Opportunity Detection
                </h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, margin: '0 0 20px 0' }}>
                  Transform diagnostics into clear, actionable roadmaps. Our intelligence engine pinpoints precise visual compromises, unoptimized media assets, and code inefficiencies holding you back.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    'Smart image formatting & modern compression advice',
                    'Critical CSS & render-blocking asset highlighting',
                    'Detailed carbon emission & resource weight estimates'
                  ].map((bullet, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F59E0B', boxShadow: '0 0 8px #F59E0B', flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.4 }}>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>

        </section>
      </div>


      {/* ── HIGH-FIDELITY COMPREHENSIVE AUDIT CTA CARD ── */}
      <section id="methodology" style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: 820,
        margin: '0 auto',
        padding: '0 24px 140px',
        textAlign: 'center'
      }}>
        {/* Ambient neon radial glows behind card */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          left: '10%',
          width: '80%',
          height: '140%',
          background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.08) 0%, rgba(20, 184, 166, 0.03) 50%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: -1
        }} />

        <motion.div
          whileHover={{ y: -4, borderColor: 'rgba(20, 184, 166, 0.25)' }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'linear-gradient(135deg, rgba(15, 15, 18, 0.65) 0%, rgba(8, 8, 10, 0.85) 100%)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '28px',
            padding: '54px 40px',
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle neon glowing top-border bar */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '2px',
            background: 'linear-gradient(90deg, #6366F1, #3B82F6, #14B8A6, #F59E0B)'
          }} />

          <div style={{ position: 'relative', zIndex: 2 }}>
            <h3 style={{ 
              fontFamily: 'var(--font-heading)', 
              fontWeight: 800, 
              fontSize: 32, 
              color: '#FFFFFF', 
              marginBottom: 16,
              letterSpacing: '-0.02em',
              lineHeight: 1.2
            }}>
              Launch a{' '}
              <span style={{ 
                background: 'linear-gradient(90deg, #14B8A6 0%, #3B82F6 50%, #6366F1 100%)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent',
                fontWeight: 800
              }}>
                comprehensive audit
              </span>
            </h3>
            <p style={{ 
              fontSize: 15, 
              color: 'rgba(255,255,255,0.45)', 
              maxWidth: 540, 
              margin: '0 auto 36px', 
              lineHeight: 1.6 
            }}>
              Run high-fidelity diagnostic simulations in under 10 seconds. Identify Core Web Vitals pain points, accessibility issues, and metadata optimization avenues instantly.
            </p>

            <motion.button 
              whileHover={{ scale: 1.04, boxShadow: '0 20px 40px rgba(20, 184, 166, 0.35)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              style={{
                background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 50%, #14b8a6 100%)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: 14,
                padding: '14px 36px',
                borderRadius: 9999,
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                boxShadow: '0 10px 25px rgba(20, 184, 166, 0.2)',
                transition: 'box-shadow 0.3s ease'
              }}
            >
              Scroll to Top & Analyze Website <ArrowRight style={{ width: 16, height: 16 }} />
            </motion.button>
          </div>

        </motion.div>
      </section>

    </div>
  );
}
