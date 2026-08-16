const fs = require('fs');
let appContent = fs.readFileSync('src/App.jsx', 'utf8');
let sidebarContent = fs.readFileSync('src/components/Sidebar.jsx', 'utf8');

// In App.jsx
appContent = appContent.replace(/import TourCatalogue from '.\/pages\/tours\/TourCatalogue';\n/g, '');
appContent = appContent.replace(/<Route path="\/tours\/catalogue" element=\{<TourCatalogue \/>\} \/>\n/g, '');

// In Sidebar.jsx
sidebarContent = sidebarContent.replace(/\{\s*label: 'Tour Catalogue',\s*path: '\/tours\/catalogue'\s*\},\n/g, '');

fs.writeFileSync('src/App.jsx', appContent);
fs.writeFileSync('src/components/Sidebar.jsx', sidebarContent);
