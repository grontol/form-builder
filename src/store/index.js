import Vue from 'vue'
import Vuex from 'vuex'

import item from './modules/item'
import menu from './modules/menu'
import ui from './modules/ui'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        item,
        menu,
        ui,
    },
    strict: true,
})

export default store