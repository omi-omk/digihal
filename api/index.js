const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Load controllers
const productAPI = require('../controllers/ad-controller');
const crudAPI = require('../controllers/crud-controller');

// Define routes
app.use('/api', productAPI);
app.use('/crud', crudAPI);

module.exports = (req, res) => app(req, res);