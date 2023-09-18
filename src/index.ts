import express, {Express} from 'express'
import bodyParser from 'body-parser'
import http from 'http'

import nationRouters from './Routers/nationRouters'
import playerRouters from './Routers/playerRouters'

const hostname = "localhost"
const port = 5000
const app : Express = express()

app.use(bodyParser.json());
app.use('/nations', nationRouters)
app.use('/players', playerRouters)

const server = http.createServer(app)
server.listen(port, hostname, () => {
    console.log(`server is running at ${hostname}:${port}`)
})

