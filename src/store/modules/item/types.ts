import ItemData from "@/data/itemData";
import TreeData from "@/data/treeData";

export interface ItemState {
    stateIndex: number,

    history: TreeData[],
    historyIndex: number,

    tree: TreeData,

    activeItem: ItemData | null,
    hoveredItem: ItemData | null,
    draggedItem: ItemData | null,

    selectedItems: ItemData[],
    clipboardItems: ItemData[],

    treeComps: any[],
    viewComps: any[],

    isCtrl: boolean,
    isShift: boolean,
}