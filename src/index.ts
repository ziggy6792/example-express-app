import express, { Express, Request, Response } from 'express';
import cors from 'cors';

const app: Express = express();
const port = 4000;

interface IUser {
  name: string;
  age: number;
}

const users: IUser[] = [
  {
    name: 'Simon',
    age: 30,
  },
  {
    name: 'Ben',
    age: 31,
  },
];

app.use(cors());

app.get('/users', (req: Request, res: Response) => {
  res.json(users);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
