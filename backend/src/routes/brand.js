import { Router } from "express";
import { checkSchema, validationResult, matchedData, body } from "express-validator";
import validateDrugDetails  from "../../utils/validationSchema/validateDrugDetails.js";
import addBrand from "../../utils/add_brand.js";
import deleteProduct from "../../utils/delete_record.js";
import validateBrandDetails from "../../utils/validationSchema/validateBrandDetails.js";
import getDrug from "../../utils/search.js";


const router = Router();
/**
 * Search for drugs in the database.
 * @route POST /drugs
 * @param {object} request.body - The search parameters for querying drugs.
 * @returns {object} The result of the drug search.
 */
router.post('/drugs', checkSchema(validateDrugDetails),  async (request, response, next) => {
  try {
    const validationErrors = validationResult(request);
    if (!validationErrors.isEmpty()) {
      //you can provide a custom 404 page for this ?
      return response.status(400).json({message: validationErrors.array()});
    }
    const data = matchedData(request);
    const filters = data.filter | null;
    const result = await getDrug(data.query, filters);
    if (result != 1)
      response.status(200).json(result);
    else {
      response.status(404).json({message: 'Failed to fetch record'});
    }
  } catch(error) {
    next(error);
  }
})

/**
 * Add a new brand to the database.
 * @route POST /drugs/add_brand
 * @param {object} req.body - The brand details.
 * @returns {object} { message: ok | missing or invalid field }
*/

router.post('/drugs/add_brand', checkSchema(validateBrandDetails), async (request, response, next) => {
  try {
    const validationErrors = validationResult(request);
    if (!validationErrors.isEmpty()) {
      return response.status(400).json({message: validationErrors.array()})
    }
    const validatedResult = matchedData(request);
    const status = await addBrand(validatedResult);
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
router.delete('/drugs/delete/', body('product_code',).notEmpty().withMessage('Missing product code'), async (request, response, next) => {
  try {
    const validationErrors = validationResult(request);
    if (!validationErrors.isEmpty()) {
      return response.status(400).json({message: validationErrors.array()});
    }

    const data = matchedData(request);
    const product_code = data['product_code'];
    const status = await deleteProduct(product_code);
    if (status) {
      return res.status(404).json({message: 'Resource not found'});
    }
    return res.status(200).json({message: 'Ok'});
  } catch (err) {
      next(err);
  }
})

export default router;
