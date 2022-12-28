<template>
    <div class="root" @click="onClickOutside">
        <div class="container horizontal-flex flex-center flex-justify-center" @click.stop>
            <i class="icon ri-question-fill" :class="[ type ]"></i>

            <div class="vertical-flex">
                <div class="title">{{ title }}</div>
                <div class="message mt-3">{{ message }}</div>

                <div class="horizontal-flex mt-5 flex-justify-end">
                    <button class="btn btn-primary" @click.stop="ok">Close</button>
                    <button class="btn btn-cancel" @click.stop="hide">Cancel</button>
                </div>
            </div>

            <div class="close clickable" @click.stop="hide">x</div>
        </div>
    </div>
</template>

<script>
import {playBeep} from "../utils/soundUtils";

export default {
    name: "Alert",

    methods: {
        hide() {
            this.hideAlert()
        },

        onClickOutside() {
            playBeep()
        },

        ok() {
            this.onOk()
            this.hideAlert()
        },
    },

    computed: {
        title() {
            return this.$store.getters['menu/alertTitle']
        },

        message() {
            return this.$store.getters['menu/alertMessage']
        },

        type() {
            return this.$store.getters['menu/alertType']
        },

        onOk() {
            return this.$store.getters['menu/alertOnOk']
        },
    }
}
</script>

<style scoped lang="scss">

.root {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 20000;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container {
    background: var(--menu-background);
    border: 1px solid var(--menu-border);
    padding: 25px 30px 20px;
    border-radius: 4px;
    position: relative;
}

.icon {
    font-size: 50px;
    margin-right: 15px;
    margin-left: -5px;

    &.success {
        color: var(--success);
    }

    &.error {
        color: var(--error);
    }

    &.question {
        color: var(--blue-light)
    }
}

.title {
    font-weight: bold;
}

.message {
    font-size: 13px;
}

.close {
    padding: 3px 6px;
    color: var(--text-medium);
    position: absolute;
    right: 5px;
    top: 3px;
    font-weight: bold;
    border-radius: 3px;
}

</style>