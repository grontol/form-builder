<template>
    <div class="panel-heading bold caption-subject font-blue-madisons uppercase">{{ title }}
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "FbPanelTitle",

    props: {
        title: {
            type: String,
            default: 'PANEL TITLE',
            long: true,
        }
    }
}
</script>

<style scoped>

</style>