import TreeData from "@/data/treeData";

export default class PrefManager {
    static setLeftWidth(val: number) {
        localStorage.setItem('fb-setting-left-width', val.toString())
    }

    static getLeftWidth(def: number) {
        const v = localStorage.getItem('fb-setting-left-width')
        return v ? parseInt(v) : def
    }

    static setRightWidth(val: number) {
        localStorage.setItem('fb-setting-right-width', val.toString())
    }

    static getRightWidth(def: number) {
        const v = localStorage.getItem('fb-setting-right-width')
        return v ? parseInt(v) : def
    }

    static setUiState(val: any) {
        localStorage.setItem('fb-setting-ui-state', JSON.stringify(val))
    }

    static getUiState(def: any) {
        const v = localStorage.getItem('fb-setting-ui-state')
        return v ? JSON.parse(v) : def
    }

    static setAppState(val: TreeData) {
        localStorage.setItem('fb-app-state', val.stringify())
    }

    static getAppState(def: any) {
        const v = localStorage.getItem('fb-app-state')
        return v ? JSON.parse(v) : def
    }
}