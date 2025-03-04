function convertRGBtoHEX(color) {
    if(!(color instanceof Array)){
        throw TypeError(`require an array and got ${typeof color}`)
    }
    const response=color.reduce((strHEX,cl) => strHEX += cl.toString(16).padStart(2, '0'),'#')
    return response.toUpperCase()
}
module.exports = { convertRGBtoHEX }