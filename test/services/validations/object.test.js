const { requiredFieldValidation,
    requiredTypeValidation,
    modelState } = require('../../../services/validations/object')
const testModel = {
    name: 'test',
    fields: [{
        name: 'id', required: {
            [modelState.INSERT]: false,
            [modelState.UPDATE]: true,
            [modelState.DELETE]: true
        }, type: 'string'
    }, {
        name: 'name', required: {
            [modelState.INSERT]: true,
            [modelState.UPDATE]: false,
            [modelState.DELETE]: false
        }, type: 'string'
    }, 
    {
        name: 'count', required: {
            [modelState.INSERT]: true,
            [modelState.UPDATE]: false,
            [modelState.DELETE]: false
        }, type: 'number'
    },{

        name: 'code', required: {
            [modelState.INSERT]: true,
            [modelState.UPDATE]: false,
            [modelState.DELETE]: false
        }, type: (val)=>typeof val==='number'||(!isNaN(val)&&typeof val==='string')
    }, {
        name: 'items', required: {
            [modelState.INSERT]: true,
            [modelState.UPDATE]: false,
            [modelState.DELETE]: false
        }, type: (val) => Array.isArray(val)


    }]
}

describe('REQUIRE FIELDS VALIDATIONS', () => {

    it('should return true when all require fields are present', () => {
        const obj = { name: 'test1', code: '42656', items: [1, 2, 3],count:53 }
        const response = requiredFieldValidation(obj, testModel)
        expect(response).toBe(true)
    })
    it('should return true when all require fields are present',()=>{
        const obj={id:'test',code:'54267',items:[1,2,3],count:53}
        const response=requiredFieldValidation(obj,testModel,modelState.UPDATE)
        expect(response).toBe(true)
    })
    it('should return an array of missing required fields', () => {
        const obj = { name: 'test1',count:53 }
        const response = requiredFieldValidation(obj, testModel)
        expect(response).toBeInstanceOf(Array)
        expect(response.length).toBe(2)
        expect(response).toContain('code')
        expect(response).toContain('items')
        // לא חייבים לכתוב את ה-not
        expect(response).not.toContain('name')
        expect(response).not.toContain('count')
        expect(response).not.toContain('id')
        // פה הסדר יהיה משמעותי ולכן לא נשתמש בזה
        // expect(response).toEqual(['items','code'])
        
    })
    describe('ERRORS', () => {
        it('should throw error when state is not  a string ', () => {
            const obj = { id: 'test1', code: '35567', items: [1, 2, 3] }
            expect(() => requiredFieldValidation(obj, testModel, 123)).toThrow('state must be string')
            expect(() => requiredFieldValidation(obj, testModel, [1, 2])).toThrow('state must be string')
            expect(() => requiredFieldValidation(obj, testModel, true)).toThrow('state must be string')
            expect(() => requiredFieldValidation(obj, testModel, () => false)).toThrow('state must be string')
            expect(() => requiredFieldValidation(obj, testModel, /[1-9]*/)).toThrow('state must be string')
        })
        it('should throw error when the state is not a correct option', () => {
            const obj = { id: 'test1', code: '35567', items: [1, 2, 3] }
            expect(() => requiredFieldValidation(obj, testModel, 'test_state')).toThrow('the state is not of the existing options')
        })
        it('should throw error when model doesnt  have a fields property', () => {
            expect(() => requiredFieldValidation({ id: 1 }, { name: 'error' })).toThrow('model must contain fields')
        })
        it('should throw error when field is not a correct type', () => {
            expect(() => requiredFieldValidation({ id: 1 }, { name: 'error', fields: '123' })).toThrow('models fields must be an array with name attribute')
            expect(() => requiredFieldValidation({ id: 1 }, { name: 'error', fields: ['123', 'hello'] })).toThrow('models fields must be an array with name attribute')
            expect(() => requiredFieldValidation({ id: 1 }, { name: 'error', fields: [{ id: 1 }, { id: 2 }] }))
         })
        it('should throw error when model is undefined', () => {
            expect(() => requiredFieldValidation({ id: 1 })).toThrow('model object is required')
        })
        it('should throw error when object is not an object', () => {
            expect(() => requiredFieldValidation('hello')).toThrow('object must be an object type')
            expect(() => requiredFieldValidation(123)).toThrow('object must be an object type')
            expect(() => requiredFieldValidation(true)).toThrow('object must be an object type')
            expect(() => requiredFieldValidation(() => false)).toThrow('object must be an object type')
            expect(() => requiredFieldValidation([1, 2])).toThrow('object must be an object type')
            expect(() => requiredFieldValidation(undefined)).toThrow('object must be an object type')
            expect(() => requiredFieldValidation(null)).toThrow('object must be an object type')

        })
    })

})

describe('REQUIRE TYPE VALIDATIONS', () => {
    it('should return true when all properties are from the require type', () => {
        const obj = { id: '1234', name: 'test', items: [2, 3, 4],count:53 }
        const response = requiredTypeValidation(obj, testModel)
        expect(response).toBe(true)
    })
    it('should return an array of properties that are not from the required properties type ', () => {
        const obj = { id: 123, name: 'test', items: 'list',count:'sg' }
        const response = requiredTypeValidation(obj, testModel)
        expect(response).toBeInstanceOf(Array)
        expect(response.length).toBe(3)
        expect(response).toContain('id')
        expect(response).toContain( 'items')
        expect(response).toContain('count')
        expect(response).not.toContain('name')
        expect(response).not.toContain('code')
    })
    it('should return true when required type are number ,and the value is anumeric string', () => {
        const obj = { id: '1234', name: 'test', code: '2345', items: [2, 3, 4] }
        const response = requiredTypeValidation(obj, testModel)
        expect(response).toBe(true)
    })
    describe('ERRORS', () => {
        it('should throw error when model doesnt  have a fields property', () => {
            expect(() => requiredTypeValidation({ id: 1 }, { name: 'error' })).toThrow('model must contain fields')
        })
        it('should throw error when field is not a correct type', () => {
            expect(() => requiredTypeValidation({ id: 1 }, { name: 'error', fields: '123' })).toThrow('models fields must be an array with name attribute')
            expect(() => requiredTypeValidation({ id: 1 }, { name: 'error', fields: ['123', 'hello'] })).toThrow('models fields must be an array with name attribute')
            expect(() => requiredTypeValidation({ id: 1 }, { name: 'error', fields: [{ id: 1 }, { id: 2 }] })).toThrow('models fields must be an array with name attribute')
        })
        it('should throw error when model is undefined', () => {
            expect(() => requiredTypeValidation({ id: 1 })).toThrow('model object is required')
        })
        it('should throw error when object is not an object', () => {
            expect(() => requiredTypeValidation('hello')).toThrow('object must be an object type')
            expect(() => requiredTypeValidation(123)).toThrow('object must be an object type')
            expect(() => requiredTypeValidation(true)).toThrow('object must be an object type')
            expect(() => requiredTypeValidation(() => false)).toThrow('object must be an object type')
            expect(() => requiredTypeValidation([1, 2])).toThrow('object must be an object type')
            expect(() => requiredTypeValidation(undefined)).toThrow('object must be an object type')
            expect(() => requiredTypeValidation(null)).toThrow('object must be an object type')

        })
    })
})