function dataContainValue(data, value, prop) {
    if(!data)
        throw TypeError('data must be defined')
    // if(!value)
    //     throw TypeError('value must be defined')
    if (!(data instanceof Array)) 
        throw TypeError('data must be instanceof array')

    if(prop)
       return  data.some(item=>item[prop]===value)
    return data.includes(value)
    

}
dataContainValue([3, 5, 3, 6], 0)
module.exports = { dataContainValue }