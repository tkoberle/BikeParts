//import { swaggerDocument } from "./swagger";

// APIs
const express = require('express');
const swaggerui = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Routes
const bikePartsRouter = require('./BikePartRoutes');

// Swagger OpenAPI definitions
const swaggerOptions = require('./swagger');
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Middleware
const logger = require('./logger')
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(logger);
app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerDocs))
app.use('/api/bikeparts',bikePartsRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));