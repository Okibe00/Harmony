import { Router } from "express";
import session from 'express-session';
import passport from 'passport';
import '../strategies/local_strategy.js';
import storage from "../../models/engine/db_storage.js";
import MySQLSessionFactory from "express-mysql-session";
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
        data: 'data'
      }
    }
  },
  storage.sessionStore)
const router = Router();
const sess = {
  secret: 'devil_lance',
  saveUninitialized: false,
  resave: false,
  cookie: {
    secure: false,
    maxAge: 60000,
  },
  store: sessionStore
}
const users = [{username: 'okibe', password: 'okibe123'}];
router.use(session(sess));
router.use(passport.initialize());
router.use(passport.session());
router.post('/auth', passport.authenticate('local'), async (request, response) => {
  return response.status(200).json({message: request.user})
})

router.get('/authStatus', (request, response) => {
  return response.status(200).json({message: request.user});
})
export default router;
