/**
 * @description harmony API
 */
import manufacturerRouter from './routes/manufacturer.js';
import brandRouter from './routes/brand.js';
import express from 'express';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.js';
import session from 'express-session';
import passport from 'passport';
import MySQLSessionFactory from 'express-mysql-session';
import { storage } from '../models/engine/db.js';
import cors from 'cors';

const MySQLStore = MySQLSessionFactory(session);
const sessionStore = new MySQLStore(
  {
    database: 'harmony',
    createDatabaseTable: true,
    schema: {
      tableName: 'sessions',
      columnNames: {
        session_id: 'session_id',
        expires: 'expires',
        data: 'data',
      },
    },
  },
  storage.sessionStore
);



const port = 5000;
const app = express();

//global middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: 'devil_lance',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
  })
);
app.use(cors());
//setting up passport
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (request, response) => {
  return response.status(200).json('Welcome to harmony');
});
app.use('/api/', manufacturerRouter);
app.use('/api/', brandRouter);
app.use('/api/auth/', authRoute);
app.listen(port, () => {
  console.log('Running on  port ' + port);
});
