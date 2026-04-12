import { Link } from 'react-router-dom';

const footerLinks = [
  { label: 'Contact Details', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Accessibility', href: '#' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem' }}>
          {/* Brand & Description */}
          <div style={{ maxWidth: '380px' }}>
            <div className="footer-brand" style={{ marginBottom: '1rem' }}>THUNA</div>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6 }}>
              The Unified National Archive for transparent governance. Empowering the sovereign citizen through immediate access to criminal records and judicial proceedings.
            </p>
          </div>

          {/* Navigation & Support */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            <div>
              <h5 style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '1.5rem' }}>
                Navigation
              </h5>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li><Link to="/" className="footer-link">Portal Home</Link></li>
                <li><Link to="/dashboard" className="footer-link" style={{ color: '#6b5c42', fontWeight: 700 }}>Statistics</Link></li>
                <li><Link to="/news" className="footer-link">Crime News</Link></li>
              </ul>
            </div>
            <div>
              <h5 style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '1.5rem' }}>
                Support
              </h5>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {footerLinks.slice(0, 3).map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="footer-link">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span className="footer-copy">
            © 2024 Government of Kerala. All rights reserved. Sovereign Archive Portal.
          </span>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span className="material-symbols-outlined" style={{ color: '#64748b', cursor: 'pointer' }}>language</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
