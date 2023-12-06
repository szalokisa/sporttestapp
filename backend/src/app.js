import express from 'express';
import logger from '@selesterkft/express-logger';

const cors = require('cors');

import {
    api
    , docs
    , data
    , users
    , token
    , persons
    , organisations
    , combodata
    , sportabilities
    , exercises
    // , subgriddata
    , gridcombodata
    , delrec
    , sttlinestohead
} from './routes';
import errorHandler from './middlewares/error-handler';

const app = express();

app.use(logger.middleware());

app.use('/api', api);
app.use('/api-docs', docs);
app.use('/data', data);
app.use("/token", token);
app.use('/users', users);
app.use('/persons', persons);
app.use('/organisations', organisations);
app.use('/combodata', combodata);
app.use('/gridcombodata', gridcombodata);
app.use('/sportabilities', sportabilities);
app.use('/exercises', exercises);
app.use('/deleterec', delrec);
app.use('/sttlinestohead', sttlinestohead);

app.use(errorHandler);
export default app;
