import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getEnrichedCases, demoStations } from '../lib/demoData';

const STATUS_MAP = {
  complaint_registered: { label: 'Complaint Filed', className: 'badge-warning' },
  investigation_started: { label: 'Under Investigation', className: 'badge-warning' },
  evidence_collected: { label: 'Evidence Collected', className: 'badge-info' },
  arrest_made: { label: 'Arrest Made', className: 'badge-info' },
  chargesheet_filed: { label: 'Charge Sheeted', className: 'badge-success' },
  case_closed: { label: 'Case Closed', className: 'badge-success' },
};

const ITEMS_PER_PAGE = 10;

export default function CaseListPage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [crimeFilter, setCrimeFilter] = useState(searchParams.get('crime') || '');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || '');
  const [currentPage, setCurrentPage] = useState(1);

  const enrichedCases = useMemo(() => getEnrichedCases(), []);

  const filtered = useMemo(() => {
    return enrichedCases.filter(c => {
      const q = search.toLowerCase();
      const matchSearch = !q || 
        c.fir?.fir_number?.toLowerCase().includes(q) ||
        c.station?.station_name?.toLowerCase().includes(q) ||
        c.fir?.crime_type?.toLowerCase().includes(q) ||
        c.fir?.location?.toLowerCase().includes(q);
      const matchCrime = !crimeFilter || c.fir?.crime_type === crimeFilter;
      const matchStatus = !statusFilter || c.case_status === statusFilter;
      return matchSearch && matchCrime && matchStatus;
    });
  }, [enrichedCases, search, crimeFilter, statusFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const formatCrimeType = (type) => {
    if (!type) return '—';
    return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const renderPagination = () => {
    const pages = [];
    const show = [1, 2, 3];
    if (totalPages > 5) show.push(totalPages);

    for (let i = 1; i <= Math.min(totalPages, 3); i++) {
      pages.push(
        <button key={i} className={`pagination-btn ${currentPage === i ? 'active' : 'inactive'}`} onClick={() => setCurrentPage(i)}>
          {i}
        </button>
      );
    }
    if (totalPages > 4) {
      pages.push(<span key="dots" style={{ padding: '0 0.5rem', color: 'var(--on-surface-variant)' }}>...</span>);
      pages.push(
        <button key={totalPages} className={`pagination-btn ${currentPage === totalPages ? 'active' : 'inactive'}`} onClick={() => setCurrentPage(totalPages)}>
          {totalPages}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="page-wrapper">
      <main className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {/* Header */}
        <header className="animate-fade-in-up" style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--primary)', marginBottom: '1rem', lineHeight: 1.1 }}>
            Archive of Public Records
          </h1>
          <p style={{ color: 'var(--on-surface-variant)', maxWidth: '640px', fontSize: '1.125rem', fontWeight: 500, lineHeight: 1.6 }}>
            Access the sovereign database of first information reports and ongoing legal proceedings across the state jurisdiction.
          </p>
        </header>

        {/* Search & Filters */}
        <section className="animate-fade-in-up stagger-1" style={{ marginBottom: '3rem', display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1.5rem', alignItems: 'end' }}>
            <div>
              <label className="input-label" style={{ marginBottom: '0.5rem', display: 'block' }}>Search Records</label>
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--outline)' }}>search</span>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Enter FIR Number, Station, or Type..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                  style={{ width: '100%', paddingLeft: '3rem' }}
                />
              </div>
            </div>
            <div>
              <label className="input-label" style={{ marginBottom: '0.5rem', display: 'block' }}>Crime Category</label>
              <select className="select-field" style={{ width: '100%' }} value={crimeFilter} onChange={(e) => { setCrimeFilter(e.target.value); setCurrentPage(1); }}>
                <option value="">All Categories</option>
                <option value="theft">Theft</option>
                <option value="robbery">Robbery</option>
                <option value="assault">Assault</option>
                <option value="cybercrime">Cyber Crime</option>
                <option value="fraud">Fraud</option>
                <option value="burglary">Burglary</option>
                <option value="murder">Murder</option>
                <option value="drug_offense">Drug Offense</option>
              </select>
            </div>
            <div>
              <label className="input-label" style={{ marginBottom: '0.5rem', display: 'block' }}>Status</label>
              <select className="select-field" style={{ width: '100%' }} value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}>
                <option value="">Any Status</option>
                <option value="investigation_started">Under Investigation</option>
                <option value="case_closed">Case Closed</option>
                <option value="chargesheet_filed">Charge Sheeted</option>
                <option value="arrest_made">Arrest Made</option>
              </select>
            </div>
          </div>
        </section>

        {/* Table */}
        <div className="animate-fade-in-up stagger-2" style={{ background: 'var(--surface-container-lowest)', borderRadius: '0.75rem', overflow: 'hidden', boxShadow: 'var(--shadow-ambient)', border: 'var(--ghost-border)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table className="sovereign-table">
              <thead>
                <tr>
                  <th>FIR Number</th>
                  <th>Date</th>
                  <th>Crime Type</th>
                  <th>Police Station</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((c) => {
                  const st = STATUS_MAP[c.case_status] || STATUS_MAP.complaint_registered;
                  return (
                    <tr key={c.case_id}>
                      <td style={{ fontWeight: 700, color: 'var(--primary)', letterSpacing: '-0.02em' }}>{c.fir?.fir_number}</td>
                      <td style={{ color: 'var(--on-surface-variant)' }}>{formatDate(c.fir?.fir_date)}</td>
                      <td><span style={{ fontWeight: 600 }}>{formatCrimeType(c.fir?.crime_type)}</span></td>
                      <td>{c.station?.station_name?.replace(' Police Station', '')}</td>
                      <td>
                        <span className={`badge ${st.className}`}>
                          <span className="badge-dot" />
                          {st.label}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <Link
                          to={`/cases/${c.case_id}`}
                          style={{ color: 'var(--secondary)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', borderBottom: '2px solid rgba(107,92,66,0.2)', paddingBottom: '2px', textDecoration: 'none', transition: 'border-color 0.3s' }}
                          onMouseEnter={(e) => e.target.style.borderBottomColor = 'var(--secondary)'}
                          onMouseLeave={(e) => e.target.style.borderBottomColor = 'rgba(107,92,66,0.2)'}
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  );
                })}
                {paginated.length === 0 && (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--outline)' }}>
                      No records found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="animate-fade-in-up" style={{ marginTop: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.1rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--on-surface-variant)' }}>
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length.toLocaleString()} records
            </span>
            <div className="pagination">
              <button className="pagination-btn nav-arrow" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              {renderPagination()}
              <button className="pagination-btn nav-arrow" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
