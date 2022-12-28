<template>
    <input v-if="isFocus" :type="type" spellcheck="false"
           @keydown.enter.prevent="$event.target.blur()"
           @focus="onFocus"
           @blur="onBlur"
           :value="value"
           ref="input"
    />
    <div v-else @click="onFocus" class="input horizontal-flex flex-center">
        <div v-for="(v, i) in formattedValue" :key="i">
            <div v-if="v.isVar"
                 class="var horizontal-flex flex-center"
                 :class="{ 'invalid': !v.isValid }"
                 v-tooltip="{ content: v.errMsg, classes: [ !v.isValid ? 'error' : 'good' ] }"
            >
<!--                <div>-->
<!--                    <img src="images/variable.png"/>-->
<!--                </div>-->
                <div>{{ v.text }}</div>
            </div>
            <div v-else>{{ v.text }}</div>
        </div>
    </div>
</template>

<script>
import {findVariable, isValidExpression} from "../../utils/utils";

export default {
    name: "InputProperty",

    props: {
        type: {
            type: String,
            default: 'text',
        },

        value: [Number, String]
    },

    data() {
        return {
            isFocus: false,
        }
    },

    methods: {
        onFocus() {
            this.isFocus = true
            this.$nextTick(() => {
                this.$refs.input.focus()
            })
        },

        onBlur(e) {
            this.isFocus = false
            this.$emit('change', e)
        },
    },

    computed: {
        formattedValue() {
            const vars = findVariable(this.value)

            if (vars.length === 0)
                return [ { text: this.value, isVar: false } ]

            const ar = []
            let curIndex = 0

            for (let a = 0; a < vars.length; a++) {
                if (vars[a].startIndex - curIndex > 0) {
                    ar.push({
                        text: this.value.substring(curIndex, vars[a].startIndex),
                        isVar: false,
                    })
                }

                const errMsg = isValidExpression(vars[a].name)

                ar.push({
                    text: vars[a].name,
                    isVar: true,
                    isValid: errMsg === null,
                    errMsg: errMsg ? '<span style="font-size: 20px; font-weight: bold">¯\\_(ツ)_/¯</span></br>' + errMsg : 'Good 👍',
                })

                if (a === vars.length - 1) {
                    ar.push({
                        text: this.value.substring(vars[a].endIndex),
                        isVar: false,
                    })
                }

                curIndex = vars[a].endIndex
            }

            return ar
        },
    },
}
</script>

<style scoped lang="scss">

input[type="text"], select, textarea, .input {
    width: 100%;
    background: rgba(255, 255, 255, 0.2);
    padding: 7px 11px;
    outline: none;
    min-height: 40px;
    box-sizing: border-box;
    border: 1px solid transparent;
    cursor: text;
    flex-wrap: wrap;

    &:disabled {
        background: rgba(255, 255, 255, 0.07);
        color: #AAAAAA;
    }

    &:focus {
        border: 1px solid var(--blue-very-light);
    }
}

span {
    display: inline-block;
}

.var {
    background: #2c9a2c;
    padding: 1px 8px 1px 8px;
    border-left: 3px solid #8cee8c;
    margin: 1px 3px;
    border-radius: 4px !important;
    cursor: pointer;

    img {
        width: 16px;
        height: 10px;
    }

    &.invalid {
        background: #c53a3a;
        border-left: 3px solid #cc7f7f;
    }
}

</style>