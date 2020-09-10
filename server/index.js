require('dotenv').config();
require('newrelic');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.static(path.join(__dirname, '/../client')));
app.use('/:id', express.static(path.join(__dirname, '/../client')));

app.use(bodyParser.json());


app.use('/api/images', createProxyMiddleware(
  process.env.IMAGES_URL || 'http://localhost:3001/api/images'
));

app.use('/api/booking', createProxyMiddleware(
  process.env.BOOKING_URL || 'http://localhost:3002/api/booking'
));

app.use('/api/overall_reviews', createProxyMiddleware(
  process.env.OVERALL_REVIEWS_URL || 'http://localhost:3003/api/overall_reviews'
));


app.use('/api/individual_reviews', createProxyMiddleware(
  process.env.INDIVIDUAL_REVIEWS_URL || 'http://localhost:3003/api/individual_reviews'
));


app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});
