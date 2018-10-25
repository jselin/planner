
export const UNIT_TYPE = {
    TEX: "tex",
    DTEX: "decitex",
    MTEX: "millitex",
    KTEX: "kilotex",
    DEN: "denier",
    GRIST: "grist",
    SILK_COUNT: "silk_count",
    NM: "nm",
    BASE: "base",
    WOOLLEN_ABERDEEN: "woollen_aberdeen",
    WOOLLEN_GRAIN: "woollen_grain",
    WOOLLEN_RUN: "woollen_run",
    SPUN_SILK: "spun_silk"
}

// by definitions in Wikipedia
export const UNIT_CONST = {
    YARD_IN_M: 0.9144,
    POUND_IN_G: 453.59265,
    OUNCE_IN_G: 28.349523125,
    DRAM_IN_G: 1.7718451953125,
    GRAIN_IN_G: 0.06479891,
    SKEIN_IN_M: 256 * 0.9144,
}

// base lenght unit in m
// base mass unit in g
export const units = [
    {
        type: UNIT_TYPE.TEX,
        label: "Tex",
        unit: "grams / 1,000 meters",
        massUnit: 1,
        lenghtUnit: 1000,
        direct: true,
    },
    {
        type: UNIT_TYPE.DTEX,
        label: "Decitex",
        unit: "decigrams / 1,000 meters (or grams / 10,000 meters)",
        massUnit: 1,
        lenghtUnit: 10000,
        direct: true,
    },
    {
        type: UNIT_TYPE.MTEX,
        label: "Millitex",
        unit: "milligrams / 1,000 meters",
        massUnit: 0.001,
        lenghtUnit: 1000,
        direct: true,
    },
    {
        type: UNIT_TYPE.KTEX,
        label: "Kilotex",
        unit: "kilograms / 1,000 meters",
        massUnit: 1000,
        lenghtUnit: 1000,
        direct: true,
    },
    {
        type: UNIT_TYPE.DEN,
        label: "Denier",
        unit: "grams / 9,000 meters",
        massUnit: 1,
        lenghtUnit: 9000,
        direct: true,
    },
    {
        type: UNIT_TYPE.GRIST,
        label: "Grist (jute yarn)",
        unit: "pounds / 14,400 yards",
        massUnit: UNIT_CONST.POUND_IN_G,
        lenghtUnit: 14400 * UNIT_CONST.YARD_IN_M,
        direct: true,
    },
    {
        type: UNIT_TYPE.WOOLLEN_ABERDEEN,
        label: "Woollen (Aberdee)",
        unit: "pounds / 14,400 yards",
        massUnit: UNIT_CONST.POUND_IN_G,
        lenghtUnit: 14400 * UNIT_CONST.YARD_IN_M,
        direct: true,
    },
    {
        type: UNIT_TYPE.WOOLLEN_GRAIN,
        label: "Woollen (US Grain)",
        unit: "pounds / 14,400 yards",
        massUnit: UNIT_CONST.GRAIN_IN_G,
        lenghtUnit: 20 * UNIT_CONST.YARD_IN_M,
        direct: true,
    },
    {
        type: UNIT_TYPE.WOOLLEN_RUN,
        label: "Woollen (Yorkshire)",
        unit: "pounds / 256 yards (skein)",
        massUnit: UNIT_CONST.POUND_IN_G,
        lenghtUnit: UNIT_CONST.SKEIN_IN_M,
        direct: true,
    },
    {
        type: UNIT_TYPE.SILK_COUNT,
        label: "Silk count",
        unit: "drams / 1.000 yards (or 1/16 ounce / 1.000 yards)",
        massUnit: UNIT_CONST.DRAM_IN_G,
        lenghtUnit: 1000 * UNIT_CONST.YARD_IN_M,
        direct: true,
    },
    {
        type: UNIT_TYPE.NM,
        label: "Metric cotton count (Nm)",
        unit: "1.000 meters / kilogram",
        massUnit: 1000,
        lenghtUnit: 1000,
        direct: false,
    },
    {
        type: UNIT_TYPE.SPUN_SILK,
        label: "Spun silk",
        unit: "840 yards / pound",
        massUnit: UNIT_CONST.POUND_IN_G,
        lenghtUnit: 840 * UNIT_CONST.YARD_IN_M,
        direct: false,
    },
    {
        type: UNIT_TYPE.BASE,
        label: "Base",
        unit: "gram / meter",
        massUnit: 1,
        lenghtUnit: 1,
        direct: true,
    },

]

export function fromUnitToBase(unitType, v) {
    let unit = units.find(unit =>
        unit.type === unitType
    )

    if (unit.direct === true) {
        return v / (unit.lenghtUnit / unit.massUnit);
    } else {
        return (unit.massUnit / unit.lenghtUnit) / v;
    }
}

export function fromBaseToUnit(unitType, v) {
    let unit = units.find(unit =>
        unit.type === unitType
    )
    if (unit.direct === true) {
        return v * (unit.lenghtUnit / unit.massUnit);
    } else {
        return (unit.massUnit / unit.lenghtUnit) / v;
    }
}

export function toTex(unitType, v) {
    return fromBaseToUnit(UNIT_TYPE.TEX, fromUnitToBase(unitType, v));
}

export function toUnit(unitType, v) {
    return fromBaseToUnit(unitType, fromUnitToBase(UNIT_TYPE.TEX, v));
}

export function unitFormatter(unit, v) {
    return {
        type: unit.type,
        label: unit.label,
        system: unit.direct ? "Fixed lenght" : "Fixed weight",
        unit: unit.unit,
        value: cleanNumber(fromBaseToUnit(unit.type, v)),
    };
}

export function unitsFormatter(v) {
    return units.map(unit =>
        unitFormatter(unit, v)
    );
}

function cleanNumber(v) {
    if (Number.isNaN(v) || !Number.isFinite(v))
        return '';
    const rounded = Math.round(v * 10000) / 10000;
    if (rounded === 0)
        return '';
    return rounded.toString();
}
