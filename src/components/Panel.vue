<template>
    <div class="root vertical-flex" @click="$emit('click', $event)">
        <div class="fb-panel-header horizontal-flex flex-stretch">
            <img :src="icon" class="fb-icon mr-3"/>
            <div class="fb-panel-title flex-fill">{{ title }}</div>

            <div class="fb-minimize vertical-flex flex-justify-center" @click="$emit('hide', $event)">
                <img src="images/minimize.png" class="fb-icon-small"/>
            </div>
        </div>

        <div class="content flex-fill vertical-flex">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "Panel",

    props: {
        title: String,
        icon: String,
    }
}
</script>

<style scoped lang="scss">

.root {
    background: var(--dark-background);
    border: 1px solid var(--border);
    border-right: none;
    border-bottom: none;
    overflow: auto;
    z-index: 10;
}

.content {
    padding: 15px;
    overflow: auto;
}

</style>