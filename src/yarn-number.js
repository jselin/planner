
// NUMBER_VALIDATOR = '(\d+[,.]?\d*){1}[ ]*(?:([xX*/]{1})[ ]*(\d+))?'
export function parse(str) {
    return str.replace(',', '.').split(/[xX*\/]/).map( v => parseFloat(v));
}

export function multiply(array) {
    var res = 1;
    array.map( x => {
        res *= x;
    })
    return res;
}

export function numberingToFloat (str) {
    return multiply(parse(str));
}
