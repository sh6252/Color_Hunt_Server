const fs = require('fs')
const path = require('path')
require('dotenv').config()

// הספריה שמטפלת ב env
//env:
//שומר משתני סביבה
//שומר סיסמאות/נתונים מוצפנים שלא עולים ב גיט אלא נמצאים בדיסק המקומי
//config מוציא את הנתונים מהenv

const { DATA_BASE_PATH = 'C:/data-base-temp' } = process.env

function getAll(model) {

    try {
        if(!model instanceof String){
            throw Error('the model must be string')
        }
        const filePath = path.join(DATA_BASE_PATH, `${model}.json`)
        if (!fs.existsSync(filePath))
            return []
        const data = fs.readFileSync(filePath)
        const list = JSON.parse(data)
        if (Array.isArray(list)) {
            return list
        }
        else {
            throw Error(`the data in ${filePath} is corrupt`)
        }
    }
    catch (err) {
        throw err
    }
}

function getByCondition(model, condition) {
    try {
        if(!condition instanceof Object){
            throw Error ('the condition must be Object')
        }
        const collection = getAll(model)
        if (condition) {
            const response = collection.filter(item => Object.entries(condition).every(([key, value]) => item[key] && item[key] === value))
            return response
        }
        else
            return collection
    }
    catch (error) {
        throw error
    }

}

module.exports = { getAll, getByCondition }