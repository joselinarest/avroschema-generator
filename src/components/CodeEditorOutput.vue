<template>

    <!-- Two-way Data-Binding -->
    <codemirror v-model="editorOptions.rightCE.code" :options="cmOptions"
                ref="cmEditor"
                @ready="onCmReady"
                @focus="onCmFocus"
                @input="onCmCodeChange"

    />
</template>

<script>

    // import language js
    import 'codemirror/mode/javascript/javascript.js'

    import 'codemirror/addon/fold/foldcode';
    import 'codemirror/addon/fold/foldgutter';
    import 'codemirror/addon/fold/brace-fold';
    import 'codemirror/addon/fold/indent-fold';

    // import theme style
    import 'codemirror/theme/solarized.css'
    import 'codemirror/addon/lint/lint.css'
    import 'codemirror/addon/hint/show-hint.css'

    import 'codemirror/addon/fold/foldgutter.css'

    import 'codemirror/addon/lint/lint';
    import 'codemirror/addon/lint/json-lint';
    import 'codemirror/addon/lint/javascript-lint';
    import 'codemirror/mode/javascript/javascript';


    export default {
        components: {
        },
        data () {
            return {
                //code: 'const a = 10',
                cmOptions: {
                    tabSize: 4,
                    mode: this.editorOptions.rightCE.mode,
                    extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }},
                    theme: 'solarized light',
                    lineNumbers: true,
                    line: true,
                    lint: true,
                    hint: true,
                    selfContain: true,
                    lintOnChange: false,
                    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                    lineWrapping: true,
                    foldGutter: true,
                    showCursorWhenSelecting: true,
                    height:'100%'
                    // more CodeMirror options...
                }
            }
        },
        props: {
            editorOptions:Object
        },
        methods: {
            onCmReady(cm) {
                // console.log('the editor is readied!', cm)
            },
            onCmFocus(cm) {
                //console.log('the editor is focused!', cm)
            },
            onCmCodeChange(newCode) {
               // console.log('this is new code', newCode)
                this.code = newCode
            }
        },
        computed: {
            codemirror() {
                return this.$refs.cmEditor.codemirror
            }
        },
        mounted() {
            //console.log('the current CodeMirror instance object:', this.codemirror)
            // you can use this.codemirror to do something...
        }
    }
</script>