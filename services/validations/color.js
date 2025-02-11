function isRGBColor(color) {
    if (!Array.isArray(color)) {
        throw TypeError('the color must be array')
    }
    if (color.some(c => isNaN(parseFloat(c)))) {
        throw TypeError('the array must be with numbers')
    }
    if (color.length === 3) {
        return color.every(c => c >= 0 && c <= 255)
    }
    else
        return false
}


function isHEXColor(color) {
       if (typeof color != 'string')
        throw TypeError('color must be string')
    const reg = /^#[0-9a-fA-F]{6}$/
    return reg.test(color)
}
module.exports = { isHEXColor, isRGBColor }