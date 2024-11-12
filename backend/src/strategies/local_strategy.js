import passport
 from "passport";
 import { Strategy } from 'passport-local';
 import storage from "../../models/engine/db_storage.js";
 import bcrypt from 'bcrypt';

  passport.serializeUser((user, done) => {
    console.log('from serialize function')
    done(null, user.user_id);
  })
  passport.deserializeUser(async (id, done) => {
    try{
      console.log('from deserialize  function')
       const query = `SELECT user_id, user_name, email, created_at FROM admin_user WHERE user_id=?`;
       //user may not exist?
       const [ row ] = await storage.execute(query, [id]);
       done(null, row[0]);
    } catch(error) {
      console.error(error);
    }
  })


 export default passport.use(
  new Strategy({usernameField: 'user_name'}, async (username, password, done) => {
    try {
      const query = `SELECT user_id, user_name, password FROM admin_user WHERE user_name=?`
      const [ row ] = await storage.execute(query, [username]);
      if (row.length === 0) {
        throw new Error('Invalid Credentials');
      }
      const pwd_exist = await bcrypt.compare(password, row[0].password);
      if (!pwd_exist) {
        throw new Error('Invalid credentials');
      }
      done(null, row[0]);
    } catch(error) {
        done(error, null);
    }
  })
)
