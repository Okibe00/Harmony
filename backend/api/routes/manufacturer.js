/**
 * @description api end for manufacturer
 */
import { Router } from 'express';
import { storage } from '../../models/engine/db.js';
import { validateManufacturer } from '../../utils/validation.js';
import {
  checkSchema,
  matchedData,
  param,
  validationResult,
} from 'express-validator';
import Manufacturers from '../../models/manufacturer.js';
const router = Router();

// GET	/api/manufacturers	Retrieve all manufacturers

/**
 * Retrieve all manufacturers
 * @route GET /api/manufacturers/
 *
 */
router.get('/manufacturers/', async (request, response) => {
  const query = 'SELECT * FROM manufacturers';
  const [row] = await storage.execute(query);
  return response.status(200).json(row);
});

router.get('/manufacturers/:id/', async (request, response) => {
  const params = request.params;
  const fetchMan = await storage.get(params.id, 'manufacturers');
  if (fetchMan) {
    return response.status(200).json(fetchMan);
  }
  return response.status(200).json('No manufacturer found');
});

router.post(
  '/manufacturers/',
  checkSchema(validateManufacturer),
  async (request, response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({
        errors: errors.array(),
      });
    }
    const data = matchedData(request);
    const man = new Manufacturers(data);
    try {
      await storage.save(man);
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
    return response.status(200).json({
      status: 'success',
    });
  }
);

//TODO: implement update route

router.delete(
  '/manufacturers/:id',
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
      var rs = await storage.delete(id, 'manufacturers');
    } catch (err) {
      return response.status(500).json({
        error: err.message,
        r: rs
      })
    }
    return response.status(200).json({id, rs});
  }
);
export default router;
