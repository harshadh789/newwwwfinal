const fs = require('fs');
let content = fs.readFileSync('src/services/MockDataService.js', 'utf8');

// We'll add seasonClass to each destination in seasonality array
content = content.replace(
  /id: "dest1",\s*destinationId: "kashmir",\s*destinationName: "Kashmir",/g,
  `id: "dest1",\n      destinationId: "kashmir",\n      destinationName: "Kashmir",\n      seasonClass: "Peak",`
);
content = content.replace(
  /id: "dest2",\s*destinationId: "rajasthan",\s*destinationName: "Rajasthan",/g,
  `id: "dest2",\n      destinationId: "rajasthan",\n      destinationName: "Rajasthan",\n      seasonClass: "Good",`
);
content = content.replace(
  /id: "dest3",\s*destinationId: "kerala",\s*destinationName: "Kerala",/g,
  `id: "dest3",\n      destinationId: "kerala",\n      destinationName: "Kerala",\n      seasonClass: "Peak",`
);
content = content.replace(
  /id: "dest4",\s*destinationId: "goa",\s*destinationName: "Goa",/g,
  `id: "dest4",\n      destinationId: "goa",\n      destinationName: "Goa",\n      seasonClass: "Good",`
);
content = content.replace(
  /id: "dest5",\s*destinationId: "himachal",\s*destinationName: "Himachal",/g,
  `id: "dest5",\n      destinationId: "himachal",\n      destinationName: "Himachal",\n      seasonClass: "Peak",`
);
content = content.replace(
  /id: "dest6",\s*destinationId: "ladakh",\s*destinationName: "Ladakh",/g,
  `id: "dest6",\n      destinationId: "ladakh",\n      destinationName: "Ladakh",\n      seasonClass: "Off",`
);
content = content.replace(
  /id: "dest7",\s*destinationId: "lakshadweep",\s*destinationName: "Lakshadweep",/g,
  `id: "dest7",\n      destinationId: "lakshadweep",\n      destinationName: "Lakshadweep",\n      seasonClass: "Peak",`
);
content = content.replace(
  /id: "dest8",\s*destinationId: "meghalaya",\s*destinationName: "Meghalaya",/g,
  `id: "dest8",\n      destinationId: "meghalaya",\n      destinationName: "Meghalaya",\n      seasonClass: "Good",`
);

fs.writeFileSync('src/services/MockDataService.js', content);
