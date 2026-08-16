const fs = require('fs');
let content = fs.readFileSync('src/services/MockDataService.js', 'utf8');

// Add updateTour and addDestination if they don't exist
if (!content.includes('updateTour: async (tourId, updates)')) {
  content = content.replace(
    /addTour: async \(tourData\) => \{/,
    `updateTour: async (tourId, updates) => {\n    await simulateNetwork();\n    let data = loadData();\n    const index = data.tours.findIndex(t => t.id === tourId);\n    if (index > -1) {\n      data.tours[index] = { ...data.tours[index], ...updates };\n      saveData(data);\n      return data.tours[index];\n    }\n    return null;\n  },\n\n  addDestination: async (destData) => {\n    await simulateNetwork();\n    let data = loadData();\n    const newDest = {\n      id: 'dest' + (data.seasonality.length + 1),\n      destinationId: destData.destinationName.toLowerCase().replace(/\\s+/g, '-'),\n      destinationName: destData.destinationName,\n      type: destData.type || 'DOMESTIC',\n      monthly: destData.monthly || {jan: 'Off', feb: 'Off', mar: 'Off', apr: 'Off', may: 'Off', jun: 'Off', jul: 'Off', aug: 'Off', sep: 'Off', oct: 'Off', nov: 'Off', dec: 'Off'},\n      bestTravelWindow: destData.bestTravelWindow || '',\n      notes: destData.notes || '',\n      status: 'ACTIVE',\n      seasonClass: destData.seasonClass || 'Good'\n    };\n    data.seasonality.push(newDest);\n    saveData(data);\n    return newDest;\n  },\n\n  addTour: async (tourData) => {`
  );
  fs.writeFileSync('src/services/MockDataService.js', content);
}
