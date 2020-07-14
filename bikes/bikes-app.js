// APIs
const express = require('express');

// Routes
const bikeRouter = require('./BikeRoutes');

// Middleware
const logger = require('./logger');

const port = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(logger);
app.use('/api/bikes',bikeRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));