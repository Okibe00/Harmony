import storage from './engine/db_storage';
import Manufacturers from './manufacturer';
import Brands from './brand';

/**
 * Test the brand class
 */

describe('brand class test suite', () => {
  const prd1 = {
    manufacturer_id: '',
    generic_name: 'Omeprazole 20mg',
    brand_name: 'Meprasil-20',
    nafdac_no: '04-3823',
    pack_size: '2x10',
    drug_class: 'proton pump inhibitor',
    category: 'OTC',
    dosage_form: 'tablet',
    active_ingredients: 'Omeprazole',
    market_status: 'active'
  }

  const fidson = {
    manufacturer_name: 'fidson',
    country: 'Nigeria'
  }
  beforeAll(async () => {
    await storage.setup_db();
  }, 20000);

  afterAll(async () => {
    await storage.execute('DROP DATABASE harmony');
  })

  test('test create instance of brand', async () => {
   const m1 = new Manufacturers(fidson);
   storage.save(m1);
   const [ mId ] = await storage.execute(`SELECT manufacturer_id from manufacturers where manufacturer_name='fidson'`);
   const meprasil = new Brands(prd1);
   meprasil.manufacturer_id = mId[0].manufacturer_id;
   await storage.save(meprasil);
   const [ row ] = await storage.execute('SELECT * FROM brands INNER JOIN manufacturers ON brands.manufacturer_id = manufacturers.manufacturer_id');
   console.log(row);
   expect(row[0].generic_name).toBe(meprasil.generic_name);
   expect(row[0].manufacturer_id).toBe(1);
   expect(row[0].brand_name).toBe(meprasil.brand_name);
   expect(row[0].manufacturer_name).toBe(fidson.manufacturer_name);
   expect(row[0].country).toBe(fidson.country);
  });
})
