import {UNIT_TYPE, toTex, toUnit} from './units.js';


it('tex', () => {
    const u = UNIT_TYPE.TEX;
    expect(toUnit(u, 10.0)).toBeCloseTo(10.0);
    expect(toTex(u, 10.0)).toBeCloseTo(10.0);
})
it('dtex', () => {
    const u = UNIT_TYPE.DTEX;
    expect(toUnit(u, 10.0)).toBeCloseTo(100.0);
    expect(toUnit(u, 20.0)).toBeCloseTo(200.0);
    expect(toTex(u, 1.0)).toBeCloseTo(0.1);
    expect(toTex(u, 2.0)).toBeCloseTo(0.2);
})
it('den', () => {
    const u = UNIT_TYPE.DEN;
    expect(toUnit(u, 1.0)).toBeCloseTo(9.0);
    expect(toTex(u, 9.0)).toBeCloseTo(1.0);
})

