import {parseYarnToFloat} from './yarn-number.js';

it('integer', () => {
    expect(parseYarnToFloat("1")).toBeCloseTo(1.0);
    expect(parseYarnToFloat("1.0")).toBeCloseTo(1.0);
})

it('comma', () => {
    expect(parseYarnToFloat("1,5")).toBeCloseTo(1.5);
})