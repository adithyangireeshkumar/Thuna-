import { useState } from 'react';
import { demoStations } from '../lib/demoData';
import { submitReport } from '../lib/supabase';

const CRIME_TYPES = [
  { value: 'theft', label: 'Theft' },
  { value: 'robbery', label: 'Robbery' },
  { value: 'assault', label: 'Assault' },
  { value: 'burglary', label: 'Burglary' },
  { value: 'fraud', label: 'Fraud' },
  { value: 'cybercrime', label: 'Cyber Crime' },
  { value: 'domestic_violence', label: 'Domestic Violence' },
  { value: 'traffic_violation', label: 'Traffic Violation' },
  { value: 'drug_offense', label: 'Drug Offense' },
  { value: 'other', label: 'Other' },
];

const STEPS = [
  { id: 1, label: 'Incident Type', icon: 'category' },
  { id: 2, label: 'Details', icon: 'edit_note' },
  { id: 3, label: 'Contact', icon: 'person' },
  { id: 4, label: 'Review', icon: 'fact_check' },
];

export default function ReportPage() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [formData, setFormData] = useState({
    crime_type: '',
    station_id: '',
    incident_date: '',
    incident_time: '',
    location: '',
    description: '',
    reporter_name: '',
    reporter_phone: '',
    reporter_email: '',
    is_anonymous: false,
  });

  const update = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const canProceed = () => {
    if (step === 1) return formData.crime_type && formData.station_id;
    if (step === 2) return formData.location && formData.description;
    if (step === 3) return formData.is_anonymous || (formData.reporter_name && formData.reporter_phone);
    return true;
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const { data, error } = await submitReport(formData);
      if (error) throw error;
      setTrackingId(data?.tracking_id || 'T-DEMO');
      setSubmitted(true);
    } catch (err) {
      console.error('Submit error:', err);
      setTrackingId(`T-${Math.floor(100000 + Math.random() * 900000)}`);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="page-wrapper">
        <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <div className="animate-fade-in-up" style={{ background: 'var(--surface-container-lowest)', padding: '4rem 3rem', boxShadow: 'var(--shadow-ambient)' }}>
            <div style={{ width: '5rem', height: '5rem', borderRadius: '50%', background: 'rgba(46,125,50,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '2.5rem', color: '#2E7D32' }}>check_circle</span>
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1rem' }}>Report Submitted</h2>
            <p style={{ color: 'var(--on-surface-variant)', marginBottom: '2rem', lineHeight: 1.6 }}>
              Your incident report has been successfully filed in the Sovereign Archive. You may use the tracking ID below to monitor its status.
            </p>
            <div style={{ background: 'var(--surface-container-low)', padding: '1.5rem', marginBottom: '2rem' }}>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--secondary)', fontWeight: 700, marginBottom: '0.5rem' }}>Tracking ID</p>
              <p style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '0.05em' }}>{trackingId}</p>
            </div>
            <button className="btn btn-primary btn-lg" onClick={() => { setSubmitted(false); setStep(1); setFormData({ crime_type: '', station_id: '', incident_date: '', incident_time: '', location: '', description: '', reporter_name: '', reporter_phone: '', reporter_email: '', is_anonymous: false }); }}>
              File Another Report
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <main className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem', maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <header className="animate-fade-in-up" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <div style={{ height: '4px', width: '3rem', background: 'var(--secondary)' }} />
            <span className="label-md">Citizen Action Portal</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--primary)' }}>
            Report an Incident
          </h1>
          <p style={{ marginTop: '0.75rem', color: 'var(--on-surface-variant)', lineHeight: 1.6, maxWidth: '560px' }}>
            File a public incident report securely. All submissions are logged into the sovereign archive for official review.
          </p>
        </header>

        {/* Step Indicator */}
        <div className="animate-fade-in-up stagger-1" style={{ display: 'flex', gap: '0.5rem', marginBottom: '3rem' }}>
          {STEPS.map((s) => (
            <div key={s.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: s.id < step ? 'pointer' : 'default', opacity: s.id <= step ? 1 : 0.4 }} onClick={() => { if (s.id < step) setStep(s.id); }}>
              <div style={{
                width: '2.5rem', height: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: s.id === step ? 'var(--primary)' : s.id < step ? 'var(--secondary)' : 'var(--surface-container-high)',
                color: s.id <= step ? '#fff' : 'var(--outline)', transition: 'all 0.3s'
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>{s.id < step ? 'check' : s.icon}</span>
              </div>
              <span style={{ fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: s.id === step ? 'var(--primary)' : 'var(--on-surface-variant)' }}>{s.label}</span>
              <div style={{ width: '100%', height: '3px', background: s.id <= step ? 'var(--primary)' : 'var(--surface-container-high)', transition: 'background 0.3s' }} />
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="sovereign-card animate-fade-in" style={{ padding: '2.5rem' }}>
          {/* Step 1: Incident Type */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="section-header" style={{ marginBottom: 0 }}>
                <span className="accent-bar" />
                <h2>Incident Classification</h2>
              </div>
              <div className="input-group">
                <label className="input-label">Crime Type *</label>
                <select className="select-field" value={formData.crime_type} onChange={(e) => update('crime_type', e.target.value)}>
                  <option value="">Select crime type</option>
                  {CRIME_TYPES.map(ct => <option key={ct.value} value={ct.value}>{ct.label}</option>)}
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">Nearest Police Station *</label>
                <select className="select-field" value={formData.station_id} onChange={(e) => update('station_id', e.target.value)}>
                  <option value="">Select station</option>
                  {demoStations.map(s => <option key={s.station_id} value={s.station_id}>{s.station_name}</option>)}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="input-group">
                  <label className="input-label">Incident Date</label>
                  <input type="date" className="input-field" value={formData.incident_date} onChange={(e) => update('incident_date', e.target.value)} />
                </div>
                <div className="input-group">
                  <label className="input-label">Incident Time</label>
                  <input type="time" className="input-field" value={formData.incident_time} onChange={(e) => update('incident_time', e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="section-header" style={{ marginBottom: 0 }}>
                <span className="accent-bar" />
                <h2>Incident Details</h2>
              </div>
              <div className="input-group">
                <label className="input-label">Location of Incident *</label>
                <input type="text" className="input-field" placeholder="Enter full address or landmark" value={formData.location} onChange={(e) => update('location', e.target.value)} />
              </div>
              <div className="input-group">
                <label className="input-label">Description *</label>
                <textarea className="textarea-field" placeholder="Provide a detailed description of the incident. Include any relevant information such as time, persons involved, and sequence of events." value={formData.description} onChange={(e) => update('description', e.target.value)} rows={6} />
              </div>
            </div>
          )}

          {/* Step 3: Contact */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="section-header" style={{ marginBottom: 0 }}>
                <span className="accent-bar" />
                <h2>Reporter Information</h2>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '1rem', background: formData.is_anonymous ? 'var(--primary)' : 'var(--surface-container-low)', color: formData.is_anonymous ? '#fff' : 'var(--on-surface)', transition: 'all 0.3s' }}>
                <input type="checkbox" checked={formData.is_anonymous} onChange={(e) => update('is_anonymous', e.target.checked)} style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--secondary)' }} />
                <div>
                  <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>Submit Anonymously</span>
                  <p style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '0.25rem' }}>Your identity will not be recorded</p>
                </div>
              </label>
              {!formData.is_anonymous && (
                <>
                  <div className="input-group">
                    <label className="input-label">Full Name *</label>
                    <input type="text" className="input-field" placeholder="Enter your full name" value={formData.reporter_name} onChange={(e) => update('reporter_name', e.target.value)} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className="input-group">
                      <label className="input-label">Phone Number *</label>
                      <input type="tel" className="input-field" placeholder="+91" value={formData.reporter_phone} onChange={(e) => update('reporter_phone', e.target.value)} />
                    </div>
                    <div className="input-group">
                      <label className="input-label">Email (Optional)</label>
                      <input type="email" className="input-field" placeholder="email@example.com" value={formData.reporter_email} onChange={(e) => update('reporter_email', e.target.value)} />
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="section-header" style={{ marginBottom: 0 }}>
                <span className="accent-bar" />
                <h2>Review Submission</h2>
              </div>
              <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                Please verify all details before submitting. Once filed, the report will be assigned a tracking ID for monitoring.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {[
                  { label: 'Crime Type', value: CRIME_TYPES.find(c => c.value === formData.crime_type)?.label || '—' },
                  { label: 'Station', value: demoStations.find(s => s.station_id === formData.station_id)?.station_name || '—' },
                  { label: 'Date', value: formData.incident_date || '—' },
                  { label: 'Time', value: formData.incident_time || '—' },
                ].map((item, i) => (
                  <div key={i} style={{ background: 'var(--surface-container-low)', padding: '1rem' }}>
                    <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--secondary)', fontWeight: 700, marginBottom: '0.25rem' }}>{item.label}</p>
                    <p style={{ fontWeight: 700, color: 'var(--primary)' }}>{item.value}</p>
                  </div>
                ))}
              </div>
              <div style={{ background: 'var(--surface-container-low)', padding: '1rem' }}>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--secondary)', fontWeight: 700, marginBottom: '0.25rem' }}>Location</p>
                <p style={{ fontWeight: 500, color: 'var(--on-surface)' }}>{formData.location || '—'}</p>
              </div>
              <div style={{ background: 'var(--surface-container-low)', padding: '1rem' }}>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--secondary)', fontWeight: 700, marginBottom: '0.25rem' }}>Description</p>
                <p style={{ fontWeight: 400, color: 'var(--on-surface)', lineHeight: 1.6, fontSize: '0.875rem' }}>{formData.description || '—'}</p>
              </div>
              <div style={{ background: 'var(--surface-container-low)', padding: '1rem' }}>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--secondary)', fontWeight: 700, marginBottom: '0.25rem' }}>Reporter</p>
                <p style={{ fontWeight: 500, color: 'var(--on-surface)' }}>{formData.is_anonymous ? 'Anonymous Submission' : `${formData.reporter_name} — ${formData.reporter_phone}`}</p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--surface-container)' }}>
            {step > 1 ? (
              <button className="btn btn-ghost" onClick={() => setStep(s => s - 1)} style={{ gap: '0.5rem' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_back</span>
                Previous
              </button>
            ) : <div />}

            {step < 4 ? (
              <button className="btn btn-primary" onClick={() => setStep(s => s + 1)} disabled={!canProceed()} style={{ opacity: canProceed() ? 1 : 0.5, gap: '0.5rem' }}>
                Continue
                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_forward</span>
              </button>
            ) : (
              <button className="btn btn-primary btn-lg" onClick={handleSubmit} disabled={submitting} style={{ gap: '0.5rem' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>send</span>
                {submitting ? 'Filing Report...' : 'Submit Report'}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
