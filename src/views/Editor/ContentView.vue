<template>
    <div class="main-content flex-fill vertical-flex" style="overflow: hidden; height: 100%">
        <div class="horizontal-flex flex-justify-end choose-content fb-root-el">
            <MenuItemIcon v-tooltip="'Toggle Show Form'" src="images/form.png" :on="showForm" @click="$store.dispatch('ui/toggleForm')"/>
            <MenuItemIcon v-tooltip="'Toggle Show Code'" class="ml-2" src="images/html.png" :on="showCode" @click="$store.dispatch('ui/toggleCode')"/>
            <MenuItemIcon v-tooltip="'Toggle Show Style'" class="ml-2" src="images/css.png" :on="showStyle" @click="$store.dispatch('ui/toggleStyle')"/>
        </div>

        <div class="horizontal-flex flex-fill the-content">
            <IFrame class="flex-fill" v-show="showForm">
                <FormView></FormView>
            </IFrame>
            <ScriptEditor id="code-editor" language="javascript" :read-only="readOnly" :code="code" class="flex-fill" v-show="showCode"/>
            <ScriptEditor id="style-editor" language="css" class="flex-fill" v-show="showStyle"/>
        </div>

<!--        <button @click="code = 'const a = 10'">CLICK</button>-->
    </div>
</template>

<script>
import FormView from "./FormView";
import ScriptEditor from "./ScriptEditor";
import MenuItemIcon from "../../components/MenuItemIcon";
import IFrame from "../../components/IFrame";

export default {
    name: "ContentView",
    components: {IFrame, MenuItemIcon, ScriptEditor, FormView},

    data() {
        return {
            readOnly: false,
            code: '',
        }
    },

    methods: {

    },
}
</script>

<style scoped lang="scss">

.main-content {
    background: #333a42;
}

.choose-content {
    background: var(--dark-background);
    border-bottom: 1px solid var(--border);
    border-top: 1px solid var(--border);
    padding: 7px;
}

.the-content {
    padding: 10px;
    overflow: hidden;
}

</style>