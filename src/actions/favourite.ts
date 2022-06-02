import { query } from '../utils/sql'

export default [
    {
        id: 'favourite',
        type: 'get',
        callback: (req: any, res: any) => {
            const { id, user_id }: IFavourite = req.query

            if (!user_id) {
                query('SELECT * FROM favourites WHERE id = ?', [id])
                    .then((rows) => res.status(200).send(rows))
                    .catch((err) => res.status(500).send(err))
            } else {
                query('SELECT * FROM favourites WHERE user_id = ?', [user_id])
                    .then((rows) => res.status(200).send(rows))
                    .catch((err) => res.status(500).send(err))
            }
        },
    },
    {
        id: 'favourite',
        type: 'post',
        callback: (req: any, res: any) => {
            const { user_id, civilization_id }: IFavourite = req.body
            query('SELECT * FROM favourites WHERE user_id = ?', [user_id])
                .then((rows: any) => {
                    if (rows.length < 3) {
                        query('INSERT INTO favourites (user_id, civilization_id) VALUES (?, ?)', [
                            user_id,
                            civilization_id,
                        ])
                            .then((row) => res.status(200).send(row))
                            .catch((err) => res.status(500).send(err))
                    } else res.status(500).send('Reached maximum number of favourites')
                })
                .catch((err) => {
                    console.log(err)
                })
        },
    },
    {
        id: 'favourite',
        type: 'delete',
        callback: (req: any, res: any) => {
            const { user_id, civilization_id }: IFavourite = req.body
            query('DELETE FROM favourites WHERE user_id = ? AND civilization_id = ?', [user_id, civilization_id])
                .then((row) => res.status(200).send(row))
                .catch((err) => res.status(500).send(err))
        },
    },
]
