const { convertRGBtoHEX } = require('../services/convert')
const { getByCondition } = require('../services/DB/read')
const { addOne } = require('../services/DB/write')
const { isHEXColor, isRGBColor } = require('../services/validations/color')
const { modelState, requiredFieldValidation, requiredTypeValidation } = require('../services/validations/object')


const model = {
    name: 'pallete',
    fields: [
        {
            name: 'id',
            required: {
                [modelState.INSERT]: false,
                [modelState.UPDATE]: true,
                [modelState.DELETE]: true
            },
            type: 'string'
        },
        {
            name: 'userName',
            required: {
                [modelState.INSERT]: true,
                [modelState.UPDATE]: false,
                [modelState.DELETE]: false
            },
            type: 'string'
        },
        {
            name: 'colors',
            required: {
                [modelState.INSERT]: true,
                [modelState.UPDATE]: false,
                [modelState.DELETE]: false
            },
            type: (val) => val instanceof Array
        }
    ]
}


function createPallete(pallete) {
    try {
        const requireFields = requiredFieldValidation(pallete, model)
        if (requireFields instanceof Array) {
            throw TypeError(`the following data is required: ${requireFields.join(',')}`)
        }
        const typeFields = requiredTypeValidation(pallete, model)
        if (typeFields instanceof Array) {
            throw TypeError(`the following data is not from the require type: ${typeFields.join(',')}`)
        }
        const { colors } = pallete
        if (colors.length !== 4) {
            throw Error('the pallete needs 4 colors')
        }
        const validColorTypes = colors.every(cl => typeof cl == 'string' || (cl instanceof Array && cl.every(item => !isNaN(item))))
        if (!validColorTypes) {
            throw Error('one of the colors isnt in the correct format')
        }
        const validColors = colors.map(cl => typeof cl === 'string' ? isHEXColor(cl) : isRGBColor(cl))
        if (validColors.some(item => !item)) {
            throw Error('one of the color values is not a real RGB color')
        }
        const id = colors.reduce((id, cl) => id += cl instanceof Array ? convertRGBtoHEX(cl) : cl, '')
        const exist = getByCondition(model.name, { id })
        if (exist.length===0) {
            pallete.id = id
            addOne(model.name, pallete)
            return pallete
        }
        return false
    }
    catch (error) {
        throw error
    }
}
module.exports = { createPallete }