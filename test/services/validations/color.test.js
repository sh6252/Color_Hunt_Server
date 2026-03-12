const { isHEXColor, isRGBColor } = require('../../../services/validations/color')

describe('IS RGB COLOR', () => {
    it('should return true when the function gets array with 3 numbers between 0 and 255',()=>{
         const color=[25,84,200]
         const valid=isRGBColor(color)
         expect(valid).toBeTruthy()
    })
    it('should return true when the array has strings wuth numeric value',()=>{
        const color=['25','84','200']
        const valid=isRGBColor(color)
        expect(valid).toBeTruthy()
    })
    it('should return false when the array\'s length is not three',()=>{
        const color=[25,84]
        const valid=isRGBColor(color)
        expect(valid).toBeFalsy()
    })
    it('should return false when at least one array value is not between 0 and 255',()=>{
        const color=[25,84,260]
        const valid=isRGBColor(color)
        expect(valid).toBeFalsy()
    })
   describe('ERRORS', () => {
         it('shoult throw type error when at least one value is not a numeric',()=>{
            const color=[25,84,'aa']
            expect(()=>isRGBColor(color)).toThrow('the array must be with numbers')
            
         })
         it('should throw type error when color is not an array',()=>{
           const color='aaa'
           expect(()=>isRGBColor(color)).toThrow('the color must be array')
         })
    })
})

describe('IS HEX COLOR', () => {
    it('should return true when the color is a valid hex color string',()=>{
         const color='#12A4f3'
         const valid=isHEXColor(color)
         expect(valid).toBeTruthy()
    })
    it('should return false when the first character of the color string is not #',()=>{
        const color='12A4f3'
        const valid=isHEXColor(color)
        expect(valid).toBeFalsy()
    })
    it('should return false when the hexa color is more then 6 characters',()=>{
        const color='#12A45f3'
        const valid=isHEXColor(color)
        expect(valid).toBeFalsy()
    })
    it('should return false when the hexa color contains un expected characters',()=>{
        const color='#12A4g3'
        const valid=isHEXColor(color)
        expect(valid).toBeFalsy()
    })
    describe('ERRORS', () => {
       it('should throw error when the color is not a string',()=>{
            const color=123
            expect(()=>isHEXColor(color)).toThrow('color must be string')
       })
    })
})