/* eslint-disable no-undef */
/**
 * @description test suite for the baseModel class
 */
import baseModel from './baseModel';

describe('baseModel', () => {
  test('should create with passed fields', () => {
    const prdt = {
      name: 'Meprasil-20',
      strength: '20mg',
      formulation: 'Tablet',
    };
    const meprasil = new baseModel(prdt);
    console.log(meprasil);
    expect(meprasil.name).toBe('Meprasil-20');
    expect(Object.keys(meprasil).length).toBe(4);
  });
});
