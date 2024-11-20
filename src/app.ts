import express, { Request, Response } from 'express';
import cors from 'cors';
import { StudentRoute } from './app/modules/student/student.route';

const app = express();

// parser
app.use(express.json());
app.use(cors());

// application routers
app.use('/api/v1/students', StudentRoute);

app.get('/', (req: Request, res: Response) => {
  const a = 15;

  res.send(a);
});

export default app;
