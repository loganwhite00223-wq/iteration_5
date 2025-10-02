import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CandidateDetail.css';

const stages = ['applied', 'screening', 'interview', 'technical', 'final', 'offer', 'hired', 'rejected'];

export default function CandidateDetail() {
  const { candidateId } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [timeline, setTimeline] = useState([]);
  const [notes, setNotes] = useState('');
  const [newSkill, setNewSkill] = useState('');

  const loadCandidate = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/candidates/${candidateId}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to load candidate');
      setCandidate(data);
      setNotes(data.notes || '');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadTimeline = async () => {
    try {
      const res = await fetch(`/api/candidates/${candidateId}/timeline`);
      const data = await res.json();
      if (Array.isArray(data)) setTimeline(data);
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    loadCandidate();
    loadTimeline();
  }, [candidateId]);

  const handleStageChange = async (e) => {
    const stage = e.target.value;
    if (!candidate) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/candidates/${candidate.id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ stage })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update stage');
      setCandidate(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!candidate) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/candidates/${candidate.id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ notes })
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save notes');
      }
    } catch (e) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  const addSkill = async () => {
    const skill = newSkill.trim();
    if (!skill || !candidate) return;
    const skills = Array.from(new Set([...(candidate.skills || []), skill]));
    setNewSkill('');
    await updateSkills(skills);
  };

  const removeSkill = async (skill) => {
    if (!candidate) return;
    const skills = (candidate.skills || []).filter((s) => s !== skill);
    await updateSkills(skills);
  };

  const updateSkills = async (skills) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/candidates/${candidate.id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ skills })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update skills');
      setCandidate(data);
    } catch (e) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  const quickAdvance = () => {
    if (!candidate) return;
    const idx = stages.indexOf(candidate.stage);
    const next = stages[Math.min(idx + 1, stages.length - 1)] || candidate.stage;
    handleStageChange({ target: { value: next } });
  };

  const quickReject = () => handleStageChange({ target: { value: 'rejected' } });
  const quickHire = () => handleStageChange({ target: { value: 'hired' } });

  const assessmentLink = useMemo(
    () => (candidate ? `${window.location.origin}/assessment/${candidate.jobId}` : ''),
    [candidate]
  );

  const copyAssessmentLink = async () => {
    try {
      await navigator.clipboard.writeText(assessmentLink);
      alert('Assessment link copied');
    } catch (e) {
      alert('Copy failed');
    }
  };

  if (loading) return <div className="candidate-profile-loading">Loading candidate details...</div>;
  if (error) return <div className="candidate-profile-error">Error: {error}</div>;
  if (!candidate) return <div className="candidate-profile-empty">Candidate not found.</div>;

  return (
    <div className="candidate-profile-layout">
      <div className="profile-main-column">
        <section className="profile-panel profile-overview-panel">
          <header className="profile-header">
            <div className="profile-heading-group">
              <h1 className="profile-name">{candidate.name}</h1>
              <Link className="profile-job-link" to={`/jobs/${candidate.jobId}`}>
                Job #{candidate.jobId}
              </Link>
            </div>
            <select
              className="stage-dropdown"
              value={candidate.stage}
              onChange={handleStageChange}
              disabled={saving}
            >
              {stages.map((s) => (
                <option key={s} value={s}>
                  {s.toUpperCase()}
                </option>
              ))}
            </select>
          </header>

          <div className="profile-meta-grid">
            <div className="profile-meta-item">
              <span className="profile-meta-label">Email</span>
              <span className="profile-meta-value">{candidate.email}</span>
            </div>
            <div className="profile-meta-item">
              <span className="profile-meta-label">Phone</span>
              <span className="profile-meta-value">{candidate.phone || 'N/A'}</span>
            </div>
            <div className="profile-meta-item">
              <span className="profile-meta-label">Experience</span>
              <span className="profile-meta-value">{candidate.experience} years</span>
            </div>
            <div className="profile-meta-item">
              <span className="profile-meta-label">Applied</span>
              <span className="profile-meta-value">
                {candidate.appliedAt ? new Date(candidate.appliedAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </div>
        </section>

        <section className="profile-panel profile-skills-panel">
          <div className="profile-section-heading">Skills</div>
          <div className="skill-list">
            {(candidate.skills || []).map((skill, index) => (
              <span key={index} className="skill-chip">
                {skill}
                <button
                  className="skill-remove-button"
                  type="button"
                  onClick={() => removeSkill(skill)}
                >
                  ×
                </button>
              </span>
            ))}
            {(candidate.skills || []).length === 0 && (
              <span className="skill-empty-state">No skills listed yet.</span>
            )}
          </div>
          <div className="skill-input-row">
            <input
              className="skill-input-field"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add skill"
            />
            <button className="btn btn-primary" type="button" onClick={addSkill} disabled={!newSkill.trim()}>
              Add
            </button>
          </div>
        </section>

        <section className="profile-panel profile-notes-panel">
          <div className="profile-section-heading">Notes</div>
          <textarea
            className="notes-editor"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <div className="notes-actions">
            <button className="btn btn-primary" onClick={handleSaveNotes} disabled={saving}>
              Save Notes
            </button>
          </div>
        </section>
      </div>

      <aside className="profile-sidebar">
        <section className="profile-panel quick-actions-panel">
          <h3 className="profile-panel-title">Quick Actions</h3>
          <div className="quick-actions-list">
            <button className="btn btn-primary" onClick={quickAdvance} disabled={saving}>
              Advance Stage →
            </button>
            <button className="btn" onClick={quickHire} disabled={saving}>
              Mark Hired
            </button>
            <button className="btn" onClick={quickReject} disabled={saving}>
              Mark Rejected
            </button>
          </div>
        </section>

        <section className="profile-panel assessment-panel">
          <h3 className="profile-panel-title">Assessment</h3>
          <div className="assessment-score-row">
            <span className="profile-meta-label">Score</span>
            <span className="profile-meta-value">{candidate.assessmentScore}%</span>
          </div>
          <progress className="assessment-progress-bar" value={candidate.assessmentScore} max="100"></progress>
          <div className="assessment-summary">{candidate.assessmentAnalysis}</div>
          <div className="assessment-actions">
            <a className="btn" href={assessmentLink} target="_blank" rel="noreferrer">
              Open Assessment
            </a>
            <button className="assessment-copy-button" type="button" onClick={copyAssessmentLink}>
              Copy Link
            </button>
          </div>
        </section>

        <section className="profile-panel timeline-panel">
          <h3 className="profile-panel-title">Timeline</h3>
          <ul className="activity-timeline">
            {timeline.map((entry) => (
              <li key={entry.id} className="activity-list-item">
                <div className="activity-item-title">
                  <strong>{entry.type}</strong> — {entry.description}
                </div>
                <div className="activity-date">{new Date(entry.date).toLocaleDateString()}</div>
              </li>
            ))}
            {timeline.length === 0 && <li className="activity-list-item">No activity yet.</li>}
          </ul>
        </section>
      </aside>
    </div>
  );
}
