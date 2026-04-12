import { useMemo } from 'react';
import { getEnrichedCases } from '../lib/demoData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const CRIME_ICONS = {
  cybercrime: 'shield_lock',
  theft: 'inventory_2',
  assault: 'personal_injury',
  fraud: 'gavel',
  robbery: 'local_police',
  burglary: 'door_front',
  murder: 'report',
  drug_offense: 'vaccines',
  kidnapping: 'person_off',
  domestic_violence: 'family_restroom',
  traffic_violation: 'directions_car',
  other: 'more_horiz',
};

const CRIME_ICON_BG = {
  cybercrime: 'var(--primary-container)',
  theft: 'var(--secondary)',
  assault: 'var(--primary)',
  fraud: 'var(--secondary-container)',
  robbery: 'var(--primary-container)',
  burglary: 'var(--primary)',
  murder: '#c62828',
  drug_offense: 'var(--primary-container)',
  kidnapping: 'var(--primary)',
  domestic_violence: 'var(--secondary)',
  traffic_violation: 'var(--primary-container)',
  other: 'var(--outline)',
};

const DISTRICTS = [
  { name: 'Thiruvananthapuram', count: 2412, pct: 85 },
  { name: 'Kochi', count: 1988, pct: 72 },
  { name: 'Kozhikode', count: 1450, pct: 55 },
  { name: 'Thrissur', count: 940, pct: 40 },
  { name: 'Malappuram', count: 812, pct: 35 },
];

const PIE_COLORS = ['#0b2a4a', '#6b5c42', '#d8c4a4'];

export default function DashboardPage() {
  const enrichedCases = useMemo(() => getEnrichedCases(), []);

  // Aggregate stats
  const totalCases = enrichedCases.length;
  const closedCases = enrichedCases.filter(c => c.case_status === 'case_closed').length;
  const activeCases = enrichedCases.filter(c => !['case_closed', 'chargesheet_filed'].includes(c.case_status)).length;
  const resolvedCases = totalCases - activeCases;

  // Crime trends (monthly mock data)
  const monthlyData = [
    { month: 'JAN', count: 120 }, { month: 'FEB', count: 150 }, { month: 'MAR', count: 180 },
    { month: 'APR', count: 140 }, { month: 'MAY', count: 210 }, { month: 'JUN', count: 190 },
    { month: 'JUL', count: 240 }, { month: 'AUG', count: 220 }, { month: 'SEP', count: 260 },
    { month: 'OCT', count: 230 }, { month: 'NOV', count: 280 }, { month: 'DEC', count: 200 },
  ];

  // Case status distribution
  const pieData = [
    { name: 'Closed', value: 66 },
    { name: 'Under Investigation', value: 27 },
    { name: 'Open', value: 7 },
  ];

  // Crime by type
  const crimeBreakdown = useMemo(() => {
    const counts = {};
    enrichedCases.forEach(c => {
      const t = c.fir?.crime_type || 'other';
      counts[t] = (counts[t] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([type, count]) => ({ type, count, label: type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);
  }, [enrichedCases]);

  const stats = [
    { label: 'Aggregate Load', value: '14,282', sub: 'Total Cases', icon: 'folder_open' },
    { label: 'Resolution Rate', value: '9,410', sub: 'Cases Solved', icon: 'check_circle' },
    { label: 'Current Load', value: '3,872', sub: 'Active Investigations', icon: 'search' },
    { label: 'Velocity Metrics', value: '48 Days', sub: 'Avg. Resolution Time', icon: 'schedule' },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: 'var(--primary)', color: '#fff', padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 700 }}>
          <p>{label}: {payload[0].value} cases</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="page-wrapper">
      <main className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {/* Header */}
        <header className="animate-fade-in-up" style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <div style={{ height: '4px', width: '3rem', background: 'var(--secondary)' }} />
            <span className="label-md">Official Governance Records</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--primary)' }}>
            Portal Statistics & Insights
          </h1>
          <p style={{ marginTop: '1rem', color: 'var(--on-surface-variant)', maxWidth: '640px', lineHeight: 1.6 }}>
            A comprehensive overview of criminal data and investigative progress within the sovereign jurisdiction. Transparency maintained through live digital archival.
          </p>
        </header>

        {/* Metric Cards */}
        <div className="animate-fade-in-up stagger-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {stats.map((s, i) => (
            <div key={i} className="stat-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div>
                <span className="stat-label">{s.label}</span>
                <h3 className="stat-value">{s.value}</h3>
              </div>
              <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="stat-sublabel">{s.sub}</span>
                <span className="material-symbols-outlined stat-icon">{s.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '8fr 4fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          {/* Crime Trends */}
          <div className="sovereign-card animate-fade-in-up stagger-2" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>Crime Trends</h2>
                <p style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '0.25rem' }}>Timeline: Last 12 Months</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button style={{ padding: '0.25rem 0.75rem', background: 'var(--surface-container-low)', fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}>Export CSV</button>
                <button style={{ padding: '0.25rem 0.75rem', background: 'var(--primary)', color: '#fff', fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}>Live View</button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData} barSize={24}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,21,45,0.05)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 9, fontWeight: 700, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="rgba(216,196,164,0.3)" radius={[2, 2, 0, 0]} activeBar={{ fill: 'var(--secondary-container)' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Case Status Pie */}
          <div className="sovereign-card animate-fade-in-up stagger-3" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '2rem' }}>Case Status</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', height: 'calc(100% - 3rem)', justifyContent: 'center' }}>
              <div style={{ width: '12rem', height: '12rem', margin: '0 auto', position: 'relative' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} innerRadius={60} outerRadius={85} dataKey="value" startAngle={90} endAngle={-270} stroke="none">
                      {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--primary)' }}>100%</span>
                  <span style={{ fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--on-surface-variant)' }}>Audited</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {pieData.map((d, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '12px', height: '12px', background: PIE_COLORS[i] }} />
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{d.name}</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 900 }}>{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* District Breakdown & Crime Categories */}
        <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          {/* District */}
          <div className="sovereign-card animate-fade-in-up stagger-4" style={{ padding: '2rem' }}>
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>District-wise Breakdown</h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '0.25rem' }}>Kerala State Jurisdiction</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {DISTRICTS.map((d, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--primary)' }}>{d.name}</span>
                    <span style={{ fontSize: '0.625rem', fontWeight: 900 }}>{d.count.toLocaleString()}</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: `${d.pct}%`, background: 'var(--primary)' }} />
                  </div>
                </div>
              ))}
              <button className="btn btn-secondary" style={{ width: '100%', marginTop: '0.5rem', fontSize: '0.625rem', letterSpacing: '0.2em' }}>
                View All 14 Districts
              </button>
            </div>
          </div>

          {/* Crime Categories */}
          <div className="sovereign-card animate-fade-in-up stagger-5" style={{ padding: '2rem', borderLeft: '4px solid var(--secondary)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '2rem' }}>Crime Categories</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {crimeBreakdown.map((cat, i) => (
                <div key={i} className="category-item">
                  <div className="category-icon" style={{ background: CRIME_ICON_BG[cat.type] || 'var(--primary)' }}>
                    <span className="material-symbols-outlined" style={{ color: '#fff' }}>{CRIME_ICONS[cat.type] || 'more_horiz'}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--primary)' }}>{cat.label}</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 900 }}>{cat.count}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ paddingTop: '1rem', display: 'flex', justifyContent: 'center' }}>
                <a href="#" style={{ fontSize: '0.625rem', fontWeight: 900, color: 'var(--secondary)', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', borderBottom: '1px solid var(--secondary)' }}>
                  Explore Full Directory
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Transparency Pillar Moment */}
        <div className="animate-fade-in-up" style={{ marginTop: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="stats-pillar" style={{ height: '8rem', marginBottom: '1.5rem' }} />
          <h4 style={{ textAlign: 'center', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
            Verified Archival Integrity
          </h4>
          <p style={{ textAlign: 'center', color: 'var(--on-surface-variant)', fontSize: '0.75rem', maxWidth: '500px', lineHeight: 1.6 }}>
            Every data point rendered on this portal is verified by the Central Archive Commission. Data synchronization occurs every 24 hours at 00:00 IST.
          </p>
        </div>
      </main>
    </div>
  );
}
