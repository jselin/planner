
// NUMBER_VALIDATOR = '(\d+[,.]?\d*){1}[ ]*(?:([xX*/]{1})[ ]*(\d+))?'
export function parse(str) {
    return str.replace(',', '.').split(/[xX*/]/).map(v => parseFloat(v));
}

export function multiply(array) {
    var res = 1.0;

    for (var i = 0; i < array.length; i++) {
        res *= array[i];
    }
    return res;
}

export function numberingToFloat(str) {
    return multiply(parse(str));
}
