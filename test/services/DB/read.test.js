const { getAll, getByCondition } = require("../../../services/DB/read")

const fs = require("fs")
const path = require("path")
// const Array=require('Array')


jest.mock('fs')
jest.mock('path')
// jest.mock('JSON')


describe('GET ALL', () => {
    afterEach(() => {
        path.join.mockReset()
        fs.existsSync.mockReset()
        fs.readFileSync.mockReset()
      
    })
    it('should return an array with data from the data base', () => {
        const modelName = 'test'
        path.join.mockReturnValue(`/folder/${modelName}.json`)
        fs.existsSync.mockReturnValue(true)
        fs.readFileSync.mockReturnValue(JSON.stringify([{ id: 1, name: 'test' }]))

        const response = getAll(modelName)
        expect(response).toEqual([{ id: 1, name: 'test' }])
        expect(path.join).toHaveBeenCalledWith('C:/data-base-temp', `${modelName}.json`)
        expect(fs.existsSync).toHaveBeenCalledWith(`/folder/${modelName}.json`)
        expect(fs.readFileSync).toHaveBeenCalledWith(`/folder/${modelName}.json`)
    })
    it('shoult return an empty array when the path doesnt exist', () => {
        const modelName = 'test'
        path.join.mockReturnValue(`/folder/${modelName}.json`)
        fs.existsSync.mockReturnValue(false)

        const response = getAll(modelName)
        expect(response).toEqual([])
        expect(path.join).toHaveBeenCalledWith('C:/data-base-temp', `${modelName}.json`)
        expect(fs.existsSync).toHaveBeenCalledWith(`/folder/${modelName}.json`)
    })
    describe('ERRORS', () => {

        it('should throw error when the data in the file is not an array', () => {
            const modelname = 'test'
            fs.existsSync.mockReturnValue(true)
            fs.readFileSync.mockReturnValue(JSON.stringify({ id: 2, name: 'test' }))
            path.join.mockReturnValue(`/folder/${modelname}.json`)

            expect(() => getAll(modelname).toThrow(`the data in /folder/${modelname}.json is corrupt`))

        })
        it('should throw error when the file contains corrupt json data', () => {
            const modelname = 'test'
            path.join.mockReturnValue(`/folder/${modelname}.json`)
                fs.existsSync.mockReturnValue(true)
                fs.readFileSync.mockReturnValue(JSON.stringify("hello") )
               
            expect(()=>getAll(modelname)).toThrow(`the data in /folder/${modelname}.json is corrupt`)
        })
        it('should throw error when path.join throws error', () => {
            path.join.mockImplementation(() => { throw Error('error from mock') })
            expect(() => getAll('test')).toThrow('error from mock')
        })
        it('should throw error when fs.readFileSync throws error', () => {
            path.join.mockReturnValue('C:/data-base-temp/test.json')
            fs.existsSync.mockReturnValue(true)
            fs.readFileSync.mockImplementation(() => { throw Error('error from mock') })
            expect(() => getAll('test')).toThrow('error from mock')
        })
        it('shoult throw error when the model is not a string', () => {
            expect(() => getAll(45)).toThrow('the model must be string')
        })
    })
})

describe('GET BY CONDITION', () => {
    const pointList = [{ x: 2, y: 7 }, { x: 9, y: 4 }, { x: 6, y: 3 }, { x: 2, y: 5 }, { x: 8, y: 8 }]
    it('should return the data that correspons with the condition', () => {
        fs.existsSync.mockReturnValue(true)
        fs.readFileSync.mockReturnValue(JSON.stringify(pointList))

        const response = getByCondition('test', { x: 2 })

        expect(response).toEqual([{ x: 2, y: 7 }, { x: 2, y: 5 }])
    })
    it('should return all the data when condition is undefined', () => {
        fs.existsSync.mockReturnValue(true)
        fs.readFileSync.mockReturnValue(JSON.stringify(pointList))

        const response = getByCondition('test')

        expect(response).toEqual([{ x: 2, y: 7 }, { x: 9, y: 4 }, { x: 6, y: 3 }, { x: 2, y: 5 }, { x: 8, y: 8 }])
    })
    it('should return an empty array when no data correspons to the condition', () => {
        fs.existsSync.mockReturnValue(true)
        fs.readFileSync.mockReturnValue(JSON.stringify(pointList))

        const response = getByCondition('test', { x: 1 })

        expect(response).toEqual([])
    })
    describe('ERROR', () => {
        it('should throw error when getAll throws error', () => {
             
               expect(()=>getByCondition(65675,{x:6})).toThrow('get all throw error')
        })
        it('should throw error when condition is not an object', () => {
            expect(() => getByCondition('test', 123)).toThrow('the condition must be Object')
        })
    })
})
