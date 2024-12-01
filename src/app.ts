/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import express, { Request, Response,NextFunction } from 'express';
import cors from 'cors';
import { StudentRoute } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlwares/globalErrorHandaler';

const app = express();

// parser
app.use(express.json());
app.use(cors());

// application routers
app.use('/api/v1/students', StudentRoute);
app.use('/api/v1/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  const a = 15;
  res.send(a);
});

app.use(globalErrorHandler);


export default app;
