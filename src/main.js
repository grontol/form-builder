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
    bind: function (el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
            // here I check that click was outside the el and his children
            if (!(el == event.target || el.contains(event.target))) {
                // and if it did, call method provided in attribute value
                vnode.context[binding.expression](event)
            }
        };
        document.body.addEventListener('click', el.clickOutsideEvent)
    },
    unbind: function (el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
    },
})

Vue.mixin({
    methods: {
        addItem(name) {
            this.$store.dispatch('item/addItem', name)
        },

        deleteSelectedItems() {
            this.$store.dispatch('item/deleteSelectedItems')
        },

        toggleFullScreen() {
            const el = document.getElementById("app")

            if (!this.fullScreen) {
                if (el.requestFullscreen)
                    el.requestFullscreen()
                else if (el.webkitRequestFullscreen)
                    el.webkitRequestFullscreen()
                else if (el.msRequestFullscreen)
                    el.msRequestFullscreen()
            }
            else {
                document.exitFullscreen()
            }
        },
    },

    computed: {
        activeItem() {
            return this.$store.getters['item/activeItem']
        },

        hoveredItem() {
            return this.$store.getters['item/hoveredItem']
        },

        draggedItem() {
            return this.$store.getters['item/draggedItem']
        },

        activeTreeComp() {
            return this.$store.getters['item/activeTreeComp']
        },

        showProperties() {
            return this.$store.getters["ui/showProperties"]
        },

        showHierarchy() {
            return this.$store.getters["ui/showHierarchy"]
        },

        onContextMenuClick() {
            return this.$store.getters['menu/onClick']
        },

        fullScreen() {
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
        fullScreenChange(e) {
            if (document.fullscreenElement) {
                this.$store.dispatch('ui/setFullScreen', true)
            }
            else {
                this.$store.dispatch('ui/setFullScreen', false)
            }
        }
    },
}).$mount('#app')

Vue.prototype.$menu = {
    show: (target, options, onClick) => {
        app.$store.dispatch('menu/showMenu', {
            target,
            options,
            onClick,
        })
    },

    hide: () => {
        app.$store.dispatch('menu/hideMenu')
    }
}