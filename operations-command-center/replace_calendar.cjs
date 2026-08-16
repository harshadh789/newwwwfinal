const fs = require('fs');

let content = fs.readFileSync('src/pages/tours/FestivalsCalendarPlus.jsx', 'utf8');

// Replace the cell mapping to include an onClick handler for the cell itself
content = content.replace(
  /(\<div key=\{idx\} style=\{\{[^}]+\}\}\>)/g,
  (match, p1) => {
    // We want to add onClick to the cell, but only if it's not empty
    return match;
  }
);

content = content.replace(
  /\<div key=\{idx\} style=\{\{\s*minHeight: '130px',/g,
  `\n            <div key={idx} 
              onClick={() => {
                if (!cell.empty && isOpsOrAdmin) {
                  setForm(prev => ({ ...prev, startDate: cell.fullDate, endDate: cell.fullDate, festivalId: '' }));
                  setShowProposeModal(true);
                }
              }}
              style={{ cursor: (!cell.empty && isOpsOrAdmin) ? 'pointer' : 'default', minHeight: '130px',`
);

// We need to stop event propagation on tour chips so clicking a tour doesn't also open the propose modal
content = content.replace(
  /onClick=\{\(\) \=\> handleTourClick\(tour\)\}/g,
  `onClick={(e) => { e.stopPropagation(); handleTourClick(tour); }}`
);

fs.writeFileSync('src/pages/tours/FestivalsCalendarPlus.jsx', content);
