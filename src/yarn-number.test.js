import {parseYarnNumber} from './yarn-number.js';

it('integer', () => {
    expect(parseYarnNumber("1")).toBeCloseTo(1.0);
    expect(parseYarnNumber("1.0")).toBeCloseTo(1.0);
})

it('comma', () => {
    expect(parseYarnNumber("1,5")).toBeCloseTo(1.5);
})