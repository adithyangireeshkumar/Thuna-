import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCaseById, isSupabaseConfigured } from '../lib/supabase';
import { getEnrichedCases, demoFollowups, demoNews } from '../lib/demoData';

const STATUS_MAP = {
  complaint_registered: { label: 'Complaint Filed', bg: 'rgba(245,124,0,0.1)', border: 'rgba(245,124,0,0.2)', color: '#F57C00' },
  investigation_started: { label: 'Under Investigation', bg: 'rgba(245,124,0,0.1)', border: 'rgba(245,124,0,0.2)', color: '#F57C00' },
  evidence_collected: { label: 'Evidence Collected', bg: 'rgba(21,101,192,0.1)', border: 'rgba(21,101,192,0.2)', color: '#1565C0' },
  arrest_made: { label: 'Arrest Made', bg: 'rgba(21,101,192,0.1)', border: 'rgba(21,101,192,0.2)', color: '#1565C0' },
  chargesheet_filed: { label: 'Charge Sheeted', bg: 'rgba(46,125,50,0.1)', border: 'rgba(46,125,50,0.2)', color: '#2E7D32' },
  case_closed: { label: 'Case Closed', bg: 'rgba(46,125,50,0.1)', border: 'rgba(46,125,50,0.2)', color: '#2E7D32' },
};

const STATUS_ORDER = ['complaint_registered', 'investigation_started', 'evidence_collected', 'arrest_made', 'chargesheet_filed', 'case_closed'];

export default function CaseDetailPage() {
  const { caseId } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [followups, setFollowups] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCase() {
      setLoading(true);
      if (isSupabaseConfigured()) {
        const { data, error } = await fetchCaseById(caseId);
        if (data && !error) {
          setCaseData({
            ...data,
            station: data.fir?.police_stations || data.officers?.police_stations || {},
            officer: data.officers || {}
          });
          setFollowups(data.case_followups || []);
          setNews(data.news_articles || []);
        } else {
          loadDemo();
        }
      } else {
        loadDemo();
      }
      setLoading(false);
    }

    function loadDemo() {
      const all = getEnrichedCases();
      const match = all.find(c => c.case_id === caseId);
      if (match) {
        setCaseData(match);
        setFollowups(demoFollowups.filter(f => f.case_id === caseId).sort((a, b) => new Date(a.followup_date) - new Date(b.followup_date)));
        setNews(demoNews.filter(n => n.case_id === caseId));
      }
    }

    loadCase();
  }, [caseId]);

  if (loading) {
    return (
      <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div className="animate-pulse" style={{ color: 'var(--secondary)', fontWeight: 700 }}>Decrypting Sovereign Records...</div>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="page-wrapper">
        <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '4rem', color: 'var(--outline)' }}>search_off</span>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)', marginTop: '1rem' }}>Record Not Found</h2>
          <p style={{ color: 'var(--on-surface-variant)', marginTop: '0.5rem' }}>The requested case record could not be located in the archive.</p>
          <Link to="/cases" className="btn btn-primary" style={{ marginTop: '2rem' }}>Return to Archive</Link>
        </div>
      </div>
    );
  }

  const status = STATUS_MAP[caseData.case_status] || STATUS_MAP.complaint_registered;
  const currentStatusIdx = STATUS_ORDER.indexOf(caseData.case_status);

  const formatDate = (d) => {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const formatCrime = (t) => t ? t.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : '—';

  // Generate timeline from followups or status order
  const timelineItems = followups.length > 0 ? followups.map((f, i) => ({
    date: formatDate(f.followup_date),
    title: f.status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    desc: f.remarks,
    pending: false,
  })) : STATUS_ORDER.slice(0, currentStatusIdx + 1).map((s, i) => ({
    date: i === 0 ? formatDate(caseData.fir?.fir_date) : '—',
    title: s.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    desc: '',
    pending: false,
  }));

  // Add next pending step
  if (currentStatusIdx < STATUS_ORDER.length - 1) {
    timelineItems.push({
      date: 'Next Phase',
      title: STATUS_ORDER[currentStatusIdx + 1].replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      desc: 'Anticipated within the next 15 business days.',
      pending: true,
    });
  }

  return (
    <div className="page-wrapper">
      <main className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {/* Header & Status */}
        <div className="animate-fade-in-up" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', marginBottom: '3rem' }}>
          <div>
            <span className="label-md" style={{ marginBottom: '0.5rem', display: 'block' }}>
              Official Record Case #{caseData.fir?.fir_number}
            </span>
            <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--primary)', lineHeight: 1.1 }}>
              {formatCrime(caseData.fir?.crime_type)} — {caseData.station?.station_name?.replace(' Police Station', '')}
            </h1>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
            <div style={{ padding: '0.75rem 1.5rem', background: status.bg, border: `1px solid ${status.border}`, color: status.color, fontWeight: 900, fontSize: '0.875rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              {status.label}
            </div>
            <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>download</span>
              Download FIR as PDF
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '3rem', alignItems: 'start' }}>
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {/* FIR Info Card */}
            <section className="sovereign-card animate-fade-in-up stagger-1" style={{ padding: '2.5rem' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: '8rem', height: '8rem', background: 'rgba(107,92,66,0.05)', transform: 'rotate(-45deg) translate(4rem, -4rem)' }} />
              <div className="section-header">
                <span className="accent-bar" />
                <h2>FIR Information</h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem 3rem' }}>
                <div>
                  <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '0.25rem', fontWeight: 700 }}>FIR Number</p>
                  <p style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--primary)' }}>{caseData.fir?.fir_number}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '0.25rem', fontWeight: 700 }}>Registration Date</p>
                  <p style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--primary)' }}>{formatDate(caseData.fir?.fir_date)}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '0.25rem', fontWeight: 700 }}>IPC Section(s)</p>
                  <p style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--primary)' }}>{caseData.fir?.ipc_section}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '0.25rem', fontWeight: 700 }}>Police Station</p>
                  <p style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--primary)' }}>{caseData.station?.station_name}</p>
                </div>
              </div>

              <div style={{ marginTop: '3rem', paddingTop: '3rem', borderTop: '1px solid #f1f5f9' }}>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '1rem', fontWeight: 700 }}>Location of Occurrence</p>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '2rem' }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--secondary)' }}>location_on</span>
                  <p style={{ color: 'var(--primary)', fontWeight: 500 }}>{caseData.fir?.location}</p>
                </div>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '1rem', fontWeight: 700 }}>Brief Description</p>
                <p style={{ color: 'var(--on-surface)', lineHeight: 1.7, fontWeight: 300, fontSize: '1.125rem' }}>
                  {caseData.fir?.description}
                </p>
              </div>
            </section>

            {/* Media Archive */}
            {news.length > 0 && (
              <section className="animate-fade-in-up stagger-2">
                <div className="section-header">
                  <span className="accent-bar" />
                  <h2>Media Archive</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  {news.slice(0, 2).map((article) => (
                    <div key={article.article_id} style={{ background: 'var(--surface-container-low)', padding: '1.5rem', transition: 'all 0.3s', cursor: 'pointer' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,21,45,0.08)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--surface-container-low)'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <p style={{ fontSize: '0.6rem', letterSpacing: '0.1rem', textTransform: 'uppercase', color: 'var(--secondary)', fontWeight: 700, marginBottom: '0.75rem' }}>
                        {article.source} — {new Date(article.publication_date).toLocaleDateString('en-IN', { month: 'short', day: '2-digit' })}
                      </p>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--primary)', lineHeight: 1.3, marginBottom: '1rem' }}>
                        {article.title?.substring(0, 80)}...
                      </h3>
                      <a href={article.article_url} target="_blank" rel="noreferrer" style={{ fontSize: '0.875rem', fontWeight: 700, borderBottom: '2px solid rgba(107,92,66,0.3)', paddingBottom: '2px', color: 'var(--on-surface)', textDecoration: 'none' }}>
                        READ FULL ARTICLE
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column (Sidebar) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {/* Officer Info */}
            <section className="animate-fade-in-up stagger-1" style={{ background: 'var(--primary)', color: '#fff', padding: '2rem' }}>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--on-primary-container)', marginBottom: '1.5rem', fontWeight: 700 }}>Investigating Officer</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ width: '4rem', height: '4rem', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '2.5rem', fontVariationSettings: "'FILL' 1" }}>account_circle</span>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em' }}>{caseData.officer?.officer_name}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{caseData.officer?.rank}</p>
                  <p style={{ color: 'var(--secondary)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '0.25rem' }}>
                    Badge: {caseData.officer?.badge_number}
                  </p>
                </div>
              </div>
            </section>

            {/* Case Timeline */}
            <section className="animate-fade-in-up stagger-2" style={{ background: 'var(--surface-container-low)', padding: '2rem' }}>
              <div className="section-header">
                <span className="accent-bar" />
                <h2>Case Timeline</h2>
              </div>
              <div className="timeline">
                {timelineItems.map((item, i) => (
                  <div key={i} className={`timeline-item ${item.pending ? 'pending' : ''}`}>
                    <p className="timeline-date">{item.date}</p>
                    <h4 className="timeline-title">{item.title}</h4>
                    {item.desc && <p className="timeline-desc">{item.desc}</p>}
                  </div>
                ))}
              </div>
            </section>

            {/* Submit Tip */}
            <div className="animate-fade-in-up stagger-3" style={{ padding: '2rem', border: '2px solid rgba(0,21,45,0.05)' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 500, color: '#64748b', fontStyle: 'italic', marginBottom: '1rem' }}>
                This case is updated in real-time. For citizen tips or witness testimonies, please use the secure portal link below.
              </p>
              <Link to="/report" className="btn-outline-primary" style={{ display: 'block', textAlign: 'center', width: '100%', padding: '1rem' }}>
                Submit Information Tip
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
