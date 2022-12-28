<template>
    <div>
        <div v-for="index in times" :key="index">
            <slot v-bind="{ iter: index - 1 }"></slot>
        </div>
    </div>
</template>

<script lang="ts">

export default {
    name: "FbLoop",

    props: {
        times: {
            type: Number,
            default: 0,
        },
        items: {
            type: Array,
            default() {
                return []
            },
        },
    },
}

</script>

<style scoped>

</style>