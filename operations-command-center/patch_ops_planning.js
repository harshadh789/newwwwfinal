const fs = require('fs');
let content = fs.readFileSync('src/pages/tours/OperationsPlanning.jsx', 'utf8');

// Replace LIFECYCLE_COLUMNS
const newColumns = `const LIFECYCLE_COLUMNS = [
  {
    id: 'PLANNING',
    title: 'Tour Planning',
    subtitle: 'Holiday tour proposal is created and submitted',
    color: '#60A5FA',
    bg: 'rgba(59, 130, 246, 0.08)',
    border: 'rgba(59, 130, 246, 0.25)'
  },
  {
    id: 'REVIEWING',
    title: 'Reviewing',
    subtitle: 'Needs operations and management approval',
    color: '#F59E0B',
    bg: 'rgba(245, 158, 11, 0.08)',
    border: 'rgba(245, 158, 11, 0.25)'
  },
  {
    id: 'SCHEDULED',
    title: 'Tour Scheduled',
    subtitle: 'The approved tour is officially scheduled',
    color: '#10B981',
    bg: 'rgba(16, 185, 129, 0.08)',
    border: 'rgba(16, 185, 129, 0.25)'
  }
];`;

content = content.replace(/const LIFECYCLE_COLUMNS = \[[\s\S]*?\];/m, newColumns);

// Update initial stages
content = content.replace(/t.lifecycleStage \|\| 'PLAN'/g, "t.lifecycleStage || 'PLANNING'");
content = content.replace(/col.id === 'PLAN'/g, "col.id === 'PLANNING'");
content = content.replace(/col.id !== 'PLAN'/g, "col.id !== 'PLANNING'");
content = content.replace(/col.id === 'CREATE'/g, "col.id === 'REVIEWING'");
content = content.replace(/col.id !== 'POST'/g, "col.id !== 'SCHEDULED'");
content = content.replace(/col.id === 'EXECUTE'/g, "col.id === 'SCHEDULED'");
content = content.replace(/col.id === 'POST'/g, "col.id === 'NONE'");

// Update breadcrumb
content = content.replace(/<span style={{ fontWeight: 700, color: '#60A5FA' }}>PLAN<\/span>/, "<span style={{ fontWeight: 700, color: '#60A5FA' }}>Tour Planning</span>");
content = content.replace(/<span style={{ fontWeight: 700, color: '#F59E0B' }}>CREATE<\/span>/, "<span style={{ fontWeight: 700, color: '#F59E0B' }}>Reviewing</span>");
content = content.replace(/<span style={{ fontWeight: 700, color: '#10B981' }}>EXECUTE<\/span>[\s\S]*?<ChevronRight size={14} \/>[\s\S]*?<span style={{ fontWeight: 700, color: '#A78BFA' }}>POST \/ UPDATE<\/span>/, "<span style={{ fontWeight: 700, color: '#10B981' }}>Tour Scheduled</span>");

// Update stages logic
content = content.replace(/const stages = \['PLAN', 'CREATE', 'EXECUTE', 'POST'\];/g, "const stages = ['PLANNING', 'REVIEWING', 'SCHEDULED'];");

// Update table view selects
content = content.replace(/<option value="PLAN">1\. Plan<\/option>/g, '<option value="PLANNING">Tour Planning</option>');
content = content.replace(/<option value="CREATE">2\. Create<\/option>/g, '<option value="REVIEWING">Reviewing</option>');
content = content.replace(/<option value="EXECUTE">3\. Execute<\/option>/g, '<option value="SCHEDULED">Tour Scheduled</option>');
content = content.replace(/<option value="POST">4\. Post\/Update<\/option>/g, '');
content = content.replace(/tour\.lifecycleStage \|\| 'PLAN'/g, "tour.lifecycleStage || 'PLANNING'");
content = content.replace(/tour.lifecycleStage \|\| 'PLAN'/g, "tour.lifecycleStage || 'PLANNING'"); // Double check

fs.writeFileSync('src/pages/tours/OperationsPlanning.jsx', content);
