import express from 'express';
import errorHandler from './middlewares/errorHandler';
import 'express-async-errors';

import routeCars from './router/routeCars';

const app = express();
app.use(express.json());

app.use('/cars', routeCars);

app.use(errorHandler);

export default app;
