interface IApp {
    port: {
        http: number,
        https?: number,
    },
    ssl?: {
        key: any,
        cert: any,
    },
}