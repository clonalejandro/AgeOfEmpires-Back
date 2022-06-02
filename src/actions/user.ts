import { query } from '../utils/sql'
import encrypt from '../utils/encrypt'

export default [
    {
        id: 'user',
        type: 'post',
        callback: (req: any, res: any) => {
            const { username, password }: IUser = req.body

            query('INSERT INTO users (username, password) VALUES (?, ?)', [username, encrypt(password)])
                .then((row) => res.status(200).send(row))
                .catch((err) => res.status(500).send(err))
        },
    },
]
