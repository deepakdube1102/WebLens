import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Analysis({ url, mode }) {
  const [percent, setPercent] = useState(0);

  const steps = [
    { text: 'Resolving domain & DNS handshake' },
    { text: mode === 'live' ? 'Connecting to Google Lighthouse servers' : 'Initializing local audit engine' },
    { text: 'Profiling Core Web Vitals & paint metrics' },
    { text: 'Scanning SEO tags and metadata structure' },
    { text: 'Running WCAG accessibility checks' },
    { text: 'Compiling prioritized recommendations' },
  ];

  // Derive activeStep directly from the progress percentage to ensure synchronization
  let activeStep = 0;
  if (percent >= 98) activeStep = 6;
  else if (percent >= 88) activeStep = 5;
  else if (percent >= 70) activeStep = 4;
  else if (percent >= 50) activeStep = 3;
  else if (percent >= 30) activeStep = 2;
  else if (percent >= 12) activeStep = 1;

  useEffect(() => {
    const iv = setInterval(() => {
      setPercent(p => {
        if (p >= 99) return 99;

        let inc = 1;
        if (mode === 'live') {
          // Dynamic easing progress curve for live Google PageSpeed API runs (approx 15 seconds)
          if (p < 15) {
            inc = Math.random() * 1.5 + 0.8; // Fast start
          } else if (p < 40) {
            inc = Math.random() * 0.8 + 0.4;
          } else if (p < 70) {
            inc = Math.random() * 0.4 + 0.2;
          } else if (p < 90) {
            inc = Math.random() * 0.2 + 0.1;
          } else if (p < 97) {
            inc = Math.random() * 0.08 + 0.04;
          } else {
            inc = 0.02; // Asymptotically crawl at 98-99% so it never freezes
          }
        } else {
          // Rapid progress for local simulation runs (approx 1.2 seconds total)
          // 40ms interval means 30 ticks in 1.2s. 99 / 30 = ~3.3% per tick.
          inc = Math.random() * 2 + 2.3;
        }

        return Math.min(p + inc, 99);
      });
    }, 40);

    return () => clearInterval(iv);
  }, [mode]);

  // Clean domain name for gorgeous display
  let cleanDomain = url;
  try {
    let raw = url.trim().toLowerCase();
    if (!raw.startsWith('http://') && !raw.startsWith('https://')) {
      raw = 'https://' + raw;
    }
    const parsed = new URL(raw);
    cleanDomain = parsed.hostname.replace('www.', '');
  } catch (e) {
    cleanDomain = url.replace('https://', '').replace('http://', '').split('/')[0];
  }

  // Determine current active step text
  const currentStepText = activeStep >= 6 
    ? 'Audit complete, loading dashboard...' 
    : steps[activeStep].text;

  return (
    <div style={{ 
      minHeight: '85vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '40px 24px', 
      position: 'relative', 
      overflow: 'hidden' 
    }}>
      {/* Subtle background glow */}
      <div style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: 800, 
        height: 400, 
        background: 'radial-gradient(ellipse at center, rgba(20, 184, 166, 0.06) 0%, rgba(99, 102, 241, 0.03) 50%, transparent 70%)', 
        pointerEvents: 'none' 
      }} />

      <div style={{ 
        width: '100%', 
        maxWidth: 540, 
        position: 'relative', 
        zIndex: 1, 
        textAlign: 'center',
        transform: 'translateY(90px)'
      }}>

        {/* ── Central Glowing Circular Spinner ── */}
        <div style={{ 
          position: 'relative', 
          width: 220, 
          height: 220, 
          margin: '0 auto 40px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          {/* SVG for circle path with gradient */}
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
            <defs>
              <linearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(99, 102, 241, 0.15)" />
                <stop offset="50%" stopColor="#4f46e5" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#14B8A6" stopOpacity="1" />
              </linearGradient>
            </defs>
            <circle 
              cx="110" 
              cy="110" 
              r="104" 
              fill="none" 
              stroke="url(#spinnerGradient)" 
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>

          {/* Glowing dot revolving around the circle */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
          >
            <div style={{
              position: 'absolute',
              top: -1,
              left: 'calc(50% - 7px)',
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: '#14B8A6',
              boxShadow: '0 0 12px #14B8A6, 0 0 24px rgba(20, 184, 166, 0.8)'
            }} />
          </motion.div>

          {/* Handcrafted high-fidelity vector logo matching reference exactly */}
          <svg viewBox="0 0 100 100" style={{ width: 96, height: 96, zIndex: 2, filter: 'drop-shadow(0 0 20px rgba(0, 242, 254, 0.55))' }}>
            <defs>
              <linearGradient id="logoIconGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="40%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#00f2fe" />
              </linearGradient>
            </defs>
            
            {/* Magnifying Glass Lens */}
            <circle 
              cx="45" 
              cy="45" 
              r="23" 
              stroke="url(#logoIconGrad)" 
              strokeWidth="5" 
              fill="none" 
              strokeLinecap="round" 
            />
            
            {/* Magnifying Glass Handle */}
            <path 
              d="M 61 61 L 78 78" 
              stroke="url(#logoIconGrad)" 
              strokeWidth="6.5" 
              strokeLinecap="round" 
            />
            
            {/* Analytic Bars */}
            {/* Bar 1: Left */}
            <line 
              x1="33" y1="56" x2="33" y2="46" 
              stroke="url(#logoIconGrad)" 
              strokeWidth="4.5" 
              strokeLinecap="round" 
            />
            
            {/* Bar 2: Mid-Left */}
            <line 
              x1="41" y1="56" x2="41" y2="36" 
              stroke="url(#logoIconGrad)" 
              strokeWidth="4.5" 
              strokeLinecap="round" 
            />
            
            {/* Bar 3: Mid-Right with Dot */}
            <line 
              x1="49" y1="56" x2="49" y2="48" 
              stroke="url(#logoIconGrad)" 
              strokeWidth="4.5" 
              strokeLinecap="round" 
            />
            <circle 
              cx="49" cy="38" r="2.5" 
              fill="url(#logoIconGrad)" 
            />
            
            {/* Bar 4: Right */}
            <line 
              x1="57" y1="56" x2="57" y2="30" 
              stroke="url(#logoIconGrad)" 
              strokeWidth="4.5" 
              strokeLinecap="round" 
            />
          </svg>
        </div>

        {/* ── Title & Status ── */}
        <h2 style={{ 
          fontFamily: 'var(--font-heading)', 
          fontWeight: 600, 
          fontSize: 28, 
          color: '#fff', 
          letterSpacing: '-0.02em', 
          marginBottom: 10 
        }}>
          Analyzing <span style={{ 
            background: 'linear-gradient(90deg, #a78bfa, #22d3ee)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent',
            fontWeight: 700 
          }}>{cleanDomain}</span>
        </h2>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', fontWeight: 400, marginBottom: 32 }}>
          This will only take a few moments
        </p>

        {/* ── Steps Pagination-Style Dots Tracker ── */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 54 }}>
          {steps.map((_, idx) => {
            const isCompleted = activeStep > idx;
            const isActive = activeStep === idx;
            return (
              <div 
                key={idx}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: isActive ? '#14B8A6' : isCompleted ? 'rgba(20, 184, 166, 0.4)' : 'rgba(255,255,255,0.12)',
                  boxShadow: isActive ? '0 0 10px #14B8A6, 0 0 4px #14B8A6' : 'none',
                  transform: isActive ? 'scale(1.25)' : 'scale(1)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />
            );
          })}
        </div>

        {/* ── Bottom Step Status & Glow Bar ── */}
        <div style={{ maxWidth: 440, margin: '0 auto' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: 10, 
            marginBottom: 16 
          }}>
            <CheckCircle2 style={{ 
              width: 18, 
              height: 18, 
              color: '#14B8A6', 
              flexShrink: 0,
              filter: 'drop-shadow(0 0 4px rgba(20, 184, 166, 0.4))'
            }} />
            <span style={{ 
              fontSize: 14, 
              color: 'rgba(255,255,255,0.85)', 
              fontWeight: 500,
              letterSpacing: '-0.01em'
            }}>
              {currentStepText}
            </span>
          </div>

          {/* Slim Premium Glowing Progress Bar */}
          <div style={{ 
            height: 3, 
            borderRadius: 999, 
            background: 'rgba(255,255,255,0.06)', 
            overflow: 'visible',
            position: 'relative'
          }}>
            <motion.div
              style={{ 
                height: '100%', 
                borderRadius: 999, 
                background: 'linear-gradient(90deg, #6366f1, #3b82f6, #14b8a6)',
                position: 'relative'
              }}
              initial={{ width: '0%' }}
              animate={{ width: `${percent}%` }}
              transition={{ ease: 'easeOut' }}
            >
              {/* Outer bright glowing dot on the tip of the progress bar */}
              <div style={{
                position: 'absolute',
                right: -4,
                top: -3.5,
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: '#22d3ee',
                boxShadow: '0 0 8px #22d3ee, 0 0 16px #22d3ee'
              }} />
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}
