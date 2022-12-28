import Vue from 'vue'
import Vuex from 'vuex'

import item from './modules/item'
import component from './modules/component'
import menu from './modules/menu'
import ui from './modules/ui'
import {RootState} from "@/store/RootState";

Vue.use(Vuex)

const store = new Vuex.Store<RootState>({
    modules: {
        item,
        component,
        menu,
        ui,
    },
    strict: true,
})

export default store