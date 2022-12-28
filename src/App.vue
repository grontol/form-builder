<template>
	<div id="app"
         ref="app"
         @contextmenu.prevent
    >
        <router-view />
        <v-popover>
        </v-popover>
	</div>
</template>

<script>

export default {
    name: "App",

    data() {
        return {

        }
    },

    mounted() {
        window.addEventListener('keydown', this.keyDown)
        window.addEventListener('keyup', this.keyUp)

        this.$store.dispatch('component/fetch')
    },

    beforeDestroy() {
        window.removeEventListener('keydown', this.keyDown)
        window.removeEventListener('keyup', this.keyUp)
    },

    methods: {
        keyDown(e) {
            if (e.key === 'Control')
                this.ctrlDown()
            else if (e.key === 'Shift')
                this.shiftDown()
            else if (e.key === 'F2') {
                if (this.activeTreeComp)
                    this.activeTreeComp.prepareRename()
            }
            else if (e.key === 'F4') {
                console.log(this.activeItem)
            }
            else if (e.ctrlKey && e.keyCode === 68) {
                this.$store.dispatch('item/duplicateItems')
                e.preventDefault()
            }
            else if (e.key === 'Delete') {
                this.deleteSelectedItems()
            }
            else if (e.shiftKey && e.keyCode === 70) {
                this.toggleFullScreen()
                e.preventDefault()
            }
        },

        keyUp(e) {
            if (e.key === 'Control')
                this.ctrlUp()
            else if (e.key === 'Shift')
                this.shiftUp()
        },

        ctrlDown() {
            this.$store.dispatch('item/isCtrl', true)
        },

        ctrlUp() {
            this.$store.dispatch('item/isCtrl', false)
        },

        shiftDown() {
            this.$store.dispatch('item/isShift', true)
        },

        shiftUp() {
            this.$store.dispatch('item/isShift', false)
        },

        isShift() {
            return this.$store.getters['item/isShift']
        },

        isCtrl() {
            return this.$store.getters['item/isCtrl']
        },
    },
}
	
</script>

<style scoped lang="scss">

#app {
    width: 100%;
    height: 100vh;
    overflow: hidden;
}

</style>