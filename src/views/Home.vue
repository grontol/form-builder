<template>
    <div id="fb-main" class="vertical-flex" @mousemove="mouseMove" @mouseup="mouseUp">
        <MenuBar class="fb-root-el"></MenuBar>

        <div class="horizontal-flex flex-fill" style="overflow: hidden">
            <StripBar class="fb-root-el"></StripBar>

            <TreeView class="fb-root-el" id="tree-view" :style="'width:' + leftWidth + 'px'" v-show="showHierarchy"></TreeView>
            <div class="divider" @mousedown="leftDividerDown"></div>

            <div class="vertical-flex flex-fill">
                <EditorTab class="fb-root-el"></EditorTab>
                <ContentView class="flex-fill"></ContentView>
            </div>

            <div class="divider" @mousedown="rightDividerDown"></div>

            <Properties class="fb-root-el" id="properties" :style="'width:' + rightWidth + 'px'" v-show="showProperties"></Properties>
            <ComponentPropsEditor class="fb-root-el" id="comp-props-editor" :style="'width:' + rightWidth + 'px'" v-show="showCompPropsEditor"></ComponentPropsEditor>

            <StripBarRight class="fb-root-el"></StripBarRight>
        </div>

        <StatusBar class="fb-root-el"></StatusBar>

        <ContextMenu class="fb-root-el" v-if="$store.getters['menu/showContextMenu']"/>
        <Alert class="fb-root-el" v-if="$store.getters['menu/showAlert']"/>
    </div>
</template>

<script>
import Properties from "./Navigation/Properties";
import FormView from "./Editor/FormView";
import TreeView from "./Navigation/TreeView";
import PrefManager from "../data/prefManager";
import ContextMenu from "../components/ContextMenu";
import StatusBar from "./Menu/StatusBar";
import StripBar from "./Navigation/StripBar";
import StripBarRight from "./Navigation/StripBarRight";
import MenuBar from "./Menu/MenuBar";
import ComponentPropsEditor from "./Navigation/ComponentPropsEditor";
import ScriptEditor from "./Editor/ScriptEditor";
import ContentView from "./Editor/ContentView";
import EditorTab from "./Editor/EditorTab";
import Alert from "../components/Alert";

export default {
    name: "Home",

    components: {
        Alert,
        EditorTab,
        ContentView,
        ScriptEditor,
        ComponentPropsEditor,
        MenuBar, StripBarRight, StripBar, StatusBar, ContextMenu, TreeView, FormView, Properties},

    data() {
        return {
            leftWidth: PrefManager.getLeftWidth(300),
            rightWidth: PrefManager.getRightWidth(300),

            isLeftDown: false,
            isRightDown: false,
            offsetX: 0,

            mainContentScroll: 0,
        }
    },

    methods: {
        leftDividerDown(e) {
            this.isLeftDown = true
            this.offsetX = this.leftWidth - e.x
        },

        rightDividerDown(e) {
            this.isRightDown = true
            this.offsetX = e.x + this.rightWidth
        },

        mouseMove(e) {
            if (this.isLeftDown) {
                this.leftWidth = this.offsetX + e.x
            }
            else if (this.isRightDown) {
                this.rightWidth = this.offsetX - e.x
            }

            if (this.isLeftDown || this.isRightDown) {
                window.dispatchEvent(new Event('resize'))
            }
        },

        mouseUp(e) {
            this.isLeftDown = false
            this.isRightDown = false

            PrefManager.setLeftWidth(this.leftWidth)
            PrefManager.setRightWidth(this.rightWidth)
        },

        onMainContentScroll(e) {
            this.mainContentScroll =  Math.floor(e.target.scrollTop)
        },
    }
}
</script>

<style scoped lang="scss">

#fb-main {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.divider {
    width: 14px;
    cursor: e-resize;
    margin-left: -7px;
    margin-right: -7px;
    z-index: 1;
}

</style>