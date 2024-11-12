/**
 * test the storage engine
*/

import { DATABASE } from '../../utils/db_schema/db_schema';
import storage from './db_storage';
import  'dotenv/config';
import Manufacturers from '../manufacturer';
import DrugCode from '../drug_code';
import admin_user from '../user';
import Brand from '../brand';

describe('test the database and tables',  () => {
  // let storage = null;
  beforeAll(async () => {
    console.log('setting up database');
    await storage.setup_db()
    console.log('Database setup!');
  }, 20000)

  afterAll(async () => {
    // await storage.closeConnection();
    console.log('connection closed');
  })

  test("check tables", async () => {
    const [ row ]  = await storage.execute('SHOW TABLES');
    expect(row.length).toBe(4);
  });

  test('test brand columns', async () => {
    const [ row ] = await storage.execute('SHOW COLUMNS FROM brands');
    // console.log(row)
    const column = row.map((column) => column.Field);
    expect(column.length).toBe(13);
    expect(column).toContain('brand_id')
    expect(column).toContain('brand_name')
    expect(column).toContain('category')
    expect(column).toContain('manufacturer_id')
    expect(column).toContain('created_at')
    expect(column).toContain('updated_at')
    expect(column).toContain('nafdac_no')
    //test the type!!
    const typesObject = {}
    for (let i = 0; i < row.length; i++) {
      typesObject[row[i].Field] = {
        Field: row[i].Field,
        type: row[i].Type,
      };
    }

  expect(typesObject['brand_id'].type).toBe('varchar(255)');
  expect(typesObject['brand_name'].type).toBe('varchar(255)');
  expect(typesObject['manufacturer_id'].type).toBe('varchar(255)');
  expect(typesObject['category'].type).toBe("enum('POM','OTC')");
  expect(typesObject['created_at'].type).toBe('timestamp');
  expect(typesObject['updated_at'].type).toBe('timestamp');
  expect(typesObject['nafdac_no'].type).toBe('varchar(50)');
  })

  test('test manufacturer columns', async () => {
    const [ row ] = await storage.execute('SHOW COLUMNS FROM manufacturers');

    const column = row.map((column) => column.Field);
    expect(column.length).toBe(5);
    expect(column).toContain('manufacturer_id');
    expect(column).toContain('manufacturer_name');
    expect(column).toContain('country');
    expect(column).toContain('created_at');
    expect(column).toContain('updated_at');
    //test the type!!
    const typesObject = {}
    for (let i = 0; i < row.length; i++) {
      typesObject[row[i].Field] = {
        Field: row[i].Field,
        type: row[i].Type,
      };
    }

  expect(typesObject['manufacturer_id'].type).toBe('varchar(255)');
  expect(typesObject['manufacturer_name'].type).toBe('varchar(255)');
  expect(typesObject['country'].type).toBe('varchar(100)');
  expect(typesObject['created_at'].type).toBe('timestamp');
  expect(typesObject['updated_at'].type).toBe('timestamp');
  })

  test('test drugCode columns', async () => {
    const [ row ] = await storage.execute('SHOW COLUMNS FROM drug_codes');
    const column = row.map((column) => column.Field);
    expect(column.length).toBe(6);
    expect(column).toContain('manufacturer_id');
    expect(column).toContain('brand_id');
    expect(column).toContain('code_id');
    expect(column).toContain('product_code');
    expect(column).toContain('created_at');
    expect(column).toContain('updated_at');
    //test the type!!
    const typesObject = {}
    for (let i = 0; i < row.length; i++) {
      typesObject[row[i].Field] = {
        Field: row[i].Field,
        type: row[i].Type,
      };
    }

  expect(typesObject['manufacturer_id'].type).toBe('varchar(255)');
  expect(typesObject['code_id'].type).toBe('varchar(255)');
  expect(typesObject['brand_id'].type).toBe('varchar(255)');
  expect(typesObject['product_code'].type).toBe('varchar(100)');
  expect(typesObject['created_at'].type).toBe('timestamp');
  expect(typesObject['updated_at'].type).toBe('timestamp');
  })
})

describe('test inserting into the databae', () => {
  beforeAll(async () => {
    console.log('setting up database');
    await storage.setup_db()
    const ma0 = {
      manufacturer_name: 'Fidson',
      country: 'Nigeria'
    }

    let fidson = new Manufacturers(ma0);
    const meprasil = {
      brand_name: 'Meprasil-20',
      manufacturer_id: fidson.manufacturer_id,
      generic_name: 'Omeprazole',
      nafdac_no: '04-5698',
      pack_size: '2x10',
      drug_class: 'PPI',
      category: 'OTC',
      dosage_form: 'Tablet',
      active_ingredients: 'Omeprazole 20mg',
      market_status: 'active'
    }
    let br0 = new Brand(meprasil);
    let d0 = {
      brand_name: br0.brand_name,
      brand_id: br0.brand_id,
      manufacturer_id: br0.manufacturer_id,
      drug_class: br0.drug_class,
      dosage_form: br0.dosage_form
    }

    let meprasil_code = new DrugCode(d0);
    await storage.save(fidson);
    await storage.save(br0);

    await storage.save(meprasil_code);
    console.log('Database setup!');
  }, 20000);

  afterAll(async () => {
    console.log('closing connection');
    storage.execute('DROP DATABASE harmony');
  });

  test('test fetching inserted row', async () => {
    const [[row]] = await storage.execute('SELECT brand_name, brand_id from brands');
    expect(row.brand_name).toBe('Meprasil-20');
  },20000)

  test('test add method without manufacturer', async () => {
    const strovid = {
      brand_name: 'Strovid-200',
      manufacturer_name: 'Kesar Pharma Ltd',
      manufacturer_id: null,
      generic_name: 'Ofloxacin',
      nafdac_no: 'B4-8583',
      pack_size: '1x10',
      drug_class: 'Antibiotic',
      category: 'POM',
      dosage_form: 'Tablet',
      active_ingredients: 'Ofloxacin 200mg',
      market_status: 'active'
    }
    const prod = new Brand(strovid);
    const status = await storage.add(prod);
    expect(status).toBe(0);
    const [[row]] = await storage.execute(`SELECT * FROM brands WHERE brand_name='Strovid-200'`);
    expect(row.brand_name).toBe(prod.brand_name);
  }, 20000)

  test('test add method with a manufacturer', async () => {
    const gsk = new Manufacturers({manufacturer_name: 'GSK', country: 'Uk'});
    await storage.add(gsk);
    const amoxil = {
      brand_name: 'Amoxil',
      manufacturer_name: 'GSK',
      manufacturer_id: gsk.manufacturer_id,
      generic_name: 'Amoxicillin',
      nafdac_no: '04-2481',
      pack_size: '10x10',
      drug_class: 'Antibiotic',
      category: 'POM',
      dosage_form: 'Tablet',
      active_ingredients: 'Amoxicillin 500mg',
      market_status: 'active'
    }
    let prod = new Brand(amoxil);
    const status = await storage.add(prod);
    expect(status).toBe(0);
    const [ row ] = await storage.execute(`SELECT * FROM brands WHERE manufacturer_id='${prod.manufacturer_id}'`);
    expect(row[0].manufacturer_id).toBe(amoxil.manufacturer_id);
  })
})
