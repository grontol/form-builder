import {_get, _post} from "./Axios";

export default class AuthApi {
    static login(email, password) {
        return _post('login', {
            email,
            password
        })
    }

    static register(data) {
        return _post('register', data)
    }
}