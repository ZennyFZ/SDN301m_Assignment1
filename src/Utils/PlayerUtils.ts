import fs from 'fs'
import { Player } from '../Types/Data.types'

const playerDataPath = './src/Data/Players.json'

const getPlayerData = () => {
    const data = fs.readFileSync(playerDataPath, 'utf-8')
    return JSON.parse(data)
}

const postPlayerData = (player: Player) => {
    const data = getPlayerData() as Player[]
    player.id = findLastPlayerId() + 1
    data.push(player)
    fs.writeFileSync(playerDataPath, JSON.stringify(data))
    return data
}

const findLastPlayerId = () => {
    const data = getPlayerData() as Player[]
    const lastPlayer = data[data.length-1]
    return lastPlayer.id
}

const findPlayerId = (playerId: number) => {
    const data = getPlayerData() as Player[]
    const playerIndex = data.findIndex(data => data.id === playerId)
    return playerIndex
}

const updatePlayerData = (playerId: number, newPlayer: Player) => {
    const playerIndex = findPlayerId(playerId)
    if(playerIndex != -1){
        const data = getPlayerData() as Player[]
        const player = data[playerIndex]
        player.name = newPlayer.name
        player.age = newPlayer.age
        fs.writeFileSync(playerDataPath, JSON.stringify(data))
        return data
    }else{
        return "Player Not Found"
    }
}

const deletePlayerData = (playerId: number) => {
    const playerIndex = findPlayerId(playerId)
    if(playerIndex != -1){
        const data = getPlayerData() as Player[]
        data.splice(playerIndex, 1)
        fs.writeFileSync(playerDataPath, JSON.stringify(data))
        return data
    }else{
        return "Player Not Found"
    }
}

export {getPlayerData, postPlayerData, findPlayerId, updatePlayerData, deletePlayerData}