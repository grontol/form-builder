import Vue from "vue";
// @ts-ignore
import FbForm from "../components/containers/FbForm";
// @ts-ignore
import FbPanel from "../components/containers/FbPanel";
// @ts-ignore
import FbPanelTitle from "../components/containers/FbPanelTitle";
// @ts-ignore
import FbPanelBody from "../components/containers/FbPanelBody";
// @ts-ignore
import FbRow from "../components/containers/FbRow";
// @ts-ignore
import FbCol from "../components/containers/FbCol";
// @ts-ignore
import FbFormGroup from "../components/containers/FbFormGroup";
// @ts-ignore
import FbInput from "../components/inputs/FbInput";
// @ts-ignore
import FbLabel from "../components/fb/FbLabel";
import FbLoop from "@/components/fb/FbLoop.vue";

const builtInComponents: any[] = []
const componentProps: any = {}

registerComponent('fb-form', FbForm, "Form")
registerComponent('fb-panel', FbPanel, "Panel")
registerComponent('fb-panel-title', FbPanelTitle, "Panel Title")
registerComponent('fb-panel-body', FbPanelBody, "Panel Body")
registerComponent('fb-row', FbRow, "Row")
registerComponent('fb-col', FbCol, "Col")
registerComponent('fb-form-group', FbFormGroup, "Form Group")

registerComponent('fb-input', FbInput, "Input")
registerComponent('fb-label', FbLabel, "Label")

registerComponent('fb-loop', FbLoop, "Loop")

function registerComponent(name: string, comp: any, label: string) {
    Vue.component(name, comp)
    componentProps[name] = comp.props ?? {}
    builtInComponents.push({
        comp: name,
        label: label
    })
}

export {
    builtInComponents,
    componentProps,
}