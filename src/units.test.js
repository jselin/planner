import {UNIT_TYPE, toTex, toUnit} from './units.js';


it('tex', () => {
    const u = UNIT_TYPE.TEX;
    expect(toUnit(u, 1.0)).toBeCloseTo(1.0);
    expect(toTex(u, 1.0)).toBeCloseTo(1.0);
})
it('dtex', () => {
    const u = UNIT_TYPE.DTEX;
    expect(toUnit(u, 1.0)).toBeCloseTo(10.0);
    expect(toTex(u, 1.0)).toBeCloseTo(0.1);
})
it('den', () => {
    const u = UNIT_TYPE.DEN;
    expect(toUnit(u, 1.0)).toBeCloseTo(9.0);
    expect(toTex(u, 9.0)).toBeCloseTo(1.0);
})

