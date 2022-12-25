import { _get } from "./Axios";

export default class InfoApi {
    static getUser() {
        return _get('info/user')
    }

    static getHistory() {
        return _get('info/history')
    }

    static getCurrentScene(companyId) {
        return _get('info/scene/' + companyId)
    }

    static getCurrentOffice() {
        return _get('info/office')
    }

    static getSummary(companyId) {
        return _get('info/summary/' + companyId)
    }

    static resetTransaction(companyId) {
        return _get('info/reset_scene/' + companyId)
    }
}