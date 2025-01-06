import passport from 'passport';
import { Strategy } from 'passport-local';
import { storage } from '../../models/engine/db.js';
import bcrypt from 'bcrypt';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const [[row]] = await storage.execute(
      'SELECT * FROM users WHERE id=?',
      [id]
    );
    if (!Object.keys(row).length) {
      throw new Error('User not Found');
    }
    done(null, row);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const [[row]] = await storage.execute(
        'SELECT * FROM users WHERE username=?',
        [username]
      );
      if (!row) {
        throw new Error('User not Found');
      }
      if (!bcrypt.compareSync(password, row.password)) {
        throw new Error('Invalid credentials');
      }
      done(null, row);
    } catch (error) {
      done(error, null);
    }
  })
);
