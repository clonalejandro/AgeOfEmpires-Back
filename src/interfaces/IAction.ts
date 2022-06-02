interface IAction {
    id: string
    type: string
    callback: (req: any, res: any) => void
}