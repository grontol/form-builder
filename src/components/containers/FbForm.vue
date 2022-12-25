<template>
    <form action="" :id="id" class="form-horizontal" :method="method">
        <slot></slot>
    </form>
</template>

<script>
export default {
    name: "FbForm",
    props: {
        id: {
            type: String,
            default: 'form'
        },
        method: {
            type: String,
            default: 'post',
            choose: ['post', 'get']
        },
    }
}
</script>

<style scoped>

</style>