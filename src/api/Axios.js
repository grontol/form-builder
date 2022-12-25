import axios from "axios";
import Logger from "./Logger";
import {userToken} from "../main";

const createAxios = () => {
    return axios.create({
        baseURL: "https://api.accountingcyclesimulation.com/api/",
    })
}

let Axios = createAxios()

export function _post(url, data) {
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
        .finally(() => {
        })
}

export function _put(url, data) {
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
        .finally(() => {
        })
}

export function _get(url) {
    Logger.d("API GET " + url)

    return Axios.get(url + getToken(), {
        validateStatus: function (status) {
            return true
        }
    }).then(r => {
        return parse(r, "GET " + url)
    })
        .finally(() => {
        })
}

export function _delete(url, data) {
    Logger.d("API DELETE " + url)

    return Axios.delete(url + getToken(), {
        data: data,
        validateStatus: function (status) {
            return true
        }
    }).then(r => {
        return parse(r, "DELETE " + url)
    })
        .finally(() => {
        })
}

function parse(r, text) {
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
    if (userToken)
        return "?token=" + userToken
    else
        return ""
}

export function reloadAxios() {
    Axios = createAxios()
}

export default Axios
