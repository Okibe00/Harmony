/**
 *@description users endpoint
 */

import Users from '../../models/user.js';
import { storage } from '../../models/engine/db.js';
import {
  validationResult,
  matchedData,
  checkSchema,
  param,
} from 'express-validator';
import { validateUser } from '../../utils/validation.js';
import { Router } from 'express';

const router = Router();

router.get('/users/', async (request, response) => {
  try {
    const [row] = await storage.execute('SELECT id, username FROM users');
    return response.status(200).json(row);
  } catch (error) {
    console.error(error);
    return response.status(500).json('Unable to fetch data');
  }
});
router.post('/users/', checkSchema(validateUser), async (request, response) => {
  try {
    const result = validationResult(request);
    if (!result.isEmpty()) {
      console.log(result.array());
      return response.status(400).json('Bad request');
    }
    const data = matchedData(request);
    const newUser = new Users(data);
    await storage.save(newUser);
    return response.status(200).json({ status: 'Ok' });
  } catch (error) {
    console.error(error);
    return response.status(500);
  }
});
// router.put('', async (request, response) => {});
router.delete(
  '/users/:id/',
  param('id').exists().withMessage('Missing user ID').escape(),
  async (request, response) => {
    // return response.status(200).json({status: 'OK'})
    let error, data;
    error = validationResult(request);
    if (!error.isEmpty()) {
      console.error(error);
      return response.status(400).json({ status: 'Failed' });
    }
    data = matchedData(request);
    const { id: user_id } = data;
    try {
      await storage.execute('DELETE FROM users WHERE id=?', [user_id]);
      return response.status(200).json({status: 'OK'});
    } catch (error) {
      console.error(error);
      return response.status(500)
    }
  }
);

export default router;
