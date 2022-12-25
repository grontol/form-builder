<template>
    <div class="root vertical-flex">
        <div class="item" v-for="item in items">
            {{ item.name }}
        </div>
    </div>
</template>

<script>
const items = [
    {
        name: 'Form',
        comp: 'fb-form',
    },
    {
        name: 'Panel',
        comp: 'fb-panel',
    },
    {
        name: 'Panel Body',
        comp: 'fb-panel-body',
    },
    {
        name: 'Row',
        comp: 'fb-row',
    },
    {
        name: 'Column',
        comp: 'fb-col',
    },
    {
        name: 'Form Group',
        comp: 'fb-form-group',
    },
    {
        name: 'Input',
        comp: 'fb-input',
    },
]

export default {
    name: "ItemList",

    data() {
        return {
            items: items
        }
    },
}
</script>

<style scoped lang="scss">

.root {
    background: #333333;
    padding: 7px;
}

.item {
    background: rgba(255, 255, 255, 0.3);
    padding: 10px;
    margin: 7px;
    cursor: pointer;
    transition: background-color 0.15s;
    text-align: center;

    &:hover {
        background: rgba(255, 255, 255, 0.4);
    }
}

</style>