import * as esprima from 'esprima'

function findVariable(s: string): { name: string, startIndex: number, endIndex: number }[] {
    let inVar = false
    const ar: { name: string, startIndex: number, endIndex: number }[] = []
    let cur = ""
    let startIndex = -1
    let endIndex = -1

    for (let a = 0; a < s.length; a++) {
        if (s.charAt(a) === '{' && s.charAt(a + 1) === '{') {
            if (inVar)
                throw "Invalid variable syntax"

            startIndex = a
            inVar = true
            a++
        }
        else if (s.charAt(a) === '}' && s.charAt(a + 1) === '}') {
            if (!inVar)
                throw "Invalid variable syntax"

            inVar = false
            a++
            endIndex = a + 1

            ar.push({
                name: cur.trim(),
                startIndex,
                endIndex,
            })

            cur = ""
        }
        else if (inVar) {
            cur += s.charAt(a)
        }
    }

    if (inVar)
        throw "Unclosed variable name"

    return ar
}

function isValidExpression(s: string): string | null {
    try {
        const res = esprima.parseScript(s)

        if (res.body.length > 1) {
            return "Only single expression allowed"
        }

        if (res.body.length === 1) {
            if (res.body[0].type !== 'ExpressionStatement') {
                return "Not expression"
            }
        }

        return null
    }
    catch (e) {
        console.log("Error ", e.message)
        return "Error : " + e.message
    }
}

export {
    findVariable,
    isValidExpression,
}