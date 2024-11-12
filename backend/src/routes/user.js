import { response, Router } from 'express';
import { validationResult, checkSchema, body, matchedData, query, param } from 'express-validator';
import validateUser from '../../utils/validationSchema/validateUser.js';
import admin_user from '../../models/user.js';
import storage from '../../models/engine/db_storage.js';
import hashPassword from '../../utils/hashPassword.js';

const router = Router();
router.post('/users', checkSchema(validateUser), async (request, response) => {
  try {
    const error = validationResult(request);
    if (!error.isEmpty()) {
      return response.status(403).json({ message: error });
    }
    const data = matchedData(request);
    const newUser = new admin_user(data);
    newUser.password = await hashPassword(newUser.password, 10);
    await storage.add(newUser);
    return response.status(200).json({message: 'Ok'});
  } catch (error) {
      console.log(error)
      return response.status(403).json({message: error});
  }
})

router.delete('/users', body('user_id').exists().withMessage('Missing user id').notEmpty().withMessage('User id cannot be empty'), async () => {
  try {
      const error = validationResult(request);
      if (!error.isEmpty()) {
        return response.status(403).json({message: 'Invalid user id '});
      }
      const data = matchedData(request);
      const user_id = data.user_id;
      await storage.execute(`DELETE FROM admin_user WHERE user_id=?`, [user_id]);
  } catch(error) {
    console.error(error);
  }

})
router.get('/users/', query('user_id').notEmpty().exists(), async (request, response) => {
  try {
    const error = validationResult(request);
    const data = matchedData(request);
    if (!error.isEmpty()) {
      return response.status(403).json({message: 'Invalid ID'});
    }
    const [row] = await storage.execute(`SELECT * from admin_user WHERE user_id=?`, [data.user_id]);
    console.log(row);
    return response.status(200).json({message: row});

  } catch(error) {
    console.log(error);
    return response.status(403).json({message: error});
  }
})

export default router;

