import Vue from "vue";

let curItemIndex = 1

const createId = (index: number) => {
    return "comp-" + index
}

class ItemData {
    name: string
    compName: string
    comp: string
    parent: ItemData | null
    id: string
    index: number
    level: number
    expanded: boolean
    children: ItemData[]
    props: any
    isComp: boolean

    constructor(defs: any, parent: ItemData | null = null) {
        this.name = defs.name
        this.compName = defs.compName
        this.comp = defs.comp
        this.parent = parent
        this.id = createId(curItemIndex)
        this.index = curItemIndex++
        this.level = parent ? parent.level + 1 : 1
        this.expanded = defs.expanded
        this.children = []
        this.props = defs.props
        this.isComp = defs.isComp

        if (defs.children) {
            for (const c of defs.children) {
                this.addChildren(c)
            }
        }

        this.makeReactive()
    }

    addChildren(defs: any) {
        this.children.push(new ItemData(defs, this))
    }

    makeReactive() {
        for (const prop in this) {
            Vue.set(this, prop, this[prop])
        }
    }

    removeSelf() {
        if (!this.parent)
            return

        this.parent.removeItem(this)
    }

    removeItem(item: ItemData) {
        this.children.removeByItem(x => x.id === item.id)
    }

    findRecursive(cb: (x: any) => boolean) {
        return this.children.findRecursive(cb)
    }
}

export default ItemData