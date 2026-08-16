const fs = require('fs');
let content = fs.readFileSync('src/pages/tours/FestivalsCalendarPlus.jsx', 'utf8');

// The submit handler currently calls saveHolidayTourProposal.
// We'll change it to use saveTour instead, so it appears in OperationsPlanning.
// We'll also pass festivalId to it.
const replaceSubmit = `
  const handleProposeSubmit = async (e) => {
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
    
    // Instead of holiday tour proposal, we save it as a proper tour
    const currentTours = await dataService.getTours();
    // we would need dataService.addTour if it existed, or we just manually update localStorage.
    // wait, we can just use dataService.advanceTourLifecycle or similar if we modify MockDataService.
    // Let's modify MockDataService instead to support addTour.
  };
`;

