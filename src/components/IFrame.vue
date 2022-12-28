<script>

import formStyles from "../styles/formStyles";

import Vue from "vue";

export default {
    name: "IFrame",

    beforeUpdate() {
        this.iApp.children = this.$slots.default
    },

    render(h, context) {
        return  h('iframe', {
            on: { load: this.renderChildren }
        })
    },

    methods: {
        renderChildren() {
            this.$el.setAttribute("frameBorder", "0")

            const stylesTag = document.getElementsByTagName('style')
            let style = ""

            for (let a = 0; a < stylesTag.length; a++) {
                style += stylesTag[a].innerHTML + "\n"
            }

            const children = this.$slots.default
            const head = this.$el.contentDocument.head

            head.innerHTML = formStyles + `<style>${style}</style>`

            const body = this.$el.contentDocument.body
            const el = document.createElement('DIV') // we will mount or nested app to this element
            el.id = "CHILD"
            body.appendChild(el)

            const iApp = new Vue({
                name: 'iApp',
                //freezing to prevent unnessessary Reactifiation of vNodes
                data: { children },

                store: this.$store,

                render(h) {
                    return h('div', this.children)
                },
            })

            iApp.$mount(el) // mount into iframe

            this.iApp = iApp // cache instance for later updates
        }
    }
}
</script>

<style lang="scss" scoped>

iframe {

}

</style>