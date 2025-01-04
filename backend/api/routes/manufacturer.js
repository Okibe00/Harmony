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
      console.log(errors.array())
      return response.status(400).json({
        errors: 'BAD REQUEST'
      });
    }
    const data = matchedData(request);
    const man = new Manufacturers(data);
    try {
      await storage.save(man);
    } catch (err) {
      console.error(err)
      return response.status(500).json({ status: 'Failed' });
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
      await storage.delete(id, 'manufacturers');
    } catch (err) {
      console.log(err);
      return response.status(500);
    }
  }
);

//Get all brands for a specific manufacturer
router.get(
  `/manufacturers/:id/brands/`,
  param('id').exists().withMessage('Missing manufacturer ID').escape(),
  async (request, response) => {
    const err = validationResult(request);
    if (!err.isEmpty()) {
      console.error(err.array());
      return response.status(400).json({ status: 'Failure' });
    }
    const { id } = matchedData(request);
    console.log(id);
    const query = `
    SELECT
      b.brand_name,
      b.generic_name,
      b.nafdac_no,
      b.pack_size,
      b.drug_class,
      b.category,
      b.dosage_form,
      b.active_ingredients,
      b.market_status
      FROM brands b JOIN manufacturers m ON b.manufacturer_id=m.id
      WHERE m.id=?
      `;
    try {
      const [row] = await storage.execute(query, [id]);
      return response.status(200).json(row);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ status: 'Failure' });
    }
  }
);

//Get all product codes by a specific manufacturer why would you want to do this?
// router.get(`manufacturers/:id/codes`, async (request, response) => {});
export default router;
