/**
 * @module harmonyDrugDatabase
 * @description This module sets up an Express.js application to manage a drug database.
 * It allows operations such as adding, deleting, and retrieving information about drugs and manufacturers.
 *
 * TODO:
 *  - Add update record feature
 *  - redesign schema for allowing id creation in code
 */
// import {validationResult, checkSchema, matchedData} from 'express-validator';
import express from 'express';
import storage from '../models/engine/db_storage.js';
import rootRoute from './routes/index.js';
// import getDrug from '../utils/search.js';
// import addBrand from '../utils/add_brand.js';
// import deleteManufacturer from '../utils/delete_manufacturer.js';
// import deleteProduct from '../utils/delete_record.js';
// import addManufacturer from '../utils/add_manufacturer.js';
// import { validateDrugDetails } from '../utils/validationSchema/validateDrugDetails.js';
import cors from 'cors';
/**
 * @function setup
 * @description Initializes the database by calling the setup_db function from the storage model.
 */
const setup = async () => {
  await storage.setup_db()
}
setup();

const app = express();

//allow cross origin resource sharing
app.use(cors());

app.use(express.json());
/**
 * Error handling middleware.
 * Logs errors to the console and responds with a 500 status and error message.
 */
app.use((err, request, response, next) => {
  console.error(err.stack);
  response.status(500).json({message: err.message});
})
// const router = express.Router();

const PORT = process.env.port || 3001;

/**
 * Root route.
 * @route GET /
 * @returns {string} Welcome message for the drug database.
 */


app.use('/api/v1', rootRoute);
app.listen(PORT);
