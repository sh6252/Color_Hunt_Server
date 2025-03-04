const {convertRGBtoHEX}=require('../../services/convert')

describe('CONVERT RGB TO HEX',()=>{
    it('should convert RGB color composition to HEX notation',()=>{
        const hexColor=convertRGBtoHEX([56,135,220])
        expect(hexColor).toEqual('#3887DC')
    })
    it('should convert RGB color composition to HEX notation and add zero for numbers less then 16',()=>{
        const hexColor=convertRGBtoHEX([12,135,10])
        expect(hexColor).toEqual('#0C870A')
    })
    describe('ERRORS',()=>{
        it('should throw error when color isnt array',()=>{
            expect(()=>convertRGBtoHEX('hello')).toThrow(`require an array and got string`)
        })
    })
})