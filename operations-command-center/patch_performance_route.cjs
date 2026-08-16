const fs = require('fs');
let appContent = fs.readFileSync('src/App.jsx', 'utf8');
let sidebarContent = fs.readFileSync('src/components/Sidebar.jsx', 'utf8');

// App.jsx
if (!appContent.includes('OpsSalesPerformance')) {
  appContent = appContent.replace(
    /import ScheduledTours from '.\/pages\/tours\/ScheduledTours';\n/,
    `import ScheduledTours from './pages/tours/ScheduledTours';\nimport OpsSalesPerformance from './pages/tours/OpsSalesPerformance';\n`
  );
  appContent = appContent.replace(
    /<Route path="\/tours\/scheduled" element=\{<ScheduledTours \/>\} \/>\n/,
    `<Route path="/tours/scheduled" element={<ScheduledTours />} />\n          <Route path="/tours/performance" element={<OpsSalesPerformance />} />\n`
  );
  fs.writeFileSync('src/App.jsx', appContent);
}

// Sidebar.jsx
if (!sidebarContent.includes('/tours/performance')) {
  sidebarContent = sidebarContent.replace(
    /\{\s*label: 'Scheduled Tours',\s*path: '\/tours\/scheduled'\s*\},\n/,
    `{ label: 'Scheduled Tours', path: '/tours/scheduled' },\n        { label: 'Ops → Sales Perf', path: '/tours/performance' },\n`
  );
  fs.writeFileSync('src/components/Sidebar.jsx', sidebarContent);
}
