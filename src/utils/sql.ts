import mysql from 'mysql'

var connection: mysql.Connection

export default function create(){ 
    const config = {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE, 
    }

    connection = mysql.createConnection(config)
    console.log('Database linked!', config)

    connection.on('error', err => {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            connect()
        } else {
            throw err
        }
    })
}

function connect(){
    if (!connection) {
        create()
    }
    connection.connect(err => {
        if (err) {
            console.error(err)
            return setTimeout(connect, 2000)
        }
        console.log('Connected to database')
    })
}

function end(){
    connection.end()
    console.log('Connection to database ended')
}

export function query(sql: string, args: any = []){
    return new Promise((resolve, reject) => {
        connect()
        connection.query(sql, args, (err, rows) => {
            if (err) return reject(err)
            resolve(rows)
        })
        end()
    })
}