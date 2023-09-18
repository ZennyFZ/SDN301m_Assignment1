import express, {Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser'
import { Player } from '../Types/Data.types'
import { getPlayerData, postPlayerData, updatePlayerData, deletePlayerData, findPlayerId } from '../Utils/PlayerUtils'

const playerRouters = express.Router()
playerRouters.use(bodyParser.json())

//Normal Route
playerRouters.route('/')
.all((req: Request, res: Response, next: NextFunction) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/json')
    next()
})

.get((req: Request, res: Response, next: NextFunction) => {
    const data = getPlayerData() as Player[]
    res.json(data)
})

.post((req: Request, res: Response, next: NextFunction) => {
    const data = postPlayerData(req.body)
    res.json(data)
})

.put((req: Request, res: Response, next: NextFunction) => {
    res.statusCode = 403
    res.end('PUT operation is not supported on /players')
})

.delete((req: Request, res: Response, next: NextFunction) => {
    res.statusCode = 404
    res.end('404 Not Found')
})

//Param Route
playerRouters.route("/:playerId")
.get((req: Request, res: Response, next: NextFunction) => {
    const data = getPlayerData() as Player[]
    const dataIndex = findPlayerId(parseInt(req.params.playerId))
    res.json(data[dataIndex])
})

.put((req: Request, res: Response, next: NextFunction) => {
    const data = updatePlayerData(parseInt(req.params.playerId), req.body)
    res.json(data)
})

.delete((req: Request, res: Response, next: NextFunction) => {
    const data = deletePlayerData(parseInt(req.params.playerId))
    res.json(data)
})

export default playerRouters