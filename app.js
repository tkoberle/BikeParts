// APIs
const express = require('express');

// Routes
const rootRoutes = require('./routes/RootRoutes');
const bikeRouter = require('./routes/BikeRoutes');
const bikePartsRouter = require('./routes/BikePartRoutes');

// Middleware
const logger = require('./middleware/logger');

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(logger);
app.use('/api/bikes',bikeRouter);
app.use('/api/bikeparts',bikePartsRouter);
app.use('/',rootRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));