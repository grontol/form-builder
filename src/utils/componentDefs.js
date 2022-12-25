import FbForm from "../components/containers/FbForm";
import FbPanel from "../components/containers/FbPanel";
import FbPanelTitle from "../components/containers/FbPanelTitle";
import FbPanelBody from "../components/containers/FbPanelBody";
import FbRow from "../components/containers/FbRow";
import FbCol from "../components/containers/FbCol";
import FbFormGroup from "../components/containers/FbFormGroup";
import FbInput from "../components/inputs/FbInput";
import Vue from "vue";
import FbLabel from "../components/fb/FbLabel";

const builtInComponents = []
const componentProps = {}

registerComponent('fb-form', FbForm, "Form")
registerComponent('fb-panel', FbPanel, "Panel")
registerComponent('fb-panel-title', FbPanelTitle, "Panel Title")
registerComponent('fb-panel-body', FbPanelBody, "Panel Body")
registerComponent('fb-row', FbRow, "Row")
registerComponent('fb-col', FbCol, "Col")
registerComponent('fb-form-group', FbFormGroup, "Form Group")

registerComponent('fb-input', FbInput, "Input")
registerComponent('fb-label', FbLabel, "Label")

function registerComponent(name, comp, label) {
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