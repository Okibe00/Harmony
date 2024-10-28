/**
 * test the storage engine
*/

import { DATABASE } from '../../utils/db_setup';
import dbStorage from './db_storage';
import  'dotenv/config';

describe('test the database and tables',  () => {
  let storage = null;
  beforeAll(async () => {
    console.log('setting up database');
    storage = new dbStorage();
    await storage.setup_db()
    console.log('Database setup!');
  }, 20000)

  afterAll(async () => {
    await storage.execute('DROP DATABASE ' + DATABASE);
    await storage.closeConnection();
    console.log('connection closed');
  })

  test("check tables", async () => {
    const [ row ]  = await storage.execute('SHOW TABLES');
    expect(row.length).toBe(6);
  });

  test('test brand columns', async () => {
    const [ row ] = await storage.execute('SHOW COLUMNS FROM brands');

    const column = row.map((column) => column.Field);
    expect(column.length).toBe(7);
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

  expect(typesObject['brand_id'].type).toBe('int(11)');
  expect(typesObject['brand_name'].type).toBe('varchar(255)');
  expect(typesObject['manufacturer_id'].type).toBe('int(11)');
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

  expect(typesObject['manufacturer_id'].type).toBe('int(11)');
  expect(typesObject['manufacturer_name'].type).toBe('varchar(255)');
  expect(typesObject['country'].type).toBe('varchar(100)');
  expect(typesObject['created_at'].type).toBe('timestamp');
  expect(typesObject['updated_at'].type).toBe('timestamp');
  })

  test('test drugCode columns', async () => {
    const [ row ] = await storage.execute('SHOW COLUMNS FROM drug_codes');
    const column = row.map((column) => column.Field);
    expect(column.length).toBe(7);
    expect(column).toContain('manufacturer_id');
    expect(column).toContain('brand_id');
    expect(column).toContain('formulation_id');
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

  expect(typesObject['manufacturer_id'].type).toBe('int(11)');
  expect(typesObject['code_id'].type).toBe('int(11)');
  expect(typesObject['brand_id'].type).toBe('int(11)');
  expect(typesObject['formulation_id'].type).toBe('int(11)');
  expect(typesObject['product_code'].type).toBe('varchar(100)');
  expect(typesObject['created_at'].type).toBe('timestamp');
  expect(typesObject['updated_at'].type).toBe('timestamp');
  })
})
