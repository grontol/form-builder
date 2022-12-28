import HistoryData from "@/data/HistoryData";
import FileData from "@/data/FileData";

export interface ItemState {
    stateIndex: number,

    files: FileData[],
    activeFile: FileData | null,

    treeComps: any[],
    viewComps: any[],

    isCtrl: boolean,
    isShift: boolean,
}