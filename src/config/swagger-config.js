const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const config = require('config');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Customer API",
            description: "Customer API Information",
            contact: {
                name: "Amazing Developer"
            },
            servers: [`localhost:${config.port}`]
        }
    },
    apis: ["app.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);

exports.swaggerUi = swaggerUi;
exports.swaggerDocs = swaggerDocs;