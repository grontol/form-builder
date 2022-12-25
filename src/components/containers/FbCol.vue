<template>
    <div :class="'col-' + col">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "FbCol",
    props: {
        col: {
            type: String,
            default: 'md-12'
        }
    }
}
</script>

<style scoped>

</style>