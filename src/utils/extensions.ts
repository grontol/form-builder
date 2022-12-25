interface Array<T> {
    removeByItem: (cb: (x: any) => boolean) => void
    findRecursive: (cb: (x: any) => boolean) => T | null
}

Array.prototype.removeByItem = function (cb: (x: any) => boolean) {
    const index = this.findIndex(cb)

    if (index >= 0)
        this.splice(index, 1)
}

Array.prototype.findRecursive = function (cb: (x: any) => boolean) {
    const item = this.find(cb)

    if (item)
        return item

    for (const c of this) {
        if (c.children) {
            const item = c.children.findRecursive(cb)

            if (item)
                return item
        }
    }

    return null
}