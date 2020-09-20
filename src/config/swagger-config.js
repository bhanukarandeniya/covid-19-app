const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const {APP} = require('../../config/config');

const swaggerOptions = {
    covid_incident: {
        swaggerDefinition: {
            info: {
                version: "1.0.0",
                title: "Covid Incidents API",
                description: "Covid Incidents API Information",
                contact: {
                    name: "Amazing Developer"
                },
                servers: [`localhost:${APP.port}`]
            }
        },
        apis: ["./src/controller/covid-incident-controller.js"]
    },
    person: {
        swaggerDefinition: {
            info: {
                version: "1.0.0",
                title: "Person API",
                description: "Person API Information",
                contact: {
                    name: "Amazing Developer"
                },
                servers: [`localhost:${APP.port}`]
            }
        },
        apis: ["./src/controller/person-controller.js"]
    }
}

const swaggerCovidDoc = swaggerJsDoc(swaggerOptions.covid_incident);
const swaggerPersonDoc = swaggerJsDoc(swaggerOptions.person);


module.exports = { swaggerCovidDoc, swaggerPersonDoc, swaggerUi }