// import DrugCodes from './drugCode';
// import storage from './engine/db_storage';
// import Manufacturers from './manufacturer';
// import Brands from './brand';
/**
 * test drug_code generator
 */

// describe('test the drugCodeGenerator class', () => {
//   beforeAll(async () => {
//     await storage.setup_db();
//     const prd1 = {
//       manufacturer_id: '',
//       generic_name: 'Omeprazole 20mg',
//       brand_name: 'Meprasil-20',
//       nafdac_no: '04-3823',
//       pack_size: '2x10',
//       drug_class: 'proton pump inhibitor',
//       category: 'OTC',
//       dosage_form: 'tablet',
//       active_ingredients: 'Omeprazole',
//       market_status: 'active',
//     };

//     const fidson = {
//       manufacturer_name: 'fidson',
//       country: 'Nigeria',
//     };
//     const m1 = new Manufacturers(fidson);
//     await storage.save(m1);
//     const [mId] = await storage.execute(
//       `SELECT manufacturer_id from manufacturers where manufacturer_name='fidson'`
//     );
//     const meprasil = new Brands(prd1);
//     meprasil.manufacturer_id = mId[0].manufacturer_id;
//     await storage.save(meprasil);
//   }, 20000);

//   afterAll(async () => {
//     await storage.execute('DROP DATABASE harmony');
//     await storage.closeConnection();
//   }, 20000);

//   test('test instance created', async () => {
//     const query = `SELECT manufacturer_id, brand_id, drug_class, dosage_form, brand_name  FROM brands`;
//     let [[row]] = await storage.execute(query);
//     const brand = row;
//     const code1 = new Drug_Codes(row);
//     await storage.save(code1);
//     let [[row1]] = await storage.execute(
//       'select * from drug_codes INNER JOIN brands ON drug_codes.brand_id=brands.brand_id JOIN manufacturers ON brands.manufacturer_id=manufacturers.manufacturer_id'
//     );
//     expect(row1.brand_id).toBe(brand.brand_id);
//     expect(row1.manufacturer_id).toBe(brand.manufacturer_id);
//     expect(row1.product_code).toBe(code1.brandCode);
//   });
// });
