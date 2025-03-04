const { addOne } = require('../../../services/DB/write')

const fs = require("fs")
const path = require("path")
const { getAll } = require('../../../services/DB/read')


jest.mock('fs')
jest.mock('path')
jest.mock('../../../services/DB/read')

describe('ADD ONE', () => {
    afterEach(() => {
        getAll.mockReset()
        path.join.mockReset()
        fs.existsSync.mockReset()
        fs.writeFileSync.mockReset()
        fs.mkdirSync.mockReset()
    })
    it('should add a new item to an existing data base file', () => {
        const model = 'test-point'
        getAll.mockReturnValue([{ x: 5, y: 7 }])
        fs.existsSync.mockReturnValue(true)
        path.join.mockReturnValue(`/folder/${model}.json`)

        _ = addOne(model, { x: 9, y: 2 })

        expect(getAll).toHaveBeenCalledWith(model)
        expect(fs.existsSync).toHaveBeenCalledWith('C:/data-base-temp')
        expect(fs.mkdirSync).not.toHaveBeenCalled()
        expect(path.join).toHaveBeenCalledWith('C:/data-base-temp', `${model}.json`)
        expect(fs.writeFileSync).toHaveBeenCalledWith(`/folder/${model}.json`, JSON.stringify([{ x: 5, y: 7 }, { x: 9, y: 2 }]))
    })

    it('should insert the first data to the dataBase ', () => {
        const model = 'test-point'
        getAll.mockReturnValue([{ x: 5, y: 7 }])
        fs.existsSync.mockReturnValue(false)
        fs.mkdirSync.mockReturnValue('data-base-temp')
        path.join.mockReturnValue(`/folder/${model}.json`)

        _ = addOne(model, { x: 9, y: 2 })

        expect(getAll).toHaveBeenCalledWith(model)
        expect(fs.existsSync).toHaveBeenCalledWith('C:/data-base-temp')
        expect(fs.mkdirSync).toHaveBeenCalledWith('C:/data-base-temp', { recursive: true })
        expect(path.join).toHaveBeenCalledWith('C:/data-base-temp', `${model}.json`)
        expect(fs.writeFileSync).toHaveBeenCalledWith(`/folder/${model}.json`, JSON.stringify([{ x: 5, y: 7 }, { x: 9, y: 2 }]))
    })
    describe('ERRORS', () => {
        it('should throw error when fs.writeFileSync throws error', () => {
            const model = 'test-point'
            getAll.mockReturnValue([{ x: 5, y: 7 }])
            fs.existsSync.mockReturnValue(true)
            path.join.mockReturnValue(`/folder/${model}.json`)
            fs.writeFileSync.mockImplementation(() => { throw Error('error from mock') })
            expect(() => addOne('test')).toThrow('error from mock')
        })
        it('should throw error when path.join throws error', () => {
            getAll.mockReturnValue([{ x: 5, y: 7 }])
            fs.existsSync.mockReturnValue(true)
            path.join.mockImplementation(() => { throw Error('error from mock') })
            expect(() => addOne('test')).toThrow('error from mock')
        })
        it('should throw error when fs.mkdirsync throws error', () => {
            getAll.mockReturnValue([{ x: 5, y: 7 }])
            fs.existsSync.mockReturnValue(false)
            fs.mkdirSync.mockImplementation(() => { throw Error('error from mock') })
            expect(() => addOne('test')).toThrow('error from mock')
        })
        it('should throw error when getAll throws error', () => {
            getAll.mockImplementation(() => { throw Error('error from mock') })
            expect(() => addOne('test')).toThrow('error from mock')
        })
        it('should throw error when item is undefined', () => {
            // getAll.mockReturnValue([{ x: 5, y: 7 }])
            // expect(()=>addOne('test')).toThrow('item must be defined')
        })
        it('should throw error when model is not a string', () => {
              
        })
    })
})