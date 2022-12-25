<template>
    <img :src="src" :class="{ 'disabled': disabled, 'flipped': flipped, 'large': large }" alt="" @click="$emit('click', $event)"/>
</template>

<script>
export default {
    name: "MenuItemIcon",

    props: {
        src: String,
        large: {
            type: Boolean,
            default: false,
        },
        flipped: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        }
    }
}
</script>

<style scoped lang="scss">

img {
    width: 28px;
    padding: 5px;
    cursor: pointer;
    transition: background-color 0.1s;

    &.large {
        width: 34px;
    }

    &.flipped {
        transform: scaleX(-1);
    }

    &.disabled {
        filter: grayscale(100%) brightness(80%);
        cursor: default;
    }

    &:not(.disabled):hover {
        background: rgba(255, 255, 255, 0.15);
    }

    &:not(.disabled):active {
        background: rgba(255, 255, 255, 0.2);
    }
}

</style>