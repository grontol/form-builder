<template>
    <div class="overlay" v-if="visible" @click="hide">
        <div class="container vertical-flex" ref="container">
            <div class="item" :class="{ selected: i === selectedValue }" v-for="(o, i) in options" @click="$emit('selected', i)">{{ o }}</div>
        </div>
    </div>
</template>

<script>
import CustomTransision from "./CustomTransision";
export default {
    name: "PopupMenu",
    components: {CustomTransision},
    props: {
        options: Array,
        selectedValue: Number,
    },

    emits: ['selected'],

    data() {
        return {
            visible: false,
        }
    },

    methods: {
        show(target) {
            this.visible = true

            this.$nextTick(() => {
                const el = this.$refs.container
                const containerRect = this.$refs.container.getBoundingClientRect()
                const targetRect = target.getBoundingClientRect()

                el.style.left = targetRect.x + targetRect.width / 2 - containerRect.width / 2 + 'px'
                el.style.top = targetRect.y + targetRect.height / 2 - containerRect.height / 2 + 'px'
            })
        },

        hide() {
            this.visible = false
        }
    }
}
</script>

<style scoped lang="scss">

.overlay {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
}

.container {
    position: fixed;
    width: 150px;
    padding: 7px 0;
    background: #23272d;
    max-height: 500px;
    overflow: auto;
}

.item {
    text-align: center;
    padding: 7px;
    font-weight: 700;
    transition: color 0.15s, background-color 0.15s;
    cursor: pointer;
    background: transparent;

    &.selected {
        background: black;
    }

    &:hover {
        color: var(--blue-glow);
        background: rgba(0, 0, 0, 0.3);
    }
}

</style>