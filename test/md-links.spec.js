// const mdLinks = require('../index.js');

// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });
const {
  RuteFind
} = require('./index.js');

describe('GetEmpleado', () => {
  test('Function', () => {
    expect(typeof RuteFind).toBe('function');
  });

});