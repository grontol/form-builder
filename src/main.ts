// VueJS
import './utils/extensions'
import Vue from 'vue'
import store from "./store";

// Main application view
import App from './App.vue'

// Vue Router
import router from './router'

// App Styling
import './styles/app.scss';

// GSAP
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
gsap.registerPlugin(CustomEase)

Vue.config.productionTip = false

// Component Defs =======
import './utils/componentDefs'

Vue.directive('click-outside', {
    bind: function (el: any, binding, vnode) {
        el.clickOutsideEvent = function (event: any) {
            if (!(el == event.target || el.contains(event.target))) {
                // @ts-ignore
                vnode.context[binding.expression](event)
            }
        }

        document.body.addEventListener('click', el.clickOutsideEvent)
    },

    unbind: function (el: any) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
    },
})

Vue.mixin({
    methods: {
        addItem(name) {
            // @ts-ignore
            this.$store.dispatch('item/addItem', name)
        },

        deleteSelectedItems() {
            // @ts-ignore
            this.$store.dispatch('item/deleteSelectedItems')
        },

        toggleFullScreen() {
            const el = document.getElementById("app")

            // @ts-ignore
            if (!this.fullScreen) {
                if (el?.requestFullscreen)
                    el.requestFullscreen()
            }
            else {
                document.exitFullscreen()
            }
        },

        showContextMenu(target: any, options: MenuOption[], onClick: (selected: any) => void) {
            // @ts-ignore
            this.$store.dispatch('menu/showMenu', {
                target,
                options,
                onClick,
            })
        },

        hideContextMenu() {
            // @ts-ignore
            this.$store.dispatch('menu/hideMenu')
        }
    },

    computed: {
        activeItem() {
            // @ts-ignore
            return this.$store.getters['item/activeItem']
        },

        hoveredItem() {
            // @ts-ignore
            return this.$store.getters['item/hoveredItem']
        },

        draggedItem() {
            // @ts-ignore
            return this.$store.getters['item/draggedItem']
        },

        activeTreeComp() {
            // @ts-ignore
            return this.$store.getters['item/activeTreeComp']
        },

        showProperties() {
            // @ts-ignore
            return this.$store.getters["ui/showProperties"]
        },

        showHierarchy() {
            // @ts-ignore
            return this.$store.getters["ui/showHierarchy"]
        },

        onContextMenuClick() {
            // @ts-ignore
            return this.$store.getters['menu/onClick']
        },

        fullScreen() {
            // @ts-ignore
            return this.$store.getters["ui/fullScreen"]
        },
    }
})

// Initialize Vue
const app = new Vue({
    router,
    store,
    render: h => h(App),

    mounted() {
        window.addEventListener('fullscreenchange', this.fullScreenChange);
    },

    beforeDestroy() {
        window.removeEventListener('fullscreenchange', this.fullScreenChange);
    },

    methods: {
        fullScreenChange() {
            if (document.fullscreenElement) {
                // @ts-ignore
                this.$store.dispatch('ui/setFullScreen', true)
            }
            else {
                // @ts-ignore
                this.$store.dispatch('ui/setFullScreen', false)
            }
        }
    },
}).$mount('#app')