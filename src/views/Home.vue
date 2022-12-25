<template>
    <div id="fb-main" class="vertical-flex" @mousemove="mouseMove" @mouseup="mouseUp">
        <MenuBar class="fb-root-el"></MenuBar>

        <div class="horizontal-flex flex-fill" style="overflow: hidden">
            <StripBar class="fb-root-el"></StripBar>

            <TreeView class="fb-root-el" id="tree-view" :style="'width:' + leftWidth + 'px'" v-show="showHierarchy"></TreeView>
            <div class="divider" @mousedown="leftDividerDown" @click.stop></div>

            <div class="main-content flex-fill" style="overflow: auto" @scroll="onMainContentScroll">
                <FormView class="flex-fill" :parent-scroll-offset="mainContentScroll"></FormView>
            </div>

            <div class="divider" @mousedown="rightDividerDown" @click.stop></div>
            <Properties class="fb-root-el" id="properties" :style="'width:' + rightWidth + 'px'" v-show="showProperties"></Properties>

            <StripBarRight class="fb-root-el"></StripBarRight>
        </div>

        <StatusBar class="fb-root-el"></StatusBar>

        <ContextMenu class="fb-root-el" v-if="$store.getters['menu/show']"></ContextMenu>
    </div>
</template>

<script>
import ItemList from "./ItemList";
import Properties from "./Properties";
import FormView from "./FormView";
import TreeView from "./TreeView";
import PrefManager from "../data/prefManager";
import ContextMenu from "../components/ContextMenu";
import StatusBar from "./StatusBar";
import StripBar from "./StripBar";
import StripBarRight from "./StripBarRight";
import MenuBar from "./MenuBar";
export default {
    name: "Home",

    components: {MenuBar, StripBarRight, StripBar, StatusBar, ContextMenu, TreeView, FormView, Properties, ItemList},

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

.main-content {
    padding: 15px;
    background: #333a42;
}

.divider {
    width: 14px;
    cursor: e-resize;
    margin-left: -7px;
    margin-right: -7px;
    z-index: 1;
}

</style>