interface ComponentType {
    id: number
    name: string
    dir: string
    definition: string
    compiled: string
    owner: string
}

interface DirType {
    id: number
    path: string
}

export {
    ComponentType,
    DirType,
}