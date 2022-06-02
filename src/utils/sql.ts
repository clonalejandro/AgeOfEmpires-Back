import mysql from 'mysql'

var connection: mysql.Connection | undefined

export default function create() {
    connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    })

    connection.on('error', (err) => {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            connect()
        } else {
            throw err
        }
    })

    connect()
}

function connect() {
    if (!connection) {
        create()
        return
    }
    connection?.connect((err) => {
        if (err) {
            console.error(err)
            return setTimeout(connect, 2000)
        }
        console.log('Connected to database')
    })
}

export function query(sql: string, args: any = []) {
    return new Promise((resolve, reject) => {
        connection?.query(sql, args, (err, rows) => {
            if (err) return reject(err)
            resolve(rows)
        })
    })
}
