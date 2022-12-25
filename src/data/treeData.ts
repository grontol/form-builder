import ItemData from "@/data/itemData";

export default class TreeData extends ItemData {
    constructor(name: string, defs: any[]) {
        super({}, null)

        for (const def of defs) {
            this.addChildren(def)
        }
    }

    clone(): TreeData {
        return TreeData.fromTree(this)
    }

    stringify() {
        return JSON.stringify(this.children)
    }

    static fromTree(tree: TreeData): TreeData {
        return new TreeData(tree.name, JSON.parse(tree.stringify()))
    }
}