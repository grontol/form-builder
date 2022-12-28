import {ComponentType, DirType} from "@/data/types";

class ComponentTree {
    isDir: boolean
    id: number
    dirName: string
    fullPath: string
    children: Array<ComponentType>
    dirChildren: Array<ComponentTree>

    constructor(id: number, dirName: string, fullPath: string) {
        this.isDir = true
        this.id = id
        this.dirName = dirName
        this.fullPath = fullPath
        this.children = []
        this.dirChildren = []
    }

    addChild(child: ComponentType) {
        this.children.push(child)
    }

    addDirChild(child: ComponentTree) {
        this.dirChildren.push(child)
    }

    static fromData({ dirs, components }: { dirs: DirType[], components: ComponentType[] }) {
        const root = new ComponentTree(0, "Root", "Root")
        const dirTree: ComponentTree[] = []

        const cComps = components.filter(x => x.dir.trim().length === 0)

        for (const cComp of cComps) {
            root.addChild(cComp)
        }

        // Assign all components to their directory
        for (const dir of dirs.filter(x => splitDirPath(x.path).length > 0)) {
            const paths = splitDirPath(dir.path)

            const cTree = new ComponentTree(dir.id, paths[paths.length - 1], dir.path)
            const cComps = components.filter(x => x.dir === dir.path)

            for (const cComp of cComps) {
                cTree.addChild(cComp)
            }

            dirTree.push(cTree)
        }

        for (const d of dirTree) {
            const paths = splitDirPath(d.fullPath)
            paths.pop()

            const parentPath = paths.join('/')
            const parentDir = dirTree.find(x => x.fullPath === parentPath)

            if (parentDir)
                parentDir.addDirChild(d)
            else
                root.addDirChild(d)
        }

        return root
    }
}

function splitDirPath(dir: string): string[] {
    return dir.split("/").filter(x => x.trim().length > 0)
}

export default ComponentTree