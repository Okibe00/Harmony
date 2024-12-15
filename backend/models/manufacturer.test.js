/**
 * @description Test suit for manufacturer class
 */

import Manufacturers from './manufacturer';

test('Should have id and name field', () => {
  const manufacturer = {
    name: 'Pharmabay Limited',
  };
  const pharmabay = new Manufacturers(manufacturer);
  expect(pharmabay.name).toBe('Pharmabay Limited');
  expect(pharmabay.id).toBeTruthy();
});
