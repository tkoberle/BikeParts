const swaggerDocument = {
    swaggerDefinition: {
        info: {
            version: '1.0.0',
            title: 'Bike parts API Document',
            description: 'Description for the Bikeparts API',
            contact: {
                name: 'Thomaz Koberle',
                email: 'tomkoberle@gmail.com'
            },
            servers: ["localhost:3000"]        
        },       
    },
    apis: ["./BikePartRoutes.js"]
}

module.exports = swaggerDocument;