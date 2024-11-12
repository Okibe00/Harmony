import { Router } from 'express';
import addManufacturer from '../../utils/add_manufacturer.js';
import deleteManufacturer from '../../utils/delete_manufacturer.js';

const router = Router();

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

export default router
