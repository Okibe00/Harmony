/**
 * @module harmonyDrugDatabase
 * @description This module sets up an Express.js application to manage a drug database.
 * It allows operations such as adding, deleting, and retrieving information about drugs and manufacturers.
 *
 * TODO:
 *  - Add update record feature
 *  - redesign schema for allowing id creation in code
 */

import express from 'express';
import storage from '../models/engine/db_storage.js';
import getDrug from '../utils/search.js';
import addBrand from '../utils/add_brand.js';
import deleteManufacturer from '../utils/delete_manufacturer.js';
import deleteProduct from '../utils/delete_record.js';
import addManufacturer from '../utils/add_manufacturer.js';

/**
 * @function setup
 * @description Initializes the database by calling the setup_db function from the storage model.
 */
const setup = async () => {
  await storage.setup_db()
}
// setup();

const app = express();

app.use(express.json());
/**
 * Error handling middleware.
 * Logs errors to the console and responds with a 500 status and error message.
 */
app.use((err, request, response, next) => {
  console.error(err.stack);
  response.status(500).json({message: err.message});
})
const router = express.Router();

const PORT = process.env.port || 3000;

/**
 * Root route.
 * @route GET /
 * @returns {string} Welcome message for the drug database.
 */
router.get('/', (request, response) => {
  response.status(201).send('Welcome to harmony drug database')
})
/**
 * Search for drugs in the database.
 * @route POST /drugs
 * @param {object} request.body - The search parameters for querying drugs.
 * @returns {object} The result of the drug search.
 */
router.post('/drugs', async (request, response, next) => {
  try {
    const body = request.body;
    const result = await getDrug(body.query, body.filter);
    response.json(result);
  } catch(error) {
    next(error);
  }
})

/**
 * Add a new brand to the database.
 * @route POST /drugs/add_brand
 * @param {object} req.body - The brand details.
 * @returns {object} Success or failure message.
 */
router.post('/drugs/add_brand', async (req, res, next) => {
  //add a drug to the database;
  /**
   * get manufacturer
   */
  try {
    const brand = req.body;
    const KEYS = [
      'manufacturer_name',
      'generic_name',
      'brand_name',
      'manufacturer_id',
      'nafdac_no',
      'pack_size',
      'drug_class',
      'category',
      'dosage_form',
      'active_ingredients',
      'market_status',
    ];
    //validate brand details
    for (let key in brand) {
      if (KEYS.indexOf(key) === -1) {
        return res.status(400).json({message: 'Missing or Invalid field'});
      }
    }
    const status = await addBrand(brand);
    if (status) {
      res.status(400).json({message: 'Failed to add brand'});
    }
    res.status(200).json({message: 'Ok'});
  } catch (err) {
    next(err);
  }
})

/**
 * Delete a product from the database.
 * @route DELETE /drugs/delete
 * @param {object} req.body - Contains the product code of the drug to be deleted.
 * @returns {object} Success or failure message.
 */
router.delete('/drugs/delete/', async (req, res, next) => {
  try {
    const product_code = req.body['product_code'];
    const status = await deleteProduct(product_code);
    if (status) {
      return res.status(404).json({message: 'Resource not found'});
    }
    res.status(200).json({message: 'Ok'});
  } catch (err) {
      next(err);
  }
})

/**
 * Add a new manufacturer to the database.
 * @route POST /manufacturer/add
 * @param {object} req.body - The manufacturer details.
 * @returns {object} Success or failure message.
 */
router.post('/manufacturer/add', async (req, res, next) => {
  try {
    const newManufacturer = req.body;
    const KEYS = ['manufacturer_name', 'country'];
    //validate manufacturer detail
    for (let key in newManufacturer) {
      if (KEYS.indexOf(key) === -1) {
        return res.status(400).json({message: 'Missing or invalid field'})
      }
    }
    const status = addManufacturer(newManufacturer);
    if (status === -1) {
      return res.status(500).json({message: 'Failed to add manufacturer'})
    }
    return res.status(200).json({message: 'success'});
  } catch(err) {
    next(err);
  }
})

/**
 * Delete a manufacturer from the database.
 * @route DELETE /manufacturer/delete
 * @param {object} req.body - Contains the name of the manufacturer to be deleted.
 * @returns {object} Success or failure message.
 */
router.delete('/manufacturer/delete', async (req, res, next) => {
  try {
    const { manufacturer_name } = req.body;
    if (!manufacturer_name) {
      res.status(400).json({message: 'manufacturer name is required'});
    }
    await deleteManufacturer(manufacturer_name);
    res.status(200).json({message: `${manufacturer_name} deleted`});
  } catch(err) {
    next(err);
  }
})
//uncomment for future development
// router.post('/manufacturer/', async () => {
//   //add a find a manufacturer;
//   //return {id, name, country}
// })

// router.put('/manufacturer', async () => {
//   //update a manufacturer record
// })

// router.post('/users/', async () => {
//   //add a drug to the database;
// })

// router.post('/manufacturer/', async () => {
//   //add a drug to the database;
// })

app.use('/api/v1', router);
app.listen(PORT);
