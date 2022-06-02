const cl1b: ICl1b = {
    get: (server: any, id: string, callback: Function, isApi: boolean = true) =>
        !isApi ? server.get(id, callback) : server.get(`/api/${id}`, callback),
    post: (server: any, id: string, callback: Function) => server.post(`/api/${id}`, callback),
    patch: (server: any, id: string, callback: Function) => server.patch(`/api/${id}`, callback),
    delete: (server: any, id: string, callback: Function) => server.delete(`/api/${id}`, callback),
    portHook: (port: number): (() => void) => () => console.log(`Backend is up listening the port ${port} 🎨`),
}

export default cl1b
