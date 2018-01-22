import ordinal from '../ordinal';

describe('ordinal', () => {
  const cases: [number, string][] = [
    [1, '1st'],
    [2, '2nd'],
    [3, '3rd'],
    [4, '4th'],
    [11, '11th'],
    [21, '21st'],
    [24, '24th'],
    [32, '32nd'],
  ];

  cases.forEach(([input, expected]) => {
    it(`should return ${expected} for ${input}`, () => {
      expect(ordinal(input)).toBe(expected);
    });
  });
});
