import 'dotenv/config';
import express from 'express';
import errorMiddleware from './src/middleware/error.middleware.js';
import tokenUtils from './src/helper/jwt/tokenUtils.js';
import dbCtrl from './src/server/dbCtrl.js';
import setRoutes from './src/server/routeCtrl.js';
import errorCtrl from './src/server/errorCtrl.js'
import cors from 'cors';
import _ from 'lodash';

const app = express();
app.use(express.json());

const allowedOrigins = ['http://localhost:5000', 'http://localhost:5173'];

app.use(
    cors({
        origin: function (origin, callback) {
            if (_.isNull(origin) || _.isUndefined(origin) || origin === 'null') {
                return callback(null, true);
            }

            if (allowedOrigins.indexOf(origin) === -1) {
                console.log('Todo-app: Allowed origins:', allowedOrigins);

                const msg = `The CORS policy for this site does not allow access from the specified origin: ${origin}`;
                return callback(new Error(msg), false);
            }

            return callback(null, true);
        },
        credentials: true,
        preflightContinue: true,
        exposedHeaders: [
            'Access-Control-Allow-Headers',
            'Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept',
        ],
        optionsSuccessStatus: 200,
    })
);

await dbCtrl(app);

setRoutes(app);
tokenUtils.setTokens();

// Error handling middleware
app.use(errorCtrl);

// app.use(errorMiddleware);

// Initialize database connections
