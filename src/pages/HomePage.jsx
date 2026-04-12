import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getEnrichedCases, demoStations } from '../lib/demoData';

export default function HomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [stationFilter, setStationFilter] = useState('');
  const [crimeFilter, setCrimeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const enrichedCases = getEnrichedCases();
  const totalCases = enrichedCases.length;
  const activeCases = enrichedCases.filter(c => !['case_closed'].includes(c.case_status)).length;
  const todayCases = 3; // Simulated

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (stationFilter) params.set('station', stationFilter);
    if (crimeFilter) params.set('crime', crimeFilter);
    if (statusFilter) params.set('status', statusFilter);
    navigate(`/cases?${params.toString()}`);
  };

  return (
    <div className="page-wrapper">
      {/* ─── Hero Section ─── */}
      <section className="container" style={{ paddingTop: '3rem', paddingBottom: '2rem' }}>
        <div className="hero-gradient animate-fade-in" style={{ borderRadius: '0.75rem', padding: '3rem 2rem', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          {/* Decorative bg element */}
          <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', opacity: 0.06, pointerEvents: 'none', background: 'radial-gradient(circle at 70% 50%, rgba(174,200,240,0.4) 0%, transparent 70%)' }} />

          <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '720px' }}>
            <span className="label-md animate-fade-in-up stagger-1" style={{ color: '#d8c4a4', marginBottom: '1rem', display: 'block', letterSpacing: '0.2em' }}>
              Sovereign Archive Portal
            </span>
            <h1 className="animate-fade-in-up stagger-2" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '2rem' }}>
              Transparent Public Records
            </h1>

            {/* Search Card */}
            <form onSubmit={handleSearch} className="animate-fade-in-up stagger-3" style={{ background: '#ffffff', padding: '0.5rem', borderRadius: '0.75rem', boxShadow: '0 20px 60px rgba(0,21,45,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 1rem', borderBottom: '1px solid var(--surface-container)' }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--outline)', marginRight: '0.75rem' }}>search</span>
                <input
                  type="text"
                  placeholder="Search FIR or Case"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1.125rem', padding: '1rem 0', background: 'transparent', color: 'var(--on-surface)' }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.5rem', padding: '0.5rem' }}>
                <select className="select-field" value={stationFilter} onChange={(e) => setStationFilter(e.target.value)} style={{ height: '2.75rem', fontSize: '0.875rem' }}>
                  <option value="">Police Station</option>
                  {demoStations.map(s => (
                    <option key={s.station_id} value={s.station_id}>{s.station_name.replace(' Police Station', '')}</option>
                  ))}
                </select>
                <select className="select-field" value={crimeFilter} onChange={(e) => setCrimeFilter(e.target.value)} style={{ height: '2.75rem', fontSize: '0.875rem' }}>
                  <option value="">Crime Type</option>
                  <option value="theft">Theft</option>
                  <option value="robbery">Robbery</option>
                  <option value="assault">Assault</option>
                  <option value="cybercrime">Cyber Crime</option>
                  <option value="fraud">Fraud</option>
                  <option value="burglary">Burglary</option>
                </select>
                <select className="select-field" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ height: '2.75rem', fontSize: '0.875rem' }}>
                  <option value="">Status</option>
                  <option value="investigation_started">Under Investigation</option>
                  <option value="chargesheet_filed">Charge Sheeted</option>
                  <option value="case_closed">Case Closed</option>
                </select>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ─── Portal Overview ─── */}
      <section className="container animate-fade-in-up" style={{ paddingBottom: '4rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '-0.02em' }}>Portal Overview</h2>
            <p style={{ color: '#64748b', fontWeight: 500 }}>Real-time status of the sovereign archive.</p>
          </div>
          <div style={{ height: '4px', width: '6rem', background: 'var(--secondary)', marginTop: '1rem' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {/* Total Cases */}
          <div className="sovereign-card-bordered animate-fade-in-up stagger-1" style={{ padding: '2rem', borderRadius: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <span className="material-symbols-outlined" style={{ background: 'var(--secondary-container)', color: 'var(--secondary)', padding: '0.75rem', borderRadius: '0.5rem', fontSize: '1.5rem' }}>account_balance</span>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94a3b8' }}>Total Archive</span>
            </div>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '0.5rem' }}>{totalCases}</div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--primary)' }}>Total Cases</div>
            <div className="progress-bar" style={{ marginTop: '1rem' }}>
              <div className="progress-bar-fill" style={{ width: '100%' }} />
            </div>
          </div>

          {/* Today */}
          <div className="sovereign-card-bordered animate-fade-in-up stagger-2" style={{ padding: '2rem', borderRadius: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <span className="material-symbols-outlined" style={{ background: 'var(--secondary-container)', color: 'var(--secondary)', padding: '0.75rem', borderRadius: '0.5rem', fontSize: '1.5rem' }}>update</span>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94a3b8' }}>Past 24 Hours</span>
            </div>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '0.5rem' }}>{todayCases}</div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--primary)' }}>Cases Today</div>
            <div className="progress-bar" style={{ marginTop: '1rem' }}>
              <div className="progress-bar-fill" style={{ width: `${(todayCases / totalCases) * 100}%` }} />
            </div>
          </div>

          {/* Active */}
          <div className="sovereign-card-bordered animate-fade-in-up stagger-3" style={{ padding: '2rem', borderRadius: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <span className="material-symbols-outlined" style={{ background: 'var(--secondary-container)', color: 'var(--secondary)', padding: '0.75rem', borderRadius: '0.5rem', fontSize: '1.5rem' }}>pending_actions</span>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94a3b8' }}>Current Workload</span>
            </div>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '0.5rem' }}>{activeCases}</div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--primary)' }}>Active Cases</div>
            <div className="progress-bar" style={{ marginTop: '1rem' }}>
              <div className="progress-bar-fill" style={{ width: `${(activeCases / totalCases) * 100}%` }} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Institutional Integrity Section ─── */}
      <section className="container animate-fade-in-up" style={{ paddingBottom: '4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          {/* Text */}
          <div>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 900, color: 'var(--primary)', letterSpacing: '-0.03em', marginBottom: '1.5rem', lineHeight: 1.15 }}>
              Institutional Integrity Through Digital Oversight.
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--on-surface-variant)', marginBottom: '2rem', lineHeight: 1.7 }}>
              Thuna is the definitive record for Kerala Police case filings. Our platform ensures that every FIR is tracked, every update is logged, and the public remains informed with absolute transparency.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ width: '4px', height: '4rem', background: 'var(--secondary)', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: '0.25rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.75rem' }}>Verified Accuracy</h4>
                  <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Every record is digitally signed and anchored in the state archive system for non-repudiation.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ width: '4px', height: '4rem', background: 'var(--secondary)', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: '0.25rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.75rem' }}>Open Statistics</h4>
                  <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Publicly accessible analytics for district-wise crime trends and police efficiency metrics.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div style={{ borderRadius: '0.75rem', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,21,45,0.15)', position: 'relative' }}>
            <img
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop"
              alt="Monumental courthouse architecture representing institutional justice"
              style={{ width: '100%', height: '500px', objectFit: 'cover', transition: 'transform 0.7s ease' }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,21,45,0.15)' }} />
          </div>
        </div>
      </section>
    </div>
  );
}
