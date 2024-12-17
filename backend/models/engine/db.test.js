/**
 * test the storage engine
 */

// import { DATABASE } from '../../utils/db_schema/db_schema';
import storage from './db';
import 'dotenv/config';
import Manufacturers from '../manufacturer';
import Codes from '../drugCode';
// import Users from '../user';
import Brands from '../brand';
import Users from '../user';

describe('test the database and tables', () => {
  beforeAll(async () => {
    console.log('setting up database');
    await storage.setup_db();
    console.log('Database setup!');
  }, 20000);

  afterAll(async () => {
    // await storage.closeConnection();
    console.log('connection closed');
  });

  test('check tables', async () => {
    const [row] = await storage.execute('SHOW TABLES');
    expect(row.length).toBe(5);
  });

  test('test brand columns', async () => {
    const [row] = await storage.execute('SHOW COLUMNS FROM brands');
    const column = row.map((column) => column.Field);
    expect(column.length).toBe(13);
    expect(column).toContain('id');
    expect(column).toContain('generic_name');
    expect(column).toContain('category');
    expect(column).toContain('manufacturer_id');
    expect(column).toContain('created_at');
    expect(column).toContain('updated_at');
    expect(column).toContain('nafdac_no');
    //test the type!!
    const typesObject = {};
    for (let i = 0; i < row.length; i++) {
      typesObject[row[i].Field] = {
        Field: row[i].Field,
        type: row[i].Type,
      };
    }

    expect(typesObject['id'].type).toBe('varchar(255)');
    expect(typesObject['brand_name'].type).toBe('varchar(255)');
    expect(typesObject['manufacturer_id'].type).toBe('varchar(255)');
    expect(typesObject['category'].type).toBe("enum('POM','OTC')");
    expect(typesObject['created_at'].type).toBe('timestamp');
    expect(typesObject['updated_at'].type).toBe('timestamp');
    expect(typesObject['nafdac_no'].type).toBe('varchar(50)');
  });

  test('test manufacturer columns', async () => {
    const [row] = await storage.execute('SHOW COLUMNS FROM manufacturers');

    const column = row.map((column) => column.Field);
    expect(column.length).toBe(5);
    expect(column).toContain('id');
    expect(column).toContain('name');
    expect(column).toContain('country');
    expect(column).toContain('created_at');
    expect(column).toContain('updated_at');
    //test the type!!
    const typesObject = {};
    for (let i = 0; i < row.length; i++) {
      typesObject[row[i].Field] = {
        Field: row[i].Field,
        type: row[i].Type,
      };
    }

    expect(typesObject['id'].type).toBe('varchar(255)');
    expect(typesObject['name'].type).toBe('varchar(255)');
    expect(typesObject['country'].type).toBe('varchar(100)');
    expect(typesObject['created_at'].type).toBe('timestamp');
    expect(typesObject['updated_at'].type).toBe('timestamp');
  });

  test('test drugCode columns', async () => {
    const [row] = await storage.execute('SHOW COLUMNS FROM codes');
    const column = row.map((column) => column.Field);
    expect(column.length).toBe(6);
    expect(column).toContain('manufacturer_id');
    expect(column).toContain('brand_id');
    expect(column).toContain('id');
    expect(column).toContain('product_code');
    expect(column).toContain('created_at');
    expect(column).toContain('updated_at');
    //test the type!!
    const typesObject = {};
    for (let i = 0; i < row.length; i++) {
      typesObject[row[i].Field] = {
        Field: row[i].Field,
        type: row[i].Type,
      };
    }

    expect(typesObject['manufacturer_id'].type).toBe('varchar(255)');
    expect(typesObject['id'].type).toBe('varchar(255)');
    expect(typesObject['brand_id'].type).toBe('varchar(255)');
    expect(typesObject['product_code'].type).toBe('varchar(100)');
    expect(typesObject['created_at'].type).toBe('timestamp');
    expect(typesObject['updated_at'].type).toBe('timestamp');
  });
});

describe('insert', () => {
  beforeAll(async () => {
    console.log('setting up database');
    await storage.setup_db();
  }, 20000);

  afterAll(async () => {
    console.log('closing connection');
    // storage.execute('DROP DATABASE harmony');
  });

  test('should insert a manufacturer', async () => {
    const man0 = {
      name: 'Fidson Nigeria Limited',
      country: 'Nigeria',
    };
    const fidson = new Manufacturers(man0);
    await storage.save(fidson);
    const query = `SELECT * FROM manufacturers WHERE name=?`;
    const [row] = await storage.execute(query, ['Fidson Nigeria Limited']);
    expect(row[0].name).toBe(fidson.name);
    const delQuery = `DELETE FROM manufacturers where name=?`;
    await storage.execute(delQuery, [fidson.name]);
  }, 20000);

  test('insert brand', async () => {
    const man0 = {
      name: 'Kesar Pharma Ltd',
      country: 'Nigeria',
    };
    const kesar = new Manufacturers(man0);
    const strovid = {
      brand_name: 'Strovid-200',
      manufacturer_id: kesar.id,
      generic_name: 'Ofloxacin',
      nafdac_no: 'B4-8583',
      pack_size: '1x10',
      drug_class: 'Antibiotic',
      category: 'POM',
      dosage_form: 'Tablet',
      active_ingredients: 'Ofloxacin 200mg',
      market_status: 'active',
    };
    await storage.save(kesar);
    const brd0 = new Brands(strovid);
    await storage.save(brd0);
    const query = `SELECT * FROM brands where manufacturer_id=?`;
    const [row] = await storage.execute(query, [brd0.manufacturer_id]);
    expect(row[0].id).toBe(brd0.id);
    expect(row[0].manufacturer_id).toBe(kesar.id);
    const delMan = 'DELETE FROM manufacturers where id=?';
    await storage.execute(delMan, [kesar.id]);
  }, 20000);

  test('Should insert a user', async () => {
    const user = {
      username: 'Okibe_Onmeje',
      password: 'okibe007',
      email: 'okibe@somemail.com',
    };
    const okibe = new Users(user);
    await storage.save(okibe);
    const getUser = 'SELECT * FROM users where id=?';
    const [[row]] = await storage.execute(getUser, [okibe.id]);
    expect(row.username).toBe(okibe.username);
    expect(row.id).toBe(okibe.id);
    expect(row.password).toBe(okibe.password);
    const delQuery = 'DELETE FROM users where id = ?';
    await storage.execute(delQuery, [okibe.id]);
  }, 20000);
  test('should add a drug code', async () => {
    const man0 = {
      name: 'Kesar Pharma Ltd',
      country: 'Nigeria',
    };
    const kesar = new Manufacturers(man0);
    await storage.save(kesar);
    const strovid = {
      brand_name: 'Strovid-200',
      manufacturer_id: kesar.id,
      generic_name: 'Ofloxacin',
      nafdac_no: 'B4-8583',
      pack_size: '1x10',
      drug_class: 'Antibiotic',
      category: 'POM',
      dosage_form: 'Tablet',
      active_ingredients: 'Ofloxacin 200mg',
      market_status: 'active',
    };
    const brd0 = new Brands(strovid);
    await storage.save(brd0);
    const brand = {
      brand_id: brd0.id,
      brand_name: brd0.brand_name,
      manufacturer_id: brd0.manufacturer_id,
      drug_class: brd0.drug_class,
      dosage_form: brd0.dosage_form,
    };
    const code = new Codes(brand);
    await storage.save(code);
    const query = 'SELECT * FROM codes WHERE product_code=?';
    const [[row]] = await storage.execute(query, [code.product_code]);
    expect(row.product_code).toBe(code.product_code);
    expect(row.brand_id).toBe(code.brand_id);
    expect(row.manufacturer_id).toBe(code.manufacturer_id);
    const cleanUp = 'DELETE FROM manufacturers where id=?';
    await storage.execute(cleanUp, [code.manufacturer_id]);
  }, 20000);
  test('get method', async () => {
    const man0 = {
      name: 'Kesar Pharma Ltd',
      country: 'Nigeria',
    };
    const kesar = new Manufacturers(man0);
    await storage.save(kesar);
    const strovid = {
      brand_name: 'Strovid-200',
      manufacturer_id: kesar.id,
      generic_name: 'Ofloxacin',
      nafdac_no: 'B4-8583',
      pack_size: '1x10',
      drug_class: 'Antibiotic',
      category: 'POM',
      dosage_form: 'Tablet',
      active_ingredients: 'Ofloxacin 200mg',
      market_status: 'active',
    };
    const brd0 = new Brands(strovid);
    await storage.save(brd0);
    const findManufacturer = await storage.get(kesar.id, 'manufacturers');
    console.log(findManufacturer);
    const findProduct = await storage.get(brd0.id, 'brands');
    console.log(findProduct);
    const delQuery = 'DELETE FROM manufacturers WHERE id=?';
    await storage.execute(delQuery, [kesar.id]);
  }, 20000);
});