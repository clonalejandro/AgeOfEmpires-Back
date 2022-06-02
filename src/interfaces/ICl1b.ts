interface ICl1b {
    [key: string]: ((server: any, id: string, callback: Function, isApi?: boolean) => void);
    get: (server: any, id: string, callback: Function, isApi?: boolean) => void;
    post: (server: any, id: string, callback: Function) => void;
    patch: (server: any, id: string, callback: Function) => void;
    delete: (server: any, id: string, callback: Function) => void;
    portHook: (port: number) => (() => void);
}