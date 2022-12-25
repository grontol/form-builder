const LOG_ENABLED = true

export default class Logger {
    static d(message) {
        if (LOG_ENABLED)
            console.log(message)
    }

    static i(message, tenger = null) {
        if (LOG_ENABLED) {
            if (tenger)
                console.log(tenger)

            console.info(message)
        }
    }

    static w(message) {
        if (LOG_ENABLED)
            console.warn(message)
    }

    static e(message) {
        if (LOG_ENABLED)
            console.error(message)
    }
}