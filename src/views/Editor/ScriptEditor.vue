<template>
    <div :id="id" class="editor"></div>
</template>

<script>

// import {
//     MonacoLanguageClient,
//     CloseAction,
//     ErrorAction,
//     createConnection,
//     MonacoServices,
// } from "monaco-languageclient";

import loader from "@monaco-editor/loader";

const code = 'import loader from "@monaco-editor/loader";\n' +
    '\n' +
    'export default {\n' +
    '    name: "ScriptEditor",\n' +
    '\n' +
    '    props: {\n' +
    '        id: String,\n' +
    '        language: String,\n' +
    '    },\n' +
    '\n' +
    '    data() {\n' +
    '        return {\n' +
    '            code: \'\'\n' +
    '        }\n' +
    '    },\n' +
    '\n' +
    '    mounted() {\n' +
    '        loader.init().then((monaco) => {\n' +
    '\n' +
    '            const editorOptions = {\n' +
    '                language: this.language,\n' +
    '                theme: "vs-dark",\n' +
    '                minimap: {enabled: false},\n' +
    '                automaticLayout: true,\n' +
    '                scrollbar: {\n' +
    '                    horizontal: \'visible\',\n' +
    '                    verticalScrollbarSize: 107,\n' +
    '                }\n' +
    '            };\n' +
    '\n' +
    '            import loader from "@monaco-editor/loader";\n' +
    '\n' +
    'export default {\n' +
    '    name: "ScriptEditor",\n' +
    '\n' +
    '    props: {\n' +
    '        id: String,\n' +
    '        language: String,\n' +
    '    },\n' +
    '\n' +
    '    data() {\n' +
    '        return {\n' +
    '            code: \'\'\n' +
    '        }\n' +
    '    },\n' +
    '\n' +
    '    mounted() {\n' +
    '        loader.init().then((monaco) => {\n' +
    '\n' +
    '            const editorOptions = {\n' +
    '                language: this.language,\n' +
    '                theme: "vs-dark",\n' +
    '                minimap: {enabled: false},\n' +
    '                automaticLayout: true,\n' +
    '                scrollbar: {\n' +
    '                    horizontal: \'visible\',\n' +
    '                    verticalScrollbarSize: 107,\n' +
    '                }\n' +
    '            };\n' +
    '\n' +
    '            monaco.editor.create(document.getElementById(this.id), editorOptions)\n' +
    '\n' +
    '        });\n' +
    '    },\n' +
    '}\n' +
    '\n' +
    '        });\n' +
    '    },\n' +
    '}'

export default {
    name: "ScriptEditor",

    props: {
        id: String,
        language: String,
        readOnly: {
            type: Boolean,
            default: false,
        },
        code: {
            type: String,
            default: '',
        },
    },

    data() {
        return {
            editor: null,
        }
    },

    mounted() {
        loader.init().then((monaco) => {

            const editorOptions = {
                value: this.code,
                language: this.language,
                theme: "vs-dark",
                automaticLayout: true,
                minimap: {
                    enabled: false,
                },
                scrollbar: {
                    verticalScrollbarSize: 15,
                    horizontalScrollbarSize: 22,
                },
                scrollBeyondLastLine: false,
                readOnly: this.readOnly,
            };

            this.editor = monaco.editor.create(document.getElementById(this.id), editorOptions)
        })
    },

    watch: {
        language(n) {
            this.editor.updateOptions({
                language: n,
            })
        },

        readOnly(n) {
            this.editor.updateOptions({
                readOnly: n,
            })
        },

        code(n) {
            console.log("COde updated " + n)

            this.editor.getModel().setValue(n)

            // this.editor.updateOptions({
            //     value: n,
            // })
        },
    },
}
</script>

<style scoped lang="scss">

.editor {
    box-sizing: border-box;
}

</style>