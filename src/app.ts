/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlwares/globalErrorHandaler';
import notFound from './app/middlwares/notFound';
import router from './routers';

const app = express();

// parser
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));


// application routers
app.use('/api/v1', router);

app.get('/', async (req: Request, res: Response) => {
  // Promise.reject();
  const a = 15;
  res.send(a);
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
