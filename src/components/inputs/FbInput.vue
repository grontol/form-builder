<template>
    <input :type="type" :name="name" :value="value" :disabled="disabled" class="form-control" readonly/>
</template>

<script>
export default {
    name: "FbInput",
    props: {
        type: {
            type: String,
            default: 'text',
            choose: ['text', 'hidden'],
        },
        id: String,
        name: String,
        value: String,
        disabled: {
            type: Boolean,
            default: false,
        }
    }
}
</script>

<style scoped>

</style>