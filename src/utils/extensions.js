Array.prototype.removeByItem = function (cb) {
    const index = this.findIndex(cb)

    if (index >= 0)
        this.splice(index, 1)
}

Array.prototype.findRecursive = function (cb) {
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