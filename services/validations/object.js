const modelState = {
    INSERT: 'insert', UPDATE: 'update', DELETE: 'delete'
}
function validateModel(model) {
    if (!(model.fields instanceof Array))
        return false
    return model.fields.every(item => item.name && typeof item.name === 'string')
}
/*
the function get an object a model and a state and checks if the object has all the required properties
the function returns true when the object is valid
the function returns an array of missing propeties when the object is not valid
*/
function requiredFieldValidation(obj, model, state = 'insert') {
    if (!obj || ['number', 'string', 'boolean'].includes(typeof obj) || [Array, RegExp, Function].some(t => obj instanceof t))
        throw TypeError('object must be an object type')
    if (typeof state != 'string') 
        throw TypeError('state must be string')
    if (!Object.values(modelState).includes(state)) 
        throw Error('the state is not of the existing options')
    if (!model) 
        throw Error('model object is required')
    if (Object.keys(model).find(key => key === 'fields') === undefined)
        throw Error('model must contain fields')
    if (!validateModel(model))
        throw Error('models fields must be an array with name attribute')
    const req = model.fields.filter(t => t.require[state])
    const ans = req.filter(t => !Object.keys(obj).includes(t.name))
    if (ans.length === 0) 
        return true
    return ans.map(t => t.name)
}
/*
the function get an object and model and checks if the object properties are from the required type
the function returns true when the object is valid
the function returns an array of property names that don't have the required type when the object is not valid
*/
function requiredTypeValidation(obj, model) {
    if (!obj || ['number', 'string', 'boolean'].includes(typeof obj) || [Array, RegExp, Function].some(t => obj instanceof t))
        throw TypeError('object must be an object type')
    if (!model)
        throw TypeError('model object is required')
    if (Object.keys(model).find(key => key === 'fields') === undefined)
        throw Error('model must contain fields')
    if (!validateModel(model))
        throw Error('models fields must be an array with name attribute')
    const keysObj = Object.entries(obj)
    const keysModel = model.fields.map(t => t = { name: t.name, type: t.type })
    const ans = keysObj.filter(t => !((keysModel.find(k => k.name == t[0]).type instanceof Function && keysModel.find(k => k.name == t[0]).type(t[1]))
        || (typeof keysModel.find(k => k.name == t[0]).type === 'string' && typeof t[1] === keysModel.find(k => k.name == t[0]).type)))
        
    if (ans.length===0)
        return true
    return ans.map(t => t[0])
}
module.exports = { requiredFieldValidation, requiredTypeValidation, modelState }
