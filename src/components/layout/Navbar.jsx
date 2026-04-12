import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/cases', label: 'Cases' },
  { path: '/news', label: 'News' },
  { path: '/dashboard', label: 'Statistics' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="navbar">
        <nav className="navbar-inner">
          {/* Brand */}
          <Link to="/" className="navbar-brand">
            THUNA
          </Link>

          {/* Desktop Nav */}
          <div className="navbar-nav">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`navbar-link ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="navbar-actions">
            {user ? (
              <button className="btn btn-primary" onClick={signOut}>
                Logout
              </button>
            ) : (
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
            )}

            {/* Mobile Toggle */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>
                {mobileOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--surface-container)' }}>
          {user ? (
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => { signOut(); setMobileOpen(false); }}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }} onClick={() => setMobileOpen(false)}>
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
