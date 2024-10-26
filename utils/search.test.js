import getDrug from "./search";

/**
 * test the search the function
 *
 *
 * Note: this test doesn't work without a properly provisioned database do that later on;
 */

describe('search test suite', () => {
  const filter = {
    productCode: null,
    dosageForm: null,
    category: null,
    marketStatus: null

  }
  test('test with no filter', async () => {
    const row  = await getDrug('zinnat', filter);
    console.log(row);
    // expect(row[0].expe)
  })
})
