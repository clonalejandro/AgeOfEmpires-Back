import express from 'express'
import http from 'http'
import cors from 'cors'
import setAuth from './utils/auth'
import cl1b from './cl1b'
import actions from './actions'
import initSql from './utils/sql'
const server = express()
const app: IApp = {
    port: {
        http: 3000,
    },
}

//TODO: Make a ratelimit
server.use(cors())
server.use(express.urlencoded({ extended: true }))
server.use(express.json())

initSql()
setAuth(server)

actions.forEach((action: IAction) => {
    const handler = cl1b[action.type.toLowerCase()]
    if (!handler) {
        throw new Error(`Action ${action.type} is not supported`)
    }
    handler(server, action.id, action.callback, action.needsAuth)
})

http.createServer(server).listen(app.port.http, cl1b.portHook(app.port.http))
