const fs = require('fs');
let content = fs.readFileSync('src/pages/tours/ScheduledTours.jsx', 'utf8');

// 1. Add calendarEvents state
content = content.replace(
  /const \[tours, setTours\] = useState\(\[\]\);/,
  `const [tours, setTours] = useState([]);\n  const [events, setEvents] = useState([]);`
);

// 2. Fetch events in loadData
content = content.replace(
  /const allTours = await dataService\.getTours\(\);/,
  `const allTours = await dataService.getTours();\n    const allEvents = await dataService.getCalendarEvents();`
);
content = content.replace(
  /setTours\(allTours \|\| \[\]\);/,
  `setTours(allTours || []);\n    setEvents(allEvents || []);`
);

// 3. Modify ConfirmedTourCard to show festival/holiday and price
content = content.replace(
  /const tourInfo = tours\.find\(t => t\.id === ct\.tourId\) \|\| \{\};/,
  `const tourInfo = tours.find(t => t.id === ct.tourId) || {};
    const linkedEvent = events.find(e => e.id === tourInfo.festivalId);`
);

content = content.replace(
  /<p style=\{\{ margin: '0\.25rem 0 0', fontSize: '0\.85rem', color: 'var\(--text-secondary\)' \}\}>\{tourInfo\.destination \|\| 'Unknown Destination'\}<\/p>/,
  `<p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {tourInfo.destination || 'Unknown Destination'}
              {linkedEvent && <span> • 🎭 {linkedEvent.name}</span>}
            </p>`
);

content = content.replace(
  /<div style=\{\{ fontSize: '0\.9rem', fontWeight: 500, color: 'var\(--success-color\)' \}\}>₹\{ct\.expectedProfit\?\.toLocaleString\(\)\} \(\{ct\.expectedMargin\}%\)<\/div>/,
  `<div style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--success-color)' }}>
              Price: ₹{((tourInfo.finance?.plannedRevenue || 0) / (tourInfo.sales?.targetCustomers || 1)).toLocaleString('en-IN')}
            </div>`
);

fs.writeFileSync('src/pages/tours/ScheduledTours.jsx', content);
