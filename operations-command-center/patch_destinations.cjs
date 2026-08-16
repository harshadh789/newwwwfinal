const fs = require('fs');
let content = fs.readFileSync('src/services/MockDataService.js', 'utf8');

// The destinations array doesn't seem to have season explicitly in some cases.
// Let's find where destinations are defined.
const searchTarget = `destinations: [`;
if (content.includes(searchTarget)) {
  // Let's just blindly add season manually if it's missing, but wait, let's see what destinations looks like first.
}
