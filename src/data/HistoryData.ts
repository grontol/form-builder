import TreeData from "@/data/treeData";

export default class HistoryData {
    private _undoes: TreeData[] = []
    private _redoes: TreeData[] = []
    private _current: TreeData

    constructor(current: TreeData = new TreeData("Root", [])) {
        this._current = current
    }


    public add(tree: TreeData) {
        this._undoes.push(tree)
        this._redoes = []
    }

    public undo(): TreeData {
        const res = this._undoes.pop()

        if (!res)
            throw "Cannot undo"

        this._redoes.push(this._current)
        this._current = res

        return res
    }

    public redo(): TreeData {
        const res = this._redoes.pop()

        if (!res)
            throw "Cannot redo"

        this._undoes.push(this._current)
        this._current = res

        return res
    }

    public get canUndo(): boolean {
        return this._undoes.length > 0
    }

    public get canRedo(): boolean {
        return this._redoes.length > 0
    }

    public get count(): number {
        return this._undoes.length + this._redoes.length
    }

    public get current(): TreeData {
        return this._current
    }
}