
export const UNIT_TYPE = {
    TEX: "tex",
    DTEX: "decitex",
    DEN: "denier",
}

/*
export const UNIT_CONST = {
    YARD_IN_M: 0.9144,
    POUND_IN_G: 453.59265,
}
*/

export const units = [
    {
        type: UNIT_TYPE.TEX,
        label: "Tex",
        unit: "grams / 1,000 meters",
    },
    {
        type: UNIT_TYPE.DEN,
        label: "Denier",
        unit: "grams / 10,000 meters",
    },
    {
        type: UNIT_TYPE.DTEX,
        label: "Decitex",
        unit: "grams / 9,000 meters",
    }
]

export function toTex(unitType, v) {
    switch (unitType) {
        case UNIT_TYPE.TEX: return v;
        case UNIT_TYPE.DTEX: return v / 10.0;
        case UNIT_TYPE.DEN: return v / 9.0;
        default: {
            console.log("toTex: Unknown unit: " + unitType);
            return NaN;
        }
    }
}

export function toUnit(unitType, v) {
    switch (unitType) {
        case UNIT_TYPE.TEX: return v;
        case UNIT_TYPE.DTEX: return v * 10.0;
        case UNIT_TYPE.DEN: return v * 9.0;
        default: {
            console.log("toUnit: Unknown unit: " + unitType);
            return NaN;
        }
    }
}

export function unitFormatter(unit, v) {
    return {
        type: unit.type,
        label: unit.label,
        unit: unit.unit,
        value: cleanNumber(toUnit(unit.type, v)),
    };
}

export function unitsFormatter(v) {
    console.log(v);
    return units.map(unit =>
        unitFormatter(unit, v)
    );
}

function cleanNumber(v) {
    if (Number.isNaN(v) || v === 0)
        return '';
    const rounded = Math.round(v * 100) / 100;
    return rounded.toString();
}
/*

  fromNel(v) { return 1653.515493 / v; }
  fromNe(v) { return 590.5412474 / v; }
  fromNek(v) { return 885.8118712 / v; }
  fromNm(v) { return 1000.0 / v; }

  toNel(v) { return v / 1653.515493; }
  toNe(v) { return v / 590.5412474; }
  toNek(v) { return v / 885.8118712; }
  toNm(v) { return v / 1000.0 }
*/