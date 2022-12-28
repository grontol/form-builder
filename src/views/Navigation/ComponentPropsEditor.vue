<template>
    <Panel icon="images/props-edit.png" title="Component Props Editor"
           @hide="$store.dispatch('ui/showCompPropsEditor', false)"
    >
    </Panel>
</template>

<script>
import Panel from "../../components/Panel";
import FbLoop from "../../components/fb/FbLoop";

export default {
    name: "ComponentPropsEditor",
    components: {FbLoop, Panel},

    data() {
        return {
            code: 'const a = 10'
        }
    },
}
</script>

<style scoped lang="scss">

.editor {
    width: 100%;
    height: 100%;
}

</style>