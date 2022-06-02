interface ICl1b {
    [key: string]: (server: any, id: string, callback: Function, isApi?: boolean) => void
    get: (server: any, id: string, callback: Function, needsAuth?: boolean) => void
    post: (server: any, id: string, callback: Function, needsAuth?: boolean) => void
    patch: (server: any, id: string, callback: Function, needsAuth?: boolean) => void
    delete: (server: any, id: string, callback: Function, needsAuth?: boolean) => void
    portHook: (port: number) => () => void
}
