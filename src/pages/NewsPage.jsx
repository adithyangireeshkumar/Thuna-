import { useState, useMemo } from 'react';
import { demoNews, getEnrichedCases } from '../lib/demoData';

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [visibleCount, setVisibleCount] = useState(6);

  const enrichedCases = useMemo(() => getEnrichedCases(), []);

  const newsWithCase = useMemo(() => {
    return demoNews.map(n => {
      const c = enrichedCases.find(ec => ec.case_id === n.case_id);
      return { ...n, caseData: c };
    }).sort((a, b) => new Date(b.publication_date) - new Date(a.publication_date));
  }, [enrichedCases]);

  const filteredNews = newsWithCase.slice(0, visibleCount);
  const heroArticle = newsWithCase[0];

  // Generate bulletins from recent news
  const bulletins = newsWithCase.slice(0, 3).map(n => ({
    time: new Date(n.publication_date).toLocaleDateString('en-IN', { month: 'short', day: '2-digit', year: 'numeric' }),
    text: n.title?.substring(0, 90) + '...',
  }));

  const formatDate = (d) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const getCategoryLabel = (article) => {
    const crime = article.caseData?.fir?.crime_type;
    if (!crime) return 'Press Release';
    if (['murder', 'assault', 'robbery'].includes(crime)) return 'Investigation Update';
    if (['traffic_violation', 'domestic_violence'].includes(crime)) return 'Public Safety';
    return 'Press Release';
  };

  const getCategoryColor = (label) => {
    if (label === 'Investigation Update') return 'var(--error)';
    if (label === 'Public Safety') return '#2E7D32';
    return 'var(--secondary)';
  };

  return (
    <div className="page-wrapper">
      <main className="container" style={{ paddingTop: '1.5rem', paddingBottom: '4rem' }}>
        {/* Hero Section */}
        {heroArticle && (
          <section className="animate-fade-in" style={{ marginBottom: '3rem', display: 'grid', gridTemplateColumns: '7fr 5fr', background: 'var(--primary)', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,21,45,0.15)' }}>
            <div style={{ padding: '3rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--error)', animation: 'pulse 2s infinite' }} />
                Breaking Update
              </span>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.75rem)', fontWeight: 700, color: '#fff', marginBottom: '1.5rem', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                {heroArticle.title?.substring(0, 80)}
              </h2>
              <p style={{ color: 'var(--on-primary-container)', fontSize: '1.125rem', marginBottom: '2.5rem', maxWidth: '520px', lineHeight: 1.6 }}>
                {heroArticle.caseData?.fir?.description?.substring(0, 160)}...
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <a href={heroArticle.article_url} target="_blank" rel="noreferrer" style={{ padding: '1rem 2rem', background: 'var(--secondary-container)', color: 'var(--on-secondary-container)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', transition: 'transform 0.3s' }}>
                  Read Full Dossier
                </a>
                <span style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
                  Ref: {heroArticle.article_id?.toUpperCase()}
                </span>
              </div>
            </div>
            <div style={{ position: 'relative', minHeight: '400px' }}>
              <img
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=500&fit=crop"
                alt="Digital security infrastructure"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)', opacity: 0.5, transition: 'all 0.7s' }}
                onMouseEnter={(e) => { e.target.style.filter = 'grayscale(0%)'; e.target.style.opacity = '0.8'; }}
                onMouseLeave={(e) => { e.target.style.filter = 'grayscale(100%)'; e.target.style.opacity = '0.5'; }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--primary) 0%, transparent 60%)' }} />
            </div>
          </section>
        )}

        {/* Main Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '3rem' }}>
          {/* Feed */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '-0.02em' }}>Recent Archives</h3>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {['all', 'releases', 'safety'].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} style={{
                    fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: activeTab === tab ? 'var(--secondary)' : '#94a3b8',
                    borderBottom: activeTab === tab ? '2px solid var(--secondary)' : '2px solid transparent',
                    paddingBottom: '0.25rem', background: 'none', cursor: 'pointer', transition: 'all 0.3s'
                  }}>
                    {tab === 'all' ? 'All' : tab === 'releases' ? 'Releases' : 'Safety'}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {filteredNews.slice(1).map((article) => {
                const catLabel = getCategoryLabel(article);
                const catColor = getCategoryColor(catLabel);
                return (
                  <article key={article.article_id} style={{ cursor: 'pointer' }}>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                      <div style={{ width: '12rem', height: '8rem', background: '#f1f5f9', overflow: 'hidden', flexShrink: 0 }}>
                        <img
                          src={`https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&h=200&fit=crop&q=80&sig=${article.article_id}`}
                          alt=""
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                          <span style={{ fontSize: '0.625rem', fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', color: catColor }}>{catLabel}</span>
                          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#cbd5e1' }} />
                          <time style={{ fontSize: '0.625rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>{formatDate(article.publication_date)}</time>
                        </div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--primary)', lineHeight: 1.3, marginBottom: '0.75rem', transition: 'color 0.3s' }}
                          onMouseEnter={(e) => e.target.style.color = 'var(--secondary)'}
                          onMouseLeave={(e) => e.target.style.color = 'var(--primary)'}
                        >
                          {article.title?.substring(0, 100)}
                        </h4>
                        <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {article.caseData?.fir?.description}
                        </p>
                        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', transition: 'gap 0.3s' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>View Details</span>
                          <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>arrow_forward</span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {visibleCount < newsWithCase.length && (
              <div style={{ paddingTop: '2rem', display: 'flex', justifyContent: 'center' }}>
                <button className="btn btn-secondary" onClick={() => setVisibleCount(v => v + 6)}>
                  Load Older Records
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {/* Archive Search */}
            <div style={{ padding: '2rem', background: '#fff', boxShadow: 'var(--shadow-card)', outline: 'var(--ghost-border)' }}>
              <h5 style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem', color: 'var(--primary)' }}>Archive Search</h5>
              <div style={{ position: 'relative' }}>
                <input type="text" placeholder="Keywords, Case ID..." style={{ width: '100%', border: 'none', borderBottom: '1px solid #cbd5e1', padding: '0.75rem 0', fontSize: '0.875rem', outline: 'none', background: 'transparent' }} />
                <button style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>
                  <span className="material-symbols-outlined" style={{ color: '#94a3b8' }}>search</span>
                </button>
              </div>
            </div>

            {/* Recent Bulletins */}
            <div style={{ padding: '2rem', background: 'rgba(241,245,249,0.5)' }}>
              <h5 style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem', color: 'var(--primary)' }}>Recent Bulletins</h5>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {bulletins.map((b, i) => (
                  <li key={i}>
                    <time style={{ fontSize: '0.5625rem', fontWeight: 700, color: 'var(--secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>{b.time}</time>
                    <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1e293b', lineHeight: 1.4 }}>{b.text}</p>
                  </li>
                ))}
              </ul>
              <a href="#" style={{ display: 'inline-block', marginTop: '2rem', fontSize: '0.625rem', fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--primary)', borderBottom: '1px solid var(--primary)', textDecoration: 'none' }}>
                View All Bulletins
              </a>
            </div>

            {/* Historical Archive */}
            <div style={{ padding: '2rem', background: 'var(--primary)', color: '#fff' }}>
              <h5 style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem', color: 'var(--on-primary-container)' }}>Historical Archive</h5>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {['2024', '2023', '2022', '2021', '2020', 'Pre-2020'].map(yr => (
                  <a key={yr} href="#" style={{ padding: '0.5rem 0.75rem', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', fontSize: '0.75rem', color: '#fff', textDecoration: 'none', transition: 'background 0.3s' }}
                    onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                  >
                    {yr}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
