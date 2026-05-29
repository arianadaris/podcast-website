require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const contactRouter = require('./contact');
const interviewRouter = require('./interview');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Contact endpoints
app.use('/api/contact', contactRouter);
app.use('/api/interview', interviewRouter);

// In production, you can serve the React build from here if desired.
app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

