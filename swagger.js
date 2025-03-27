const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'ALU Node.js API',
        version: '1.0.0',
        description: 'API for managing products, categories, and inventories',
    },
    host: 'localhost:3000',
    schemes: ['http']
};
const outputFile = './swagger-output.json';
const endpoints = ['./index.js']

swaggerAutogen(outputFile, endpoints, doc).then(()=>{
    require("./index.js")
})