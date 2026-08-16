const fs = require('fs');
let content = fs.readFileSync('src/pages/tours/OperationsPlanning.jsx', 'utf8');

// 1. Add state variables for rejection reason
content = content.replace(
  /const \[activeStageFilter, setActiveStageFilter\] = useState\('ALL'\);/,
  `const [activeStageFilter, setActiveStageFilter] = useState('ALL');
  const [rejectingTour, setRejectingTour] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');`
);

// 2. Change the "Reject to Planning" button to open the modal instead of instantly changing stage
content = content.replace(
  /<button onClick=\{\(\) => handleStageChange\(selectedTour\.id, 'PLANNING'\)\} className="btn-secondary" style=\{\{ color: '#EF4444', borderColor: '#EF4444' \}\}>\s*Reject to Planning\s*<\/button>/,
  `<button onClick={() => setRejectingTour(selectedTour.id)} className="btn-secondary" style={{ color: '#EF4444', borderColor: '#EF4444' }}>
                            Reject to Planning
                          </button>`
);

// 3. Add handleRejectConfirm function
const rejectFunc = `
  const handleRejectConfirm = async () => {
    if (!rejectingTour || !rejectionReason.trim()) return;
    const tour = tours.find(t => t.id === rejectingTour);
    if (tour) {
      const updatedNotes = (tour.notes ? tour.notes + '\\n\\n' : '') + \`[REJECTED - \${new Date().toLocaleDateString()}] Reason: \${rejectionReason}\`;
      await dataService.advanceTourLifecycle(rejectingTour, 'PLANNING', { notes: updatedNotes });
      loadData();
      if (selectedTour?.id === rejectingTour) {
        setSelectedTour({ ...tour, lifecycleStage: 'PLANNING', notes: updatedNotes });
      }
    }
    setRejectingTour(null);
    setRejectionReason('');
  };
`;
content = content.replace(
  /const formatINR = \(val\) => new Intl\.NumberFormat\('en-IN', \{ style: 'currency', currency: 'INR', maximumFractionDigits: 0 \}\)\.format\(val \|\| 0\);/,
  `const formatINR = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val || 0);\n${rejectFunc}`
);

// 4. Add the Rejection Modal UI at the bottom of the component (before </ToursLayout>)
const modalUI = `
      {/* 4. REJECTION MODAL */}
      {rejectingTour && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)', zIndex: 1200, display: 'flex',
          justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(4px)'
        }}>
          <div className="card" style={{ width: '90%', maxWidth: '400px', padding: '1.5rem', background: 'var(--surface-color)' }}>
            <h3 style={{ marginTop: 0, color: '#EF4444', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={20} /> Reject Tour
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Please provide a reason for rejecting this tour back to the Planning stage. This is mandatory.
            </p>
            <textarea 
              autoFocus
              required
              value={rejectionReason} 
              onChange={e => setRejectionReason(e.target.value)} 
              className="form-control" 
              placeholder="e.g. Needs revised pricing..."
              style={{ width: '100%', minHeight: '80px', marginBottom: '1rem', background: 'rgba(0,0,0,0.2)', color: 'white', padding: '10px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }} 
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button onClick={() => { setRejectingTour(null); setRejectionReason(''); }} className="btn-secondary">Cancel</button>
              <button onClick={handleRejectConfirm} disabled={!rejectionReason.trim()} className="btn-primary" style={{ background: '#EF4444', color: '#fff', border: 'none', opacity: !rejectionReason.trim() ? 0.5 : 1 }}>
                Reject Tour
              </button>
            </div>
          </div>
        </div>
      )}
`;

content = content.replace(/<\/ToursLayout>/, modalUI + '\n    </ToursLayout>');

fs.writeFileSync('src/pages/tours/OperationsPlanning.jsx', content);
