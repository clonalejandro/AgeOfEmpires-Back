import passport from "passport"

const cl1b: ICl1b = {
    get: (server: any, id: string, callback: Function, needsAuth: boolean = false) =>
        needsAuth ? server.get(`/api/${id}`, passport.authenticate('jwt', {session: false}), callback) : server.get(`/api/${id}`, callback),
    post: (server: any, id: string, callback: Function, needsAuth: boolean = false) => 
        needsAuth ? server.post(`/api/${id}`, passport.authenticate('jwt', {session: false}), callback) : server.post(`/api/${id}`, callback),
    patch: (server: any, id: string, callback: Function, needsAuth: boolean = false) => 
        needsAuth ? server.patch(`/api/${id}`, passport.authenticate('jwt', {session: false}), callback) : server.patch(`/api/${id}`, callback),
    delete: (server: any, id: string, callback: Function, needsAuth: boolean = false) => 
        needsAuth ? server.delete(`/api/${id}`, passport.authenticate('jwt', {session: false}), callback) : server.delete(`/api/${id}`, callback),
    portHook: (port: number): (() => void) => () => console.log(`Backend is up listening the port ${port} 🎨`),
}

export default cl1b
