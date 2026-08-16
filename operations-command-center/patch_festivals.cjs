const fs = require('fs');
let content = fs.readFileSync('src/pages/tours/FestivalsCalendarPlus.jsx', 'utf8');

// 1. In EventCard, change the display of linkedTours to show their stage
content = content.replace(
  /\{linkedTours\.slice\(0, 3\)\.map\(t => \(/g,
  `{linkedTours.map(t => ( `
);
content = content.replace(
  /🧭 \{t\.name\}/g,
  `🧭 {t.name} ({(t.lifecycleStage || 'PLANNING').replace('PLANNING', 'Planning').replace('REVIEWING', 'Reviewing').replace('SCHEDULED', 'Scheduled')})`
);

// 2. Change handleProposeSubmit to use addTour
const oldSubmit = `  const handleProposeSubmit = async (e) => {
    e.preventDefault();
    await dataService.saveHolidayTourProposal({
      ...form,
      estimatedRevenue: form.targetPax * form.pricePerPerson,
      estimatedProfit: (form.targetPax * form.pricePerPerson) - form.estimatedCost,
      proposedBy: user?.name || 'Operations Lead'
    });
    setShowProposeModal(false);
    loadData();
  };`;

const newSubmit = `  const handleProposeSubmit = async (e) => {
    e.preventDefault();
    const newTour = {
      id: \`t\${Date.now()}\`,
      name: form.tourName,
      destination: form.destination,
      travelMonth: form.travelMonth,
      lifecycleStage: 'PLANNING',
      festivalId: form.festivalId,
      sales: {
        targetCustomers: form.targetPax,
      },
      finance: {
        plannedRevenue: form.targetPax * form.pricePerPerson
      },
      notes: form.notes
    };
    await dataService.addTour(newTour);
    
    // Auto-link tour to festival
    if (form.festivalId) {
      const data = JSON.parse(localStorage.getItem('campfly_v2_data'));
      const fest = data.calendarEvents.find(ev => ev.id === form.festivalId);
      if (fest) {
        if (!fest.tourIds) fest.tourIds = [];
        fest.tourIds.push(newTour.id);
        localStorage.setItem('campfly_v2_data', JSON.stringify(data));
      }
    }
    
    setShowProposeModal(false);
    loadData();
  };`;

content = content.replace(oldSubmit, newSubmit);

const modalCode = `
      {/* TOUR DETAILS MODAL */}
      {selectedTourDetail && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)', zIndex: 1100, display: 'flex',
          justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(4px)'
        }}>
          <div className="card" style={{ width: '90%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto', background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '0' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.15)', color: '#818CF8' }}>
                    {selectedTourDetail.destination}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', color: '#FCD34D' }}>
                    {selectedTourDetail.lifecycleStage || 'PLANNING'}
                  </span>
                </div>
                <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#fff' }}>{selectedTourDetail.name}</h2>
              </div>
              <button onClick={() => setSelectedTourDetail(null)} className="btn-secondary" style={{ padding: '0.5rem' }}>
                X
              </button>
            </div>
            
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <h4 style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Dates & Scheduling</h4>
                  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '6px', fontSize: '0.9rem' }}>
                    <div style={{ marginBottom: '4px' }}><strong>Travel Month:</strong> {selectedTourDetail.travelMonth}</div>
                    <div style={{ marginBottom: '4px' }}><strong>Travel Date:</strong> {selectedTourDetail.travelDate || 'TBD'}</div>
                    <div style={{ marginBottom: '4px' }}><strong>Due Date (Trip Work):</strong> {selectedTourDetail.operations?.preparationEnd || 'TBD'}</div>
                  </div>
                </div>
                
                <div>
                  <h4 style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Pricing & Capacity</h4>
                  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '6px', fontSize: '0.9rem' }}>
                    <div style={{ marginBottom: '4px' }}><strong>Seats/Target:</strong> {selectedTourDetail.sales?.targetCustomers || 20}</div>
                    <div style={{ marginBottom: '4px' }}><strong>Target Revenue:</strong> ₹{(selectedTourDetail.finance?.plannedRevenue || 0).toLocaleString('en-IN')}</div>
                  </div>
                </div>
              </div>
              
              <div style={{ marginTop: '1.5rem' }}>
                <h4 style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Operational Notes & Approval</h4>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '6px', fontSize: '0.9rem', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>
                  {selectedTourDetail.notes || 'No operational notes added yet.'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
`;

content = content.replace(/const \[showProposeModal, setShowProposeModal\] = useState\(false\);/, "const [showProposeModal, setShowProposeModal] = useState(false);\n  const [selectedTourDetail, setSelectedTourDetail] = useState(null);");

content = content.replace(
  /<span key=\{t\.id\} style=\{\{ fontSize: '0.72rem', padding: '0.1rem 0.5rem', background: 'rgba\(20,184,166,0.12\)', color: '#2DD4BF', borderRadius: '12px', fontWeight: 600 \}\}>/g,
  `<span key={t.id} onClick={(e) => { e.stopPropagation(); onClickTour && onClickTour(t); }} style={{ fontSize: '0.72rem', padding: '0.1rem 0.5rem', background: 'rgba(20,184,166,0.12)', color: '#2DD4BF', borderRadius: '12px', fontWeight: 600, cursor: 'pointer' }}>`
);

content = content.replace(/const EventCard = \(\{ event, destinations, tours, onClick \}\) => \{/g, `const EventCard = ({ event, destinations, tours, onClick, onClickTour }) => {`);
content = content.replace(/<EventCard key=\{e\.id\} event=\{e\} destinations=\{destinations\} tours=\{tours\} onClick=\{\(\) => handleEventClick\(e\)\} \/>/g, `<EventCard key={e.id} event={e} destinations={destinations} tours={tours} onClick={() => handleEventClick(e)} onClickTour={(t) => setSelectedTourDetail(t)} />`);

content = content.replace(/<\/ToursLayout>/, modalCode + '\n    </ToursLayout>');

fs.writeFileSync('src/pages/tours/FestivalsCalendarPlus.jsx', content);
