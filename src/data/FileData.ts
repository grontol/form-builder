import TreeData from "@/data/treeData";
import ItemData from "@/data/itemData";
import HistoryData from "@/data/HistoryData";

export default class FileData {
    private readonly _name: string
    private readonly _history: HistoryData

    private _activeItem: ItemData | null = null
    private _hoveredItem: ItemData | null = null
    private _draggedItem: ItemData | null = null

    private _selectedItems: ItemData[] = []
    private _clipboardItems: ItemData[] = []

    private _unsaved = false

    constructor(name: string, defs: any[] = []) {
        this._name = name
        this._history = new HistoryData(new TreeData(name, defs))
    }

    public clearSelectedItems() {
        this._selectedItems = []
    }

    public clearClipboardItems() {
        this._clipboardItems = []
    }

    public undo() {
        this._history.undo()
        this._activeItem = this._history.current.findRecursive(x => x.id === this._activeItem?.id)
    }

    public redo() {
        this._history.redo()
        this._activeItem = this._history.current.findRecursive(x => x.id === this._activeItem?.id)
    }

    public save() {
        const link = document.createElement('a')
        const blob = new Blob([this._history.current.stringify()], { type: 'text/plain' })
        link.href = URL.createObjectURL(blob)
        link.download = this._name + '.json'
        link.click()
        URL.revokeObjectURL(link.href)
    }

    public get name(): string {
        return this._name
    }

    public get history(): HistoryData {
        return this._history
    }

    public get tree(): TreeData {
        return this._history.current
    }

    public get activeItem(): ItemData | null {
        return this._activeItem
    }

    public set activeItem(value: ItemData | null) {
        this._activeItem = value
    }

    public get hoveredItem(): ItemData | null {
        return this._hoveredItem
    }

    public set hoveredItem(value: ItemData | null) {
        this._hoveredItem = value
    }

    public get draggedItem(): ItemData | null {
        return this._draggedItem
    }

    public set draggedItem(value: ItemData | null) {
        this._draggedItem = value
    }

    public get selectedItems(): ItemData[] {
        return this._selectedItems
    }

    public set selectedItems(items: ItemData[]) {
        this._selectedItems = items
    }

    public get clipboardItems(): ItemData[] {
        return this._clipboardItems
    }

    public set clipboardItems(items: ItemData[]) {
        this._clipboardItems = items
    }

    public get unsaved(): boolean {
        return this._unsaved
    }

    public set unsaved(val: boolean) {
        this._unsaved = val
    }
}