/**
 * @module test the add brand feature
 * @description test suite for add record feature of harmonyDB
 */

import storage from '../models/engine/db_storage';
import add_brand from './add_brand';

describe('add one record', () => {
  const newBrand = {
    manufacturer_name: 'Sanofi',
    generic_name: 'Ibuprofen',
    brand_name: 'Ibex 400',
    manufacturer_id: null,
    nafdac_no: 'C4-1250',
    pack_size: '1x10',
    drug_class: 'Analgesic',
    category: 'OTC',
    dosage_form: 'tablet',
    active_ingredients: 'Ibuprofen 400mg',
    market_status: 'active'
    }

  beforeAll(async () => {
    await storage.setup_db();
  })
  afterAll(async () => {
    // await storage.execute(`DELETE FROM brands WHERE brand_name='Ibex 400'`);
  })

  test('', async () => {
    await add_brand(newBrand);
    const query = `SELECT brand_name FROM brands WHERE brand_name=?`
    const [[res]] = await storage.execute(query, ['Ibex 400']);
    expect(res.brand_name).toBe(newBrand.brand_name);
  })
});
