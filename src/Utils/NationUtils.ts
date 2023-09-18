import fs from 'fs'
import { Nation } from '../Types/Data.types'

const nationDataPath = './src/Data/Nations.json'

const getNationData = () => {
    const nationData = fs.readFileSync(nationDataPath, 'utf-8')
    return JSON.parse(nationData)
}

const postNationData = (nation: Nation) => {
    const data = getNationData() as Nation[]
    nation.id = findLastNationId() + 1
    data.push(nation)
    fs.writeFileSync(nationDataPath, JSON.stringify(data))
    return data
}

const findLastNationId = () => {
    const data = getNationData() as Nation[]
    const lastNation = data[data.length - 1]
    return lastNation.id
}

const findNationData = (nationId: number) => {
    const data = getNationData() as Nation[]
    const nationIndex = data.findIndex(nation => nation.id === nationId)
    return nationIndex
}

const updateNationData = (nationId: number, newNation: Nation) => {
    const nationIndex = findNationData(nationId)
    if(nationIndex != -1) {
        const data = getNationData() as Nation[]
        const nation = data[nationIndex]
        nation.country = newNation.country
        nation.code = newNation.code
        fs.writeFileSync(nationDataPath, JSON.stringify(data))
        return data
    }else{
        return 'Nation not found'
    }
}

const deleteNationData = (nationId: number) => {
    const nationIndex = findNationData(nationId)
    if(nationIndex != -1) {
        const data = getNationData() as Nation[]
        data.splice(nationIndex, 1)
        fs.writeFileSync(nationDataPath, JSON.stringify(data))
        return data
    }else{
        return 'Nation not found'
    }
}

export {getNationData, postNationData, findNationData, updateNationData, deleteNationData}