import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { signInWithGoogle, signInWithOtp, verifyOtp, isConfigured } = useAuth();
  const [showOtp, setShowOtp] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogle = async () => {
    try {
      setError('');
      setLoading(true);
      if (!isConfigured) {
        // Demo mode
        navigate('/');
        return;
      }
      await signInWithGoogle();
    } catch (err) {
      setError(err.message || 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    try {
      setError('');
      setLoading(true);
      if (!isConfigured) {
        setShowOtp(true);
        setLoading(false);
        return;
      }
      await signInWithOtp(phone);
      setShowOtp(true);
    } catch (err) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setError('');
      setLoading(true);
      if (!isConfigured) {
        navigate('/');
        return;
      }
      await verifyOtp(phone, otp);
      navigate('/');
    } catch (err) {
      setError(err.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--surface)' }}>
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative architectural elements */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: '33%', height: '100%', background: 'var(--surface-container-low)', transform: 'skewX(-12deg) translateX(6rem)', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '16rem', height: '16rem', borderLeft: '4px solid var(--secondary)', borderBottom: '4px solid var(--secondary)', opacity: 0.1, zIndex: 0, transform: 'translate(3rem, -3rem)' }} />

        {/* Subtle texture overlay */}
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', opacity: 0.02, mixBlendMode: 'multiply', zIndex: 0, background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,21,45,0.03) 2px, rgba(0,21,45,0.03) 4px)' }} />

        <div style={{ width: '100%', maxWidth: '440px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          {/* Brand Anchor */}
          <div className="animate-fade-in-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h1 style={{ color: 'var(--primary)', fontWeight: 900, letterSpacing: '-0.05em', fontSize: '3rem', marginBottom: '0.75rem' }}>THUNA</h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
              <div style={{ height: '2px', width: '2rem', background: 'var(--secondary)' }} />
              <span style={{ fontSize: '0.75rem', letterSpacing: '0.2em', fontWeight: 700, textTransform: 'uppercase', color: 'var(--secondary)' }}>Crime Transparency Portal</span>
              <div style={{ height: '2px', width: '2rem', background: 'var(--secondary)' }} />
            </div>
          </div>

          {/* Login Container */}
          <div className="animate-fade-in-up stagger-2" style={{ width: '100%', background: 'var(--surface-container-lowest)', padding: '2.5rem', boxShadow: '0 20px 40px rgba(0,21,45,0.06)', borderTop: '6px solid var(--primary)' }}>
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem' }}>Access Archive</h2>
              <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                Login to the sovereign archive to view case details, statistics, and public safety updates.
              </p>
            </div>

            {error && (
              <div style={{ padding: '0.75rem 1rem', background: 'var(--error-bg)', color: 'var(--error)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '1.5rem', borderRadius: '0.25rem' }}>
                {error}
              </div>
            )}

            {!isConfigured && (
              <div style={{ padding: '0.75rem 1rem', background: '#fff3e0', color: '#e65100', fontSize: '0.75rem', fontWeight: 500, marginBottom: '1.5rem', borderRadius: '0.25rem' }}>
                Demo Mode — Supabase not configured. Auth actions will simulate login.
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Google Login */}
              <button
                onClick={handleGoogle}
                disabled={loading}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem',
                  padding: '1rem 1.5rem', background: '#fff', border: '1px solid var(--outline-variant)',
                  cursor: 'pointer', transition: 'all 0.3s', fontFamily: 'inherit'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface-container-low)'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--primary)' }}>
                  Continue with Google
                </span>
              </button>

              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 0' }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--outline-variant)' }} />
                <span style={{ padding: '0 1rem', fontSize: '0.625rem', color: 'var(--outline)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>OR</span>
                <div style={{ flex: 1, height: '1px', background: 'var(--outline-variant)' }} />
              </div>

              {/* Mobile Login */}
              {!showOtp ? (
                <>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="tel"
                      placeholder="+91 Enter mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="input-field"
                      style={{ flex: 1 }}
                    />
                  </div>
                  <button
                    onClick={handleSendOtp}
                    disabled={loading || !phone}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem',
                      padding: '1rem 1.5rem', background: 'var(--primary-container)', color: '#fff',
                      cursor: phone ? 'pointer' : 'not-allowed', transition: 'all 0.3s',
                      boxShadow: '0 4px 12px rgba(0,21,45,0.15)', border: 'none', fontFamily: 'inherit',
                      opacity: phone ? 1 : 0.6
                    }}
                    onMouseEnter={(e) => { if (phone) e.currentTarget.style.background = 'var(--primary)'; }}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'var(--primary-container)'}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>smartphone</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                      {loading ? 'Sending...' : 'Login with Mobile Number'}
                    </span>
                  </button>
                </>
              ) : (
                <>
                  <p style={{ fontSize: '0.875rem', color: 'var(--on-surface-variant)' }}>
                    Enter the 6-digit OTP sent to <strong>{phone}</strong>
                  </p>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="input-field"
                    maxLength={6}
                    style={{ textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.5rem', fontWeight: 700 }}
                  />
                  <button
                    onClick={handleVerifyOtp}
                    disabled={loading || otp.length < 4}
                    style={{
                      width: '100%', padding: '1rem', background: 'var(--primary-container)', color: '#fff',
                      cursor: 'pointer', border: 'none', fontFamily: 'inherit', fontSize: '0.75rem',
                      fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase'
                    }}
                  >
                    {loading ? 'Verifying...' : 'Verify OTP'}
                  </button>
                  <button onClick={() => { setShowOtp(false); setOtp(''); }} style={{ background: 'none', border: 'none', color: 'var(--secondary)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    ← Change Number
                  </button>
                </>
              )}
            </div>

            {/* Terms */}
            <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(196,198,207,0.3)', textAlign: 'center' }}>
              <p style={{ fontSize: '0.6875rem', color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>
                By logging in, you agree to the{' '}
                <a href="#" style={{ color: 'var(--secondary)', fontWeight: 700, textDecoration: 'none' }}>Terms of Service</a> and the{' '}
                <a href="#" style={{ color: 'var(--secondary)', fontWeight: 700, textDecoration: 'none' }}>Sovereign Data Privacy Policy</a>.
              </p>
            </div>
          </div>

          {/* Footer-lite Navigation */}
          <div className="animate-fade-in-up stagger-3" style={{ marginTop: '3rem', display: 'flex', gap: '2rem' }}>
            {['Privacy', 'Help Desk', 'Kerala Gov'].map(label => (
              <a key={label} href="#" style={{ fontSize: '0.625rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, textDecoration: 'none', transition: 'color 0.3s' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--primary)'}
                onMouseLeave={(e) => e.target.style.color = '#64748b'}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer style={{ width: '100%', padding: '3rem 2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', borderTop: 'none' }}>
        <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '-0.03em' }}>THUNA</span>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.05rem', textTransform: 'uppercase', color: '#94a3b8', textAlign: 'center', maxWidth: '30rem' }}>
          © 2024 Government of Kerala. All rights reserved. Sovereign Archive Portal.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="#" style={{ fontSize: '0.75rem', letterSpacing: '0.05rem', textTransform: 'uppercase', color: '#94a3b8', textDecoration: 'none' }}>Contact Details</a>
          <a href="#" style={{ fontSize: '0.75rem', letterSpacing: '0.05rem', textTransform: 'uppercase', color: '#94a3b8', textDecoration: 'none' }}>Accessibility</a>
        </div>
      </footer>
    </div>
  );
}
