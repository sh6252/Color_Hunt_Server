require('dotenv').config()
const fs = require('fs')
const { join } = require('path')

const { LOGGER_URL = "H:\\תכנות ו תשפה\\קבוצה ו-2\\Shifi Lemberger\\שונות\\data-base\\color_hunt",
    LOGGER_FILE = "logger.log" } = process.env


function writeToLog(data) {
    try {
        if (!fs.existsSync(LOGGER_URL)) {
            fs.mkdirSync(LOGGER_URL, { recursive: true })
        }
        const filePath = join(LOGGER_URL, LOGGER_FILE)
        fs.appendFileSync(filePath, JSON.stringify(data)+'\n')
        return true
    }
    catch (error) {
        throw error
    }
}

module.exports = { writeToLog }