/**
 * test the manufaturer class
 */

import Manufacturers from "./manufacturer";
import storage from "./engine/db_storage";

describe('manufacturer test suit', () => {
  const fidson = {
    manufacturer_name: 'fidson',
    country: 'Nigeria'
  }

  beforeAll( async () => {
    await storage.setup_db();
  }, 20000)

  afterAll(async () => {
    await storage.execute('DROP DATABASE harmony');
  }, 20000)

  test('test create manufacturer', () => {
    const f1 = new Manufacturers(fidson);
    expect(f1.constructor.name).toBe('Manufacturers');
    expect(f1.manufacturer_name).toBe('fidson');
    expect(f1.country).toBe('Nigeria');
  })
  test('test save manufacturer', async () => {
    const m1 = new Manufacturers(fidson);
    storage.save(m1);
    const [ row ] = await storage.execute(`SELECT * FROM manufacturers WHERE manufacturer_name='fidson'`);
    console.log(row.sql);
    expect(row.length).toBe(1);
    expect(row[0].manufacturer_name).toBe(m1.manufacturer_name);
  })
})
