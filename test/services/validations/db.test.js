const { dataContainValue } = require('../../../services/validations/db')


describe('DATA CONTAINS VALUE', () => {
    it('should retuen true when value exist in the data', () => {
        const data = [{ id: 1, name: 'sara' }, { id: 2, name: 'nechama' }]
        const response = dataContainValue(data, 'sara', 'name')
        expect(response).toBe(true)
    })
    it('should retuen false when value does not exist in the data', () => {
        const data = [{ id: 1, name: 'sara' }, { id: 2, name: 'nechama' }]
        const response = dataContainValue(data, 'rivka', 'name')
        expect(response).toBe(false)
    })
    describe('primitive data arrays', () => {
        it('should return true when value exists in the data', () => {
            const data = [ 'sara' , 'nechama' ]
            const response = dataContainValue(data, 'sara')
            expect(response).toBe(true)
        })

        it('should return false when value does not exist in the data', () => {
            const data = ['sara' , 'nechama' ]
            const response = dataContainValue(data, 'rivka')
            expect(response).toBe(false)
        })
    })

    describe('ERRORS', () => {
        it('should throw error when data is undefined', () => {
           expect(()=>dataContainValue()).toThrow('data must be defined')
        })
        // it('should throw error when value is undefined', () => {
        //     expect(()=>dataContainValue(['ghej'])).toThrow('value must be defined')
        //  })

        it('should throw error when data is not an array of values', () => {
            expect(()=>dataContainValue('zzz','z')).toThrow('data must be instanceof array')
        })
    })

 })
