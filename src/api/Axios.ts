import axios from "axios";
import Logger from "./Logger";

const createAxios = () => {
    return axios.create({
        baseURL: "http://localhost/simrs/form-builder/Api/",
    })
}

let Axios = createAxios()

export function _post(url: string, data: any) {
    Logger.d("API POST " + url + " with data : ")
    Logger.d(data)

    return Axios.post(url + getToken(), data, {
        validateStatus: function (status) {
            return true
        }
    })
        .then(r => {
            return parse(r, "POST " + url)
        })
}

export function _put(url: string, data: any) {
    Logger.d("API PUT " + url + " with data : ")
    Logger.d(data)

    return Axios.put(url + getToken(), data, {
        validateStatus: function (status) {
            return true
        }
    })
        .then(r => {
            return parse(r, "PUT " + url)
        })
}

export function _get(url: string) {
    Logger.d("API GET " + url)

    return Axios.get(url + getToken(), {
        validateStatus: function (status) {
            return true
        }
    }).then(r => {
        return parse(r, "GET " + url)
    })
}

export function _delete(url: string, data: any) {
    Logger.d("API DELETE " + url)

    return Axios.delete(url + getToken(), {
        data: data,
        validateStatus: function (status) {
            return true
        }
    }).then(r => {
        return parse(r, "DELETE " + url)
    })
}

function parse(r: any, text: string) {
    if (!r.data.success) {
        Logger.e("Error dari API : " + text)
        Logger.e(r.data)
        Logger.e(r.data.message)
        throw r.data
    }
    else {
        Logger.i("Success dari API " + text)
        Logger.i(JSON.parse(JSON.stringify(r.data)))
    }

    if (r.data.token) {
        r.data.data.token = r.data.token
    }

    return r.data.data
}

function getToken() {
    // if (userToken)
    //     return "?token=" + userToken
    // else
        return ""
}

export function reloadAxios() {
    Axios = createAxios()
}

export default Axios
