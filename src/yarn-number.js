
export function parseYarnToFloat(yarnNumber) {
    return parseFloat(commaToDot(yarnNumber));
}

function commaToDot(str) {
    return str.replace(',', '.');
}