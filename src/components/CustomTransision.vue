<template>
    <transition :appear="true"
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @leave="leave"
        @after-leave="afterLeave"
    >
        <slot></slot>
    </transition>
</template>

<script>
import gsap, { Circ } from 'gsap';
import { CustomEase } from "gsap/CustomEase";

const shake = CustomEase.create('custom', "M0,0 C0.292,0.598 0.372,-0.152 0.512,-0.152 0.602,-0.152 0.66,0.084 0.73,0.078 0.847,0.066 0.848,-0.11 1,0 ")
const inEase = Circ.easeOut
const outEase = Circ.easeIn

export default {
    name: "CustomTransision",

    props: {
        type: String
    },

    emit: ['leave-done'],

    mounted() {

    },

    methods: {
        beforeEnter(el) {
            if (!this.type || this.type === 'scale') {
                el.style.transform = 'scale(0)'
            }
            else if (this.type === 'alpha') {
                el.style.opacity = '0'
            }
        },

        enter(el, done) {
            if (!this.type || this.type === 'scale') {
                gsap.to(el, {
                    scale: 1,
                    duration: 0.2,
                    ease: inEase,
                    onComplete: () => {
                        el.style.removeProperty('transform')
                        el.style.removeProperty('translate')
                        el.style.removeProperty('scale')
                        el.style.removeProperty('rotate')
                        done()
                    }
                })
            }
            else if (this.type === 'alpha') {
                gsap.to(el, {
                    opacity: 1,
                    duration: 0.2,
                    ease: inEase,
                    onComplete: done
                })
            }
        },

        afterEnter(el) {

        },

        beforeLeave(el) {

        },

        leave(el, done) {
            if (!this.type || this.type === 'scale') {
                gsap.to(el, {
                    scale: 0,
                    duration: 0.2,
                    ease: outEase,
                    onComplete: () => {
                        this.$emit('leave-done')
                        done()
                    }
                })
            }
            else if (this.type === 'alpha') {
                gsap.to(el, {
                    opacity: 0,
                    duration: 0.2,
                    ease: outEase,
                    onComplete: () => {
                        this.$emit('leave-done')
                        done()
                    }
                })
            }
        },

        afterLeave(el) {

        },

        triggerShake() {
            const el = this.$slots.default[0].elm
            el.style.color = 'var(--blue-glow)'

            gsap.fromTo(el, {
                scale: 1,
                },
                {
                scale: 0,
                duration: 0.3,
                ease: shake,
                onComplete: () => {
                    el.style.color = 'white'
                }
            })
        },
    }
}
</script>

<style scoped>

</style>