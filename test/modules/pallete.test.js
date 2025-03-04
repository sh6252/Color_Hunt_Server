const {createPallete}=require('../../modules/pallete')


const {requiredFieldValidation,requiredTypeValidation,modelState}=require('../../services/validations/object')
const {isHEXColor,isRGBColor}=require('../../services/validations/color')
const {convertRGBtoHEX}=require('../../services/convert')
const {getByCondition}=require('../../services/DB/read')
const {addOne}=require('../../services/DB/write')


jest.mock('../../services/validations/object')
jest.mock('../../services/validations/color')
jest.mock('../../services/convert')
jest.mock('../../services/DB/read')
jest.mock('../../services/DB/write')


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


describe('CREATE PALLETE',()=>{
    afterEach(()=>{
        requiredFieldValidation.mockReset()
        requiredTypeValidation.mockReset()
        isHEXColor.mockReset()
        isRGBColor.mockReset()
        convertRGBtoHEX.mockReset()
        getByCondition.mockReset()
        addOne.mockReset()
    })


    it('should return new pallete when all the data is correct and not exist',()=>{
        const pallete={userName:"shifi",colors:['#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF']}
          requiredFieldValidation.mockReturnValue(true)
          requiredTypeValidation.mockReturnValue(true)
          isHEXColor.mockReturnValue(true)
          isRGBColor.mockReturnValue(true)
          convertRGBtoHEX.mockReturnValue('#FFFFFF')
          getByCondition.mockReturnValue([])

          expect(addOne).toHaveBeenCalledWith('pallete',{id:"#FFFFFF#FFFFFF#FFFFFF#FFFFFF",userName:"shifi",colors:['#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF']})
          expect(()=>createPallete(pallete,model)).toStrictEqual({id:"#FFFFFF#FFFFFF#FFFFFF#FFFFFF",userName:"shifi",colors:['#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF']})

    })
    it('should return false when the data is exist',()=>{
        const pallete={userName:"shifi",colors:['#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF']}
        requiredFieldValidation.mockReturnValue(true)
        requiredTypeValidation.mockReturnValue(true)
        isHEXColor.mockReturnValue(true)
        isRGBColor.mockReturnValue(true)
        convertRGBtoHEX.mockReturnValue('#FFFFFF')
        getByCondition.mockReturnValue([{id:"#FFFFFF#FFFFFF#FFFFFF#FFFFFF",userName:"rivki",colors:['#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF']}])
        expect(addOne).not.toHaveBeenCalled()
        expect(()=>createPallete(pallete,model)).toBe(false)
    })
    describe('ERRORS',()=>{
        it('should throw error when requiredFieldValidation throw error',()=>{
            requiredFieldValidation.mockImplementation(()=>{throw Error('error from mock-requiredFieldValidation')})
            expect(()=>createPallete({userName:"shifi"},model)).toThrow('error from mock-requiredFieldValidation')
        })
        it('should throw error when requiredFieldValidation return array wuth the missing attributes',()=>{
            requiredFieldValidation.mockReturnValue(['userName','colors'])
            expect(()=>createPallete({},model)).toThrow(`the following data is required: userName,colors`)
        })
        it('should throw error when requiredTypeValidation throw error',()=>{
            requiredFieldValidation.mockReturnValue(true)
            requiredTypeValidation.mockImplementation(()=>{throw Error('error from mock-requiredTypeValidation')})
            expect(()=>createPallete({userName:"shifi"},model)).toThrow('error from mock-requiredTypeValidation')
        })
        it('should throw error when requiredFieldValidation return array wuth the missing attributes',()=>{
            requiredFieldValidation.mockReturnValue(true)
            requiredTypeValidation.mockReturnValue(['userName','colors'])
            expect(()=>createPallete({},model)).toThrow(`the following data is not from the require type: userName,colors`)
        })
        it('should throw error when pallete.colors.length is not 4',()=>{
            requiredFieldValidation.mockReturnValue(true)
            requiredTypeValidation.mockReturnValue(true)
            expect(()=>createPallete({colors:["#FFFFFF"]},model)).toThrow('the pallete needs 4 colors')
        })
        it('should throw error when the colors contains value not typeof string or array with numbers',()=>{
            requiredFieldValidation.mockReturnValue(true)
            requiredTypeValidation.mockReturnValue(true)
            expect(()=>createPallete({colors:["hghhgn","hduhudh",75,"hhgdh"]},model)).toThrow('one of the colors isnt in the correct format')
            expect(()=>createPallete({colors:["hghhgn","hduhudh",["fg",45,"545"],"hhgdh"]},model)).toThrow('one of the colors isnt in the correct format')
        })
        it('should throw error when isHEXColor throws error',()=>{
            requiredFieldValidation.mockReturnValue(true)
            requiredTypeValidation.mockReturnValue(true)
            isHEXColor.mockImplementation(()=>{throw Error('error from mock-isHEXColor')})
            expect(()=>createPallete({colors:['#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF']})).toThrow('error from mock-isHEXColor')
        })
        it('should throw error when isRGBColor throws error',()=>{
            requiredFieldValidation.mockReturnValue(true)
            requiredTypeValidation.mockReturnValue(true)
            isHEXColor.mockImplementation(()=>{throw Error('error from mock-isRGBColor')})
            expect(()=>createPallete({colors:[[670,765,878],'#FFFFFF','#FFFFFF','#FFFFFF']})).toThrow('error from mock-isRGBColor')
        })
        it('should throw error when the colors contains not RGB or HEX color',()=>{
            requiredFieldValidation.mockReturnValue(true)
            requiredTypeValidation.mockReturnValue(true)
            expect(()=>createPallete({colors:["#124865","hghgg","hugu","bgsuy"]},model)).toThrow('one of the color values is not a real RGB color')
            expect(()=>createPallete({colors:["#124865",[124,900,254],[124,120,254],[124,120,254]]},model)).toThrow('one of the color values is not a real RGB color')

        })
        it('should throw error when getByCondition throws error',()=>{
            requiredFieldValidation.mockReturnValue(true)
            requiredTypeValidation.mockReturnValue(true)
            isHEXColor.mockReturnValue(true)
            isRGBColor.mockReturnValue(true)
            convertRGBtoHEX.mockReturnValue('#FFFFFF')

            getByCondition.mockImplementation(()=>{throw Error('error from mock-getByCondition')})
            expect(()=>createPallete({colors:['#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF']})).toThrow('error from mock-getByCondition')
        })
    })
})