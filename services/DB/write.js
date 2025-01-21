const { getAll } = require('./read')
const path = require('path')
const fs = require('fs')
require('dotenv').config()

const { DATA_BASE_PATH = 'C:/data-base-temp' } = process.env


function addOne(model, item={}) {
    try {
       
        let collection = getAll(model)
        if(item==undefined){
            throw Error ('item must be defined')
        }
        collection.push(item)
        if (!fs.existsSync(DATA_BASE_PATH)) {
            fs.mkdirSync(DATA_BASE_PATH, { recursive: true })
        }
        const filePath = path.join(DATA_BASE_PATH, `${model}.json`)
        fs.writeFileSync(filePath, JSON.stringify(collection))
    }
    catch (error) {
        throw error
    }

}
module.exports = { addOne }