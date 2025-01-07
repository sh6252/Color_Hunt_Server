const fs=require('fs')
const path=require('path')
require('dotenv').config()

// הספריה שמטפלת ב env
//env:
//שומר משתני סביבה
//שומר סיסמאות/נתונים מוצפנים שלא עולים ב גיט אלא נמצאים בדיסק המקומי
//config מוציא את הנתונים מהenv

const {DATA_BASE_PATH='C:/data-base-temp'}=process.env

function getAll(model) {
    
    try {
        const filePath=path.join(DATA_BASE_PATH,`${model}.json`)
        if(!fs.existsSync(filePath))
            return []
        const data=fs.readFileSync(filePath)
        const list=JSON.parse(list)
        if(Array.isArray(list)){
            return list
        }
        else{
            throw Error (`the data in ${filePath} is corrupt`)
        }
        
    }
    catch (err) {
        throw err
    }
}

function getByCondition(model, condition) {

}

module.exports = { getAll, getByCondition }