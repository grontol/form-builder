export default class PrefManager {
    static setLeftWidth(val) {
        localStorage.setItem('fb-setting-left-width', val)
    }

    static getLeftWidth(def) {
        const v = localStorage.getItem('fb-setting-left-width')
        return v ? parseInt(v) : def
    }

    static setRightWidth(val) {
        localStorage.setItem('fb-setting-right-width', val)
    }

    static getRightWidth(def) {
        const v = localStorage.getItem('fb-setting-right-width')
        return v ? parseInt(v) : def
    }

    static setAppState(val) {
        localStorage.setItem('fb-app-state', JSON.stringify(val))
    }

    static getAppState(def) {
        const v = localStorage.getItem('fb-app-state')
        return v ? JSON.parse(v) : def
    }
}