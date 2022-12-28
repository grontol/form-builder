<template>
    <div class="root horizontal-flex flex-center" :class="{ 'active': active }" @click.left="$emit('click', $event)" @click.middle.stop="onClose">
        <img src="images/component.png"/>
        <div class="name">{{ name }}</div>
        <div class="unsaved" v-if="unsaved">*</div>
        <div class="close-tab" @click.stop="onClose">x</div>
    </div>
</template>

<script>
export default {
    name: "EditorTabItem",

    props: {
        name: {
            type: String,
            default: '',
        },
        active: {
            type: Boolean,
            default: false,
        },
        unsaved: {
            type: Boolean,
            default: false,
        },
    },

    methods: {
        onClose(e) {
            if (this.unsaved) {
                this.showAlert("Confirm Close", `File '${this.name}' is not saved`, "question", () => {
                    this.$emit('close', e)
                })
            }
            else
                this.$emit('close', e)
        }
    },
}
</script>

<style scoped lang="scss">

.root {
    padding: 8px 10px;
    cursor: pointer;
    box-sizing: border-box;

    &:hover {
        background: rgba(0, 0, 0, 0.2);
    }

    &.active {
        background: rgba(255, 255, 255, 0.1);
        border-bottom: 4px solid var(--blue-light);
        padding-bottom: 4px;
    }
}

img {
    width: 20px;
    height: 20px;
}

.name {
    margin-left: 5px;
    color: var(--text-light);
}

.unsaved {
    color: var(--blue-very-light);
    margin-left: 3px;
    font-weight: bold;
}

.close-tab {
    width: 17px;
    height: 17px;
    color: var(--text-medium);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 3px;
    border-radius: 100px !important;

    &:hover {
        background: rgba(255, 255, 255, 0.4);
        color: var(--border);
    }
}

</style>