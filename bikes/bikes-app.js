// APIs
const express = require('express');

// Routes
const rootRoutes = require('../RootRoutes');
const bikeRouter = require('../bikes/BikeRoutes');
const bikePartsRouter = require('./BikePartRoutes');

// Middleware
const logger = require('../middleware/logger');

const port = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(logger);
app.use('/api/bikes',bikeRouter);
app.use('/',rootRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));