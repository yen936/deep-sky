const express = require('express');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const cors = require('cors');

const app = express();
const port = 3001;

// Use CORS middleware
app.use(cors());

let normal_data = [];
let non_malicious_anomaly = [];
let malicious_anomaly = [];

// Read CSV file and store data
fs.createReadStream(path.join(__dirname, 'only_normal.csv'))
  .pipe(csv())
  .on('data', (row) => {
    normal_data.push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

// Read CSV file and store data
fs.createReadStream(path.join(__dirname, 'mixed_data.csv'))
  .pipe(csv())
  .on('data', (row) => {
    non_malicious_anomaly.push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

  // Read CSV file and store data
fs.createReadStream(path.join(__dirname, 'attack_data.csv'))
.pipe(csv())
.on('data', (row) => {
  malicious_anomaly.push(row);
})
.on('end', () => {
  console.log('CSV file successfully processed');
});

app.get('/api/radio-signals-satellite1', (req, res) => {
  res.json(normal_data);
});

app.get('/api/radio-signals-satellite2', (req, res) => {
    res.json(non_malicious_anomaly);
  });

app.get('/api/radio-signals-satellite3', (req, res) => {
    res.json(malicious_anomaly);
  });
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
