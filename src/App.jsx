import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Home     from './pages/Home';
import Analysis from './pages/Analysis';
import Report   from './pages/Report';
import Compare  from './pages/Compare';
import About    from './pages/About';

import { runPageSpeedAudit } from './services/pagespeedApi';

function Logo({ size = 48, showText = true, fontSize = '24px', opacity = 1 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', opacity }}>
      {/* Handcrafted high-fidelity vector logo with NO background */}
      <svg viewBox="0 0 100 100" style={{ width: size, height: size, filter: 'drop-shadow(0 0 12px rgba(0, 242, 254, 0.45))' }}>
        <defs>
          <linearGradient id="navLogoIconGrad" x1="0%" y1="100%" x2="100%" y2="0%">
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
          stroke="url(#navLogoIconGrad)" 
          strokeWidth="5" 
          fill="none" 
          strokeLinecap="round" 
        />
        
        {/* Magnifying Glass Handle */}
        <path 
          d="M 61 61 L 78 78" 
          stroke="url(#navLogoIconGrad)" 
          strokeWidth="6.5" 
          strokeLinecap="round" 
        />
        
        {/* Analytic Bars */}
        {/* Bar 1: Left */}
        <line 
          x1="33" y1="56" x2="33" y2="46" 
          stroke="url(#navLogoIconGrad)" 
          strokeWidth="4.5" 
          strokeLinecap="round" 
        />
        
        {/* Bar 2: Mid-Left */}
        <line 
          x1="41" y1="56" x2="41" y2="36" 
          stroke="url(#navLogoIconGrad)" 
          strokeWidth="4.5" 
          strokeLinecap="round" 
        />
        
        {/* Bar 3: Mid-Right with Dot */}
        <line 
          x1="49" y1="56" x2="49" y2="48" 
          stroke="url(#navLogoIconGrad)" 
          strokeWidth="4.5" 
          strokeLinecap="round" 
        />
        <circle 
          cx="49" cy="38" r="2.5" 
          fill="url(#navLogoIconGrad)" 
        />
        
        {/* Bar 4: Right */}
        <line 
          x1="57" y1="56" x2="57" y2="30" 
          stroke="url(#navLogoIconGrad)" 
          strokeWidth="4.5" 
          strokeLinecap="round" 
        />
      </svg>
      
      {showText && (
        <span style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          fontSize: fontSize,
          letterSpacing: '-0.02em',
          display: 'inline-flex',
          alignItems: 'center'
        }}>
          <span style={{
            background: 'linear-gradient(to right, #ffffff 40%, rgba(255,255,255,0.85) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Web
          </span>
          <span style={{
            background: 'linear-gradient(to right, #0d9488 0%, #06b6d4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 8px rgba(13, 148, 136, 0.35))'
          }}>
            Lens
          </span>
        </span>
      )}
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage]   = useState('home');
  const [activeUrl, setActiveUrl]       = useState('');
  const [apiKey, setApiKey]             = useState(import.meta.env.VITE_PAGESPEED_API_KEY || '');
  const [mode, setMode]                 = useState('live');
  const [auditResult, setAuditResult]   = useState(null);
  const [comparePrefill, setComparePrefill] = useState('');
  const [activeSection, setActiveSection] = useState('home');
  const [isBooting, setIsBooting]       = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsBooting(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (currentPage !== 'home') return;
    const handleScroll = () => {
      const scrollPos = window.scrollY + 280;
      const featuresEl = document.getElementById('features');
      
      if (featuresEl && scrollPos >= featuresEl.offsetTop) {
        setActiveSection('features');
      } else {
        setActiveSection('home');
      }
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);


  const handleStartAnalysis = async (url) => {
    setActiveUrl(url);
    setCurrentPage('analysis');
    try {
      const result = await runPageSpeedAudit(url, apiKey, mode);
      setAuditResult(result);
      setCurrentPage('report');
    } catch (err) {
      console.error('Audit failed:', err);
      setCurrentPage('home');
    }
  };

  const handleNavigateCompare = (prefilledUrl = '') => {
    setComparePrefill(prefilledUrl);
    setCurrentPage('compare');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleNavClick = (key) => {
    if (key === 'compare') {
      handleNavigateCompare();
    } else if (key === 'methodology') {
      handleNavigate('about');
    } else if (key === 'home') {
      setCurrentPage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Features, How it Works, Pricing
      setCurrentPage('home');
      setTimeout(() => {
        const element = document.getElementById(key);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const navLinks = [
    { key: 'features',    label: 'Features',    onClick: () => handleNavClick('features') },
    { key: 'compare',     label: 'Compare',     onClick: () => handleNavClick('compare') },
    { key: 'methodology', label: 'Methodology', onClick: () => handleNavClick('methodology') },
  ];

  const isLinkActive = (key) => {
    if (key === 'compare') return currentPage === 'compare';
    if (key === 'methodology') return currentPage === 'about';
    if (currentPage === 'home') {
      return activeSection === key;
    }
    return false;
  };

  const [showSignIn, setShowSignIn] = useState(false);

  if (isBooting) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: '#030303',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        overflow: 'hidden'
      }}>
        {/* Cinematic Background Mesh */}
        <div style={{ position: 'absolute', top: '10%', left: '10%', width: '80vw', height: '80vw', background: 'radial-gradient(circle at center, rgba(124,58,237,0.12) 0%, transparent 60%)', filter: 'blur(100px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle at center, rgba(20,184,166,0.1) 0%, transparent 60%)', filter: 'blur(120px)', pointerEvents: 'none' }} />

        {/* Shift content group slightly below center */}
        <div style={{ transform: 'translateY(40px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Outer Orbit Spinner Ring */}
          <div style={{ position: 'relative', width: 220, height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            
            {/* Pulsing Outer Neon Circle */}
            <motion.div 
              animate={{ 
                scale: [1, 1.03, 1],
                opacity: [0.15, 0.25, 0.15]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '2px solid rgba(99, 102, 241, 0.2)',
                boxShadow: '0 0 20px rgba(99, 102, 241, 0.1), inset 0 0 20px rgba(99, 102, 241, 0.1)'
              }}
            />

            {/* Rotating Bead Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
              }}
            >
              {/* The glowing orbiting bead */}
              <div style={{
                position: 'absolute',
                top: -6,
                left: 'calc(50% - 6px)',
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: '#00F2FE',
                boxShadow: '0 0 12px #00F2FE, 0 0 24px rgba(0, 242, 254, 0.8)'
              }} />
            </motion.div>

            {/* Handcrafted high-fidelity vector logo matching reference exactly */}
            <svg viewBox="0 0 100 100" style={{ width: 96, height: 96, zIndex: 2, filter: 'drop-shadow(0 0 20px rgba(0, 242, 254, 0.55))' }}>
              <defs>
                <linearGradient id="bootLogoIconGrad" x1="0%" y1="100%" x2="100%" y2="0%">
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
                stroke="url(#bootLogoIconGrad)" 
                strokeWidth="5" 
                fill="none" 
                strokeLinecap="round" 
              />
              
              {/* Magnifying Glass Handle */}
              <path 
                d="M 61 61 L 78 78" 
                stroke="url(#bootLogoIconGrad)" 
                strokeWidth="6.5" 
                strokeLinecap="round" 
              />
              
              {/* Analytic Bars */}
              {/* Bar 1: Left */}
              <line 
                x1="33" y1="56" x2="33" y2="46" 
                stroke="url(#bootLogoIconGrad)" 
                strokeWidth="4.5" 
                strokeLinecap="round" 
              />
              
              {/* Bar 2: Mid-Left */}
              <line 
                x1="41" y1="56" x2="41" y2="36" 
                stroke="url(#bootLogoIconGrad)" 
                strokeWidth="4.5" 
                strokeLinecap="round" 
              />
              
              {/* Bar 3: Mid-Right with Dot */}
              <line 
                x1="49" y1="56" x2="49" y2="48" 
                stroke="url(#bootLogoIconGrad)" 
                strokeWidth="4.5" 
                strokeLinecap="round" 
              />
              <circle 
                cx="49" cy="38" r="2.5" 
                fill="url(#bootLogoIconGrad)" 
              />
              
              {/* Bar 4: Right */}
              <line 
                x1="57" y1="56" x2="57" y2="30" 
                stroke="url(#bootLogoIconGrad)" 
                strokeWidth="4.5" 
                strokeLinecap="round" 
              />
            </svg>
          </div>

          {/* Text Logo below the spinner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ marginTop: 36, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <Logo size={42} fontSize="32px" />
            <p style={{
              fontSize: 13,
              color: 'rgba(255, 255, 255, 0.35)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 500,
              marginTop: 16,
              fontFamily: 'var(--font-sans)'
            }}>
              Performance & SEO Intelligence
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-bg-base)', color: '#e2e8f0', fontFamily: 'var(--font-sans)' }}>

      {/* ── Premium Floating Pill-Style Navigation ── */}
      {currentPage !== 'analysis' && (
        <header className="no-print" style={{
        position: 'fixed',
        top: '18px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 40px)',
        maxWidth: '1400px',
        height: '62px',
        background: 'rgba(10, 10, 12, 0.45)',
        backdropFilter: 'blur(20px) saturate(140%)',
        WebkitBackdropFilter: 'blur(20px) saturate(140%)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.06)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        transition: 'all 0.3s ease'
      }}>

        {/* LEFT SECTION: Official Brand Logo Wordmark */}
        <button 
          onClick={() => handleNavClick('home')} 
          className="nav-brand-button"
          style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <Logo size={32} fontSize="18px" />
        </button>

        {/* CENTER SECTION: Single Floating Pill Navigation Container */}
        <nav style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '9999px',
          padding: '3px 4px',
          zIndex: 5,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.02)'
        }}>
          {navLinks.map(link => {
            const active = isLinkActive(link.key);
            return (
              <button
                key={link.key}
                onClick={link.onClick}
                className={`nav-pill-button ${active ? 'active' : ''}`}
              >
                {active && (
                  <motion.div
                    layoutId="navActivePill"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '9999px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                      zIndex: -1
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </button>
            );
          })}

        </nav>

        {/* RIGHT SECTION: Primary CTA button (Start Audit →) */}
        <div style={{ display: 'flex', alignItems: 'center', zIndex: 10 }}>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              handleNavClick('home');
              setTimeout(() => {
                const inp = document.querySelector('input[placeholder="https://yourwebsite.com"]');
                if (inp) inp.focus();
              }, 150);
            }}
            style={{
              padding: '8px 18px',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #2563EB, #14B8A6)',
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 15px rgba(20, 184, 166, 0.25)',
              transition: 'box-shadow 0.2s ease'
            }}
          >
            Start Audit <ChevronRight style={{ width: 14, height: 14 }} />
          </motion.button>
        </div>

        </header>
      )}

      {/* ── Interactive Sign-In Modal Overlay ── */}
      <AnimatePresence>
        {showSignIn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24
            }}
            onClick={() => setShowSignIn(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              style={{
                width: '100%',
                maxWidth: '400px',
                background: 'rgba(10, 10, 12, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '24px',
                padding: '36px 32px',
                boxShadow: '0 40px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Subtle mesh light indicators inside modal */}
              <div style={{ position: 'absolute', top: '-20%', left: '-20%', width: '140%', height: '140%', background: 'radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 60%)', pointerEvents: 'none' }} />
              
              <div style={{ textAlign: 'center', marginBottom: 28, position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                  <Logo size={36} fontSize="20px" />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 6 }}>Welcome back</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>Enter your credentials to access your dashboard</p>
              </div>

              <form onSubmit={e => { e.preventDefault(); setShowSignIn(false); }} style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    style={{
                      width: '100%',
                      background: 'rgba(0,0,0,0.25)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 10,
                      padding: '10px 14px',
                      fontSize: 13,
                      color: '#fff',
                      outline: 'none',
                      fontFamily: 'var(--font-sans)',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(20,184,166,0.4)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.06)'}
                  />
                </div>

                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <label style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Password</label>
                    <a href="#forgot" onClick={e => e.preventDefault()} style={{ fontSize: 11, color: '#14B8A6', textDecoration: 'none' }}>Forgot?</a>
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    style={{
                      width: '100%',
                      background: 'rgba(0,0,0,0.25)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 10,
                      padding: '10px 14px',
                      fontSize: 13,
                      color: '#fff',
                      outline: 'none',
                      fontFamily: 'var(--font-sans)',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(20,184,166,0.4)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.06)'}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '11px',
                    borderRadius: 10,
                    background: 'linear-gradient(135deg, #2563EB, #14B8A6)',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: 13,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(20,184,166,0.15)',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.transform = 'translateY(-0.5px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(20,184,166,0.3)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(20,184,166,0.15)';
                  }}
                >
                  Continue with Email →
                </button>
              </form>

              <div style={{ position: 'relative', zIndex: 1, margin: '20px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>or</span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
              </div>

              <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 10 }}>
                <button
                  onClick={() => setShowSignIn(false)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: 8,
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: 11.5,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6
                  }}
                  onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                  onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
                >
                  <span>G</span> Google
                </button>
                <button
                  onClick={() => setShowSignIn(false)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: 8,
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: 11.5,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6
                  }}
                  onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                  onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
                >
                  <span>⌘</span> GitHub
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Page Content ── */}
      <main className="flex-grow" style={{ paddingTop: currentPage === 'analysis' ? '0px' : '80px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          >
            {currentPage === 'home'     && <Home onStartAnalysis={handleStartAnalysis} onNavigate={handleNavigate} apiKey={apiKey} setApiKey={setApiKey} mode={mode} setMode={setMode} />}
            {currentPage === 'analysis' && <Analysis url={activeUrl} mode={mode} />}
            {currentPage === 'report'   && auditResult && <Report data={auditResult} onBack={() => handleNavigate('home')} onReRun={() => handleStartAnalysis(activeUrl)} onNavigateCompare={handleNavigateCompare} />}
            {currentPage === 'compare'  && <Compare prefilledUrl={comparePrefill} apiKey={apiKey} mode={mode} onBack={() => handleNavigate(auditResult ? 'report' : 'home')} />}
            {currentPage === 'about'    && <About onBack={() => handleNavigate(auditResult ? 'report' : 'home')} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── Footer (All pages except active analysis) ── */}
      {currentPage !== 'analysis' && (
        <footer className="no-print" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '32px 24px', background: 'rgba(0,0,0,0.2)' }}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Left Block: Logo & Developer Credit Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Logo size={36} fontSize="20px" opacity={0.65} />
              
              {/* ── Creative & Cool Developer Credit Badge ── */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                padding: '6px 14px',
                borderRadius: '9999px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.03)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'default',
                height: '32px'
              }}
              onMouseOver={e => {
                e.currentTarget.style.borderColor = 'rgba(20, 184, 166, 0.35)';
                e.currentTarget.style.boxShadow = '0 0 16px rgba(20, 184, 166, 0.15), inset 0 1px 0 rgba(255,255,255,0.05)';
                e.currentTarget.style.transform = 'translateY(-1.5px)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.03)';
                e.currentTarget.style.transform = 'none';
              }}
              >
                <span style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#14B8A6',
                  boxShadow: '0 0 8px #14B8A6, 0 0 2px #14B8A6'
                }} />
                <span style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600 }}>
                  Developed by
                </span>
                <span style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  background: 'linear-gradient(90deg, #14B8A6 0%, #3b82f6 50%, #6366f1 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '0.02em',
                  filter: 'drop-shadow(0 0 6px rgba(20, 184, 166, 0.2))'
                }}>
                  Deepak Dube
                </span>
              </div>
            </div>

            {/* Center Block: Copyright Notice */}
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', margin: 0, textAlign: 'center' }}>
              © {new Date().getFullYear()} WebLens · Performance & SEO Intelligence Platform
            </p>

            {/* Right Block: Navigation Links */}
            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
              {[['Methodology', 'about'], ['Compare', 'compare']].map(([label, page]) => (
                <button 
                  key={page} 
                  onClick={() => handleNavigate(page)} 
                  className="footer-nav-button"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
