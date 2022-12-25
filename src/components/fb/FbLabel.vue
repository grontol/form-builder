<template>
    <label :class="'control-label ' + col">{{ label }}</label>
</template>

<script>
import {htmlPropDefs} from "../../utils/propDefs";

export default {
    name: "FbLabel",

    props: {
        ...htmlPropDefs,
        col: {
            type: String,
            default: 'col-md-12'
        },
        label: {
            type: String,
            default: ''
        }
    }
}
</script>

<style scoped>

</style>