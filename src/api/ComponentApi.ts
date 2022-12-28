import {_get, _post} from "@/api/Axios";

export default class ComponentApi {
    static getAllComponents() {
        return _get('components')
    }

    static saveComponent(comp: any) {
        return _post('save_component', comp)
    }

    static updateComponent(comp: any) {
        return _post('update_component', comp)
    }
}