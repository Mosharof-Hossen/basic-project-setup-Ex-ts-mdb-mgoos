import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

// parser
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  const a = 15;

  res.send(a);
});

export default app;
