import express, {Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser'
import {Nation} from '../Types/Data.types'
import {deleteNationData, findNationData, getNationData, postNationData, updateNationData} from '../Utils/NationUtils'

const nationRouters = express.Router()
nationRouters.use(bodyParser.json())

//Normal Route
nationRouters.route('/')
.all((req: Request, res: Response, next: NextFunction) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/json')
    next()
})

.get((req: Request, res: Response, next: NextFunction) => {
    const data = getNationData() as Nation[]
    res.json(data)
})

.post((req: Request, res: Response, next: NextFunction) => {
    const data = postNationData(req.body)
    res.json(data)
})

.put((req: Request, res: Response, next: NextFunction) => {
    res.statusCode = 403
    res.end('PUT operation is not supported on /nations')
})

.delete((req: Request, res: Response, next: NextFunction) => {
    res.statusCode = 404
    res.end('404 Not Found')
})

//Param Route
nationRouters.route('/:nationId')
.get((req: Request, res: Response, next: NextFunction) => {
    const data = getNationData() as Nation[]
    const dataIndex = findNationData(parseInt(req.params.nationId))
    res.json(data[dataIndex])
})

.put((req: Request, res: Response, next: NextFunction) => {
    const data = updateNationData(parseInt(req.params.nationId), req.body)
    res.json(data)
})

.delete((req: Request, res: Response, next: NextFunction) => {
    const data = deleteNationData(parseInt(req.params.nationId))
    res.json(data)
})

export default nationRouters;
