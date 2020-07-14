// APIs
const express = require('express');

// Routes
const bikePartsRouter = require('./BikePartRoutes');

// Middleware
const logger = require('./logger')
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(logger);
app.use('/api/bikeparts',bikePartsRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));