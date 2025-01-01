/**
 * @description brand route
 */

import { Router } from 'express';
import { storage } from '../../models/engine/db.js';
import {
  body,
  checkSchema,
  matchedData,
  param,
  validationResult,
} from 'express-validator';
import { validateBrandDetails } from '../../utils/validation.js';
import Brands from '../../models/brand.js';
import Codes from '../../models/drugCode.js';

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

router.get('/brands/codes/', async (request, response) => {
  const query = `SELECT 
      C.product_code,
      B.brand_name,
      B.generic_name,
      B.dosage_form,
      B.drug_class,
      M.name AS manufacturer_name
    FROM brands B
    JOIN codes C
      ON C.brand_id=B.id
    JOIN manufacturers M
      ON C.manufacturer_id=M.id`;
  try {
    const [row] = await storage.execute(query);
    return response.status(200).json(row);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: 'Failed to fetch brands' });
  }
});

router.get(
  '/brands/:id',
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
      //when should a product code be created? as soon as a brand is created?
      const productCode = new Codes(brand);
      await storage.save(brand);
      await storage.save(productCode);
      return response.status(200).json({ status: 'Ok' });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
);
//TODO: Add update endpoint

router.delete(
  '/brands/:id',
  param('product_code').notEmpty().escape(),
  async (request, response) => {
    const err = validationResult(request);
    if (!err.isEmpty()) {
      return response.status(400).json({
        errrors: err.array(),
      });
    }
    const data = matchedData(request);
    const { product_code } = data;
    try {
      const query = `SELECT brand_id FROM codes WHERE product_code=?`;
      console.log(product_code);
      const [[row]] = await storage.execute(query, [product_code]);
      console.log(row);
      return response.status(200).json(row);
      // await storage.delete(id, 'brands');
    } catch (err) {
      console.error(err);
      return response.status(500).json({
        error: 'Failed to delete manufacturer',
      });
    }
    // return response.status(200).json({ status: 'Ok' });
  }
);
//Search brands by name or manufacturer
router.post(
  '/brands/search/',
  body('keyword')
    .exists()
    .trim()
    .withMessage('Missing search keyword')
    .escape(),
  async (request, response) => {
    //validation
    const err = validationResult(request);
    if (!err.isEmpty()) {
      return response.status(400).json({ error: err.array() });
    }
    //extracting keyword
    const { keyword } = matchedData(request);
    const query = `
    SELECT
      c.product_code,
      b.brand_name,
      b.generic_name,
      b.nafdac_no,
      b.pack_size,
      b.drug_class,
      b.category,
      b.dosage_form,
      b.active_ingredients,
      b.market_status,
      m.name AS manufacturer_name
    FROM brands b
    JOIN codes c
      ON
        b.id=c.brand_id 
    JOIN manufacturers m
      ON
        c.manufacturer_id=m.id
    WHERE
     LOWER(b.brand_name) LIKE ?
      OR LOWER(m.name) LIKE ?
      OR LOWER(b.generic_name) LIKE ?
      OR LOWER(b.drug_class) LIKE ?
      OR LOWER(b.dosage_form) LIKE ?
      OR LOWER(b.market_status) LIKE ?
      OR LOWER(b.category) LIKE ?
    `;
    console.log(keyword);
    try {
      const [row] = await storage.execute(query, [
        `%${keyword}%`.toLowerCase(),
        `%${keyword}%`.toLowerCase(),
        `%${keyword}%`.toLowerCase(),
        `%${keyword}%`.toLowerCase(),
        `%${keyword}%`.toLowerCase(),
        `%${keyword}%`.toLowerCase(),
        `%${keyword}%`.toLowerCase(),
      ]);
      return response.status(200).json(row);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: 'Failed to fetch brands' });
    }
  }
);

export default router;
