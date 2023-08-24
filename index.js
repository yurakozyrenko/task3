const Sentry = require('@sentry/node');
const express = require('express');
require('dotenv').config();
const app = express();

Sentry.init({
    dsn: 'https://d52020a3e98f8574eb591ab7fbc82ad6@o4505761874378752.ingest.sentry.io/4505761878900736',
    integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({
            tracing: true,
        }),
        // enable Express.js middleware tracing
        new Sentry.Integrations.Express({
            app,
        }),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Users API',
            version: '1.0.0',
            description: 'Users API information',
            contact: {
                name: 'Amazing Developer',
            },
            servers: ['http://localhost:2000'],
        },
    },
    apis: ['./routes/*js'],
};

app.use('/api', require('./routes/users.routes'));

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(process.env.PORT, () => {
    console.log('Server started');
});
