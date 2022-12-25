import {builtInComponents, componentProps} from "./componentDefs";

function createComponentByName(name: string) {
    const compProps = componentProps[name]
    const compLabel = builtInComponents.find(x => x.comp === name)

    if (!compProps) {
        console.error("Cannot get component props by name : " + name)
        return null
    }

    if (!compLabel) {
        console.error("Cannot get component label by name : " + name)
        return null
    }

    return {
        name: compLabel.label,
        compName: compLabel.label,
        comp: name,
    }
}

export {
    createComponentByName
}