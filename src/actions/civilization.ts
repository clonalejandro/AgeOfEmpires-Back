export default [
    {
        id: 'civilizations',
        type: 'get',
        callback: (req: any, res: any) =>
            fetch('https://age-of-empires-2-api.herokuapp.com/api/v1/civilizations')
                .then((res) => res.json())
                .then(({ civilizations }) => res.status(200).send(civilizations)),
    },
]
