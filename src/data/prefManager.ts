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

    static setAppState(val: any) {
        localStorage.setItem('fb-app-state', JSON.stringify(val))
    }

    static getAppState(def: any) {
        const v = localStorage.getItem('fb-app-state')
        return v ? JSON.parse(v) : def
    }
}