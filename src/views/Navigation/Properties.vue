<template>
    <Panel title="Properties" icon="images/properties.png" @hide="hideProperties">
        <template v-if="activeItem">
            <div>
                <div class="mb-2"> Component</div>
                <div>
                    <input type="text" spellcheck="false"
                           disabled
                           :value="activeCompName"/>
                </div>
            </div>

            <div>
                <div class="mb-2 mt-4"> Name</div>
                <div>
                    <input type="text" spellcheck="false"
                           @keydown.enter.prevent="$event.target.blur()"
                           @blur="onChangeName($event.currentTarget.value)"
                           :value="activeItem.name"/>
                </div>
            </div>

            <template v-if="Object.keys(propsSelected).length > 0">
                <div v-for="(v, k) in propsSelected" :key="k">
                    <div class="mb-2 mt-4"> {{ capitalize(k) }}</div>

                    <div>
                        <input type="checkbox" v-if="v.type.name === 'Boolean'" spellcheck="false"
                               @change="onChange(k, $event.currentTarget.checked)"
                               :checked="getPropValue(k, v, false)"
                        />

                        <template v-else-if="v.type.name === 'String'">
                            <select v-if="v.choose"
                                    @input="onChange(k, $event.currentTarget.value)"
                                    :value="getPropValue(k, v, v.choose[0])"
                            >
                                <option v-for="c in v.choose" :value="c" :key="c">{{ c }}</option>
                            </select>

                            <textarea v-else-if="v.long" style="height: 100px; resize: none" spellcheck="false"
                                      @keydown.enter.prevent="$event.target.blur()"
                                      @blur="onChange(k, $event.currentTarget.value)"
                                      :value="getPropValue(k, v, '')">
                                </textarea>

                            <InputProperty
                                v-else
                                type="text"
                                @change="onChange(k, $event.currentTarget.value)"
                                :value="getPropValue(k, v, '')"
                            />
                        </template>

                        <InputProperty
                            v-else-if="v.type.name === 'Number'"
                            type="text"
                            @change="onChange(k, parseInt($event.currentTarget.value))"
                            :value="getPropValue(k, v, 0)"
                        />

                        <InputProperty
                            v-else-if="v.type.name === 'Array'"
                            type="text"
                            @change="onChangeArray(k, $event.currentTarget.value)"
                            :value="getPropValueArray(k, v, [])"
                        />
                    </div>
                </div>
            </template>
        </template>
        <div v-else class="vertical-flex flex-fill flex-justify-center">
            <div class="text-center" style="color: var(--text-medium)">Select item(s) to edit properties</div>
        </div>
    </Panel>
</template>

<script>
import {componentProps} from "../../utils/componentDefs";
import Panel from "../../components/Panel";
import InputProperty from "../../components/properties/InputProperty";

export default {
    name: "Properties",
    components: {InputProperty, Panel},
    data() {
        return {
            value: ""
        }
    },

    methods: {
        capitalize(s) {
            if (s === 'aClass')
                return 'Class'

            return s
                .split(' ')
                .map(x => x.trim())
                .filter(x => x.length > 0)
                .map(x => x.charAt(0).toUpperCase() + x.slice(1))
                .join(' ')
        },

        getPropValue(k, v, def) {
            const defVal = typeof v.default === 'function' ? v.default() : v.default
            return this.activeItem.props && this.activeItem.props[k] ? this.activeItem.props[k] : defVal || def
        },

        getPropValueArray(k, v, def) {
            let defVal

            if (v.default) {
                if (v.default === 'function') {
                    defVal = v.default()
                }
                else {
                    defVal = v.default
                }
            }
            else {
                defVal = def
            }

            const val = this.activeItem.props && this.activeItem.props[k] ? this.activeItem.props[k] : defVal

            return '{{' + JSON.stringify(val) + '}}'
        },

        onChangeName(value) {
            this.$store.dispatch('item/setItemName', value)
        },

        onChange(propName, value) {
            this.$store.dispatch('item/setPropValue', {
                propName,
                value,
            })
        },

        onChangeArray(propName, value) {


            // this.$store.dispatch('item/setPropValue', {
            //     propName,
            //     value: [],
            // })
        },

        hideProperties() {
            this.$store.dispatch('ui/showProperties', false)
        },
    },

    computed: {
        activeItem() {
            return this.$store.getters['item/activeItem']
        },

        selectedItems() {
            return this.$store.getters['item/selectedItems']
        },

        multipleSelected() {
            return this.selectedItems.length > 1
        },

        activeCompName() {
            return this.multipleSelected ? "Multiple" : this.activeItem ? this.activeItem.compName : ''
        },

        propsSelected() {
            let props = this.activeItem ? componentProps[this.activeItem.comp] : null

            if (!props)
                props = {}

            return props
        }
    },

    watch: {}
}
</script>

<style scoped lang="scss">

input[type="text"], select, textarea {
    width: 100%;
    background: rgba(255, 255, 255, 0.2);
    padding: 7px 11px;
    outline: none;
    height: 40px;
    box-sizing: border-box;
    border: 1px solid transparent;

    &:disabled {
        background: rgba(255, 255, 255, 0.07);
        color: #AAAAAA;
    }

    &:focus {
        border: 1px solid var(--blue-very-light);
    }
}

input[type="checkbox"] {
    width: 100%;
    height: 20px;
}

select option {
    background: #222222;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    border: none;
    padding: 7px 10px;
}

</style>