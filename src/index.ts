import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import _ from 'lodash';
import { IUser } from './domain-models/user';
import { ISearchUserRequest } from './request-types/user';

const app: Express = express();
const port = 4100;

const users: IUser[] = [
  {
    name: 'Simon Verhoeven',
    age: 30,
  },
  {
    name: 'Simon Pegg',
    age: 52,
  },
  {
    name: 'Ben Verhoeven',
    age: 31,
  },
];

app.use(cors());

app.get('/users', (req: Request, res: Response) => {
  console.log(req.params);
  res.json(users);
});

app.get('/searchUsers', (req: Request<any, any, any, ISearchUserRequest>, res: Response<IUser[]>) => {
  const searchUserRequest = req.query;

  const searchResults = _.filter(users, (user) => {
    if (searchUserRequest.age) {
      if (searchUserRequest.age !== user.age) return false;
    }
    if (searchUserRequest.name) {
      if (!user.name?.toLowerCase().includes(searchUserRequest.name.toLowerCase())) return false;
    }
    return true;
  });

  res.json(searchResults);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
