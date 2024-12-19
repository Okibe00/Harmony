/**
 * @description brand route
 */

import { Router } from 'express';
import { storage } from '../../models/engine/db.js';
import {
  checkSchema,
  matchedData,
  param,
  validationResult,
} from 'express-validator';
import { validateBrandDetails } from '../../utils/validation.js';
import Brands from '../../models/brand.js';

const router = Router();

router.get('/brands/', async (request, response) => {
  const query = 'SELECT * FROM brands';
  try {
    const [row] = await storage.execute(query);
    return response.status(200).json(row);
  } catch (err) {
    return response.status(500).json({
      error: err.message,
    });
  }
});

router.get(
  '/brands/:id/',
  param('id').notEmpty().withMessage('missing id field').escape(),
  async (request, response) => {
    const err = validationResult(request);
    if (!err.isEmpty()) {
      return response.status(400).json({ error: err });
    }
    const { id } = matchedData(request);
    try {
      const row = await storage.get(id, 'brands');
      return response.status(200).json(row);
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }
);
router.post(
  '/brands/',
  checkSchema(validateBrandDetails),
  async (request, response) => {
    const error = validationResult(request);
    if (!error.isEmpty()) {
      return response.status(400).json({ errors: error.array() });
    }
    const data = matchedData(request);
    try {
      const brand = new Brands(data);
      await storage.save(brand);
      return response.status(200).json({ status: 'Ok' });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
);
//TODO: Add update endpoint

router.delete(
  '/brands/:id',
  param('id').notEmpty().escape(),
  async (request, response) => {
    const err = validationResult(request);
    if (!err.isEmpty()) {
      return response.status(400).json({
        errrors: err.array(),
      });
    }
    const data = matchedData(request);
    const { id } = data;
    try {
      await storage.delete(id, 'brands');
    } catch (err) {
      return response.status(500).json({
        error: err.message,
      });
    }
    return response.status(200).json({ status: 'Ok' });
  }
);

export default router;
