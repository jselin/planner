import {multiply, numberingToFloat} from './yarn-number.js';

it('multiply', () => {
    expect(multiply([1])).toEqual(1);
    expect(multiply([1,2])).toEqual(2);
    expect(multiply([1,2,3])).toEqual(6);
    expect(multiply([4,2])).toEqual(8);
    expect(multiply([4.1,2.1])).toBeCloseTo(8.61);
})

it('number to float', () => {
    expect(numberingToFloat('1')).toEqual(1);
    expect(numberingToFloat('1,2')).toEqual(1.2);
    expect(numberingToFloat('1x2')).toEqual(2);
    expect(numberingToFloat('1*2')).toEqual(2);
    expect(numberingToFloat('1 x 2')).toEqual(2);
    expect(numberingToFloat('1x2x3')).toEqual(6);
    expect(numberingToFloat('1x2x3')).toEqual(6);
    expect(numberingToFloat('1/2/3')).toEqual(6);
    expect(numberingToFloat('1.0x2.0x3.0')).toBeCloseTo(6);
    expect(numberingToFloat('1.1/2.2/3.3')).toBeCloseTo(7.986);
})
