import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { signInWithGoogle, signInWithOtp, verifyOtp, isConfigured } = useAuth();
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      await signInWithGoogle();
    } catch (err) {
      setError(err.message || 'Failed to initialize Google login');
      setLoading(false);
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!phoneNumber) return;
    
    setLoading(true);
    setError(null);
    try {
      if (!isConfigured) {
        // Fallback for demo mode
        setShowOtp(true);
        return;
      }
      await signInWithOtp(phoneNumber);
      setShowOtp(true);
    } catch (err) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) return;

    setLoading(true);
    setError(null);
    try {
      if (!isConfigured) {
        // Fallback for demo mode
        navigate('/dashboard');
        return;
      }
      await verifyOtp(phoneNumber, otp);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1rem' }}>
      <div className="sovereign-card animate-fade-in" style={{ width: '100%', maxWidth: '440px', padding: '3rem' }}>
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: 'var(--secondary)', marginBottom: '1rem' }}>shield_person</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.02em' }}>Portal Access</h1>
          <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.875rem', marginTop: '0.5rem' }}>Secure login for sovereign administrators</p>
        </header>

        {error && (
          <div className="badge badge-warning" style={{ width: '100%', padding: '1rem', marginBottom: '2rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>error</span>
            <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{error}</span>
          </div>
        )}

        {/* Google Login Button */}
        <button 
          onClick={handleGoogleLogin}
          disabled={loading}
          className="btn-outline-primary" 
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '0.875rem', marginBottom: '1.5rem', background: '#fff' }}
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: '18px', height: '18px' }} />
          <span>Continue with Google</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0', color: 'var(--outline)' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--surface-container-high)' }} />
          <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Or Phone Auth</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--surface-container-high)' }} />
        </div>

        {!showOtp ? (
          <form onSubmit={handleSendOtp}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="input-label" style={{ marginBottom: '0.5rem', display: 'block' }}>Mobile Number</label>
              <input
                type="tel"
                placeholder="+91 00000 00000"
                className="input-field"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                style={{ width: '100%' }}
                required
              />
            </div>
            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
              {loading ? 'Requesting Access...' : 'Deliver Access Token'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="input-label" style={{ marginBottom: '0.5rem', display: 'block' }}>One-Time Code</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  className="input-field"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  style={{ width: '100%', textAlign: 'center', letterSpacing: '0.5em', fontWeight: 900 }}
                  maxLength={6}
                  required
                />
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', marginTop: '0.75rem', textAlign: 'center' }}>
                Sent to {phoneNumber} • <button type="button" onClick={() => setShowOtp(false)} style={{ background: 'none', border: 'none', color: 'var(--secondary)', fontWeight: 700, padding: 0, cursor: 'pointer' }}>Change Number</button>
              </p>
            </div>
            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
              {loading ? 'Verifying Credentials...' : 'Authenticate Identity'}
            </button>
          </form>
        )}

        <footer style={{ marginTop: '3rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.6 }}>By proceeding, you verify your identity to access restricted sovereign criminal records.</p>
          <Link to="/" style={{ display: 'block', marginTop: '1.5rem', fontSize: '0.875rem', fontWeight: 700, color: 'var(--secondary)', textDecoration: 'none' }}>Return to Public Portal</Link>
        </footer>
      </div>
    </div>
  );
}
