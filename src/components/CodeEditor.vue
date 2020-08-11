<template>

    <!-- Two-way Data-Binding -->
    <codemirror v-model="editorOptions.leftCE.code" :options="cmOptions"
                ref="cmEditor"
                @ready="onCmReady"
                @focus="onCmFocus"
                @input="onCmCodeChange"

    />
</template>

<script>

    import { Parser } from 'sql-ddl-to-json-schema'
    const options = { useRef: true };
    import avro from 'avsc';
    import {convert} from 'json-to-json-schema';
    import toJsonSchema  from 'to-json-schema';
    import  * as jsonSchemaAvro  from 'json-schema-to-avro';
    import  dataTypeMapping from '../lib/DataTypeMapping';
    import  csv from 'csvtojson';
    import Analytics from '@/lib/Analytics'

    //const parser = new Parser('mysql');
    //const options = { useRef: true };

    // import language js
    import 'codemirror/mode/javascript/javascript.js'
    import 'codemirror/mode/sql/sql.js'
    import 'codemirror/mode/q/q.js'
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

    import 'codemirror/addon/hint/show-hint'
    import 'codemirror/addon/hint/sql-hint'

    // import more 'codemirror/some-resource...'
//   / window.JSHINT = JSHINT;
    window.jsonlint = require('jsonlint');

    export default {
        mixins: [dataTypeMapping,Analytics],
        components: {
        },
        data () {
            return {
                //code: 'const a = 10',
                parser:null,
                cmOptions: {
                    tabSize: 4,
                    mode: this.editorOptions.leftCE.mode,
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
                    // more CodeMirror options...
                }
            }
        },
        created() {

        },
        props: {
            editorOptions:Object,
            dataSourceType:String
        },
        watch: {
            dataSourceType: function(newValue, oldValue) {

                switch (newValue){
                    case 'mysql':
                        this.$set(this.cmOptions, 'mode', 'text/x-mysql');
                        break;
                    case 'json':
                        this.$set(this.cmOptions, 'mode', 'application/json');
                        break;
                    case 'csv':
                        this.$set(this.cmOptions, 'mode', 'text/x-q');
                        break;

                }
                //  this.editorControl(this.editorOptions.leftCE.code);

                this.analytics().track('SourceUsage', {
                    category: 'Source',
                    label: 'Type',
                    value: newValue
                })
            }
        },
        methods: {
            onCmReady(cm) {
                //console.log('the editor is readied!', cm)


            },
            onCmFocus(cm) {
                //console.log('the editor is focused!', cm)
            },
            onCmCodeChange(newCode) {
                //console.log('this is new code', newCode)
                this.editorControl(newCode);

            },
            buildSchemaStr(jsonTableObject) {
                let type = 'record';
                let outputStr = [];
                let strFields = '';
                const template = '[type] [title] {[fields]}';

                jsonTableObject.forEach((item) => {

                    item.columns.forEach((column) => {
                        strFields += this.getMappingType(column.type.datatype) + ' ' + column.name + '; ';
                    });

                    outputStr.push(template.replace('[type]', type).replace('[title]', item.name).replace('[fields]', strFields));
                    strFields = '';

                });
                //console.log(outputStr)
                return outputStr;

            },
            sqlParser(sql, dbEngine) {

                let parser = new Parser(dbEngine);
                parser.feed(sql);

                let parsedJsonFormat = parser.results;
                let compactJsonTablesArray = parser.toCompactJson(parsedJsonFormat);
                let jsonSchemaDocuments = parser.toJsonSchemaArray(options, compactJsonTablesArray);

                return compactJsonTablesArray;

            },
            getSchemaJson(jsonArray) {
                let outputJson = '';
                let IDLArray = this.buildSchemaStr(jsonArray);

                IDLArray.forEach((IDL) => {

                    let schema = avro.readSchema(IDL);
                    //console.log(schema)
                    outputJson += JSON.stringify(avro.Type.forSchema(schema), null, 2) + '\n';

                });

                return outputJson;
            },
            async editorControl(newCode) {

                switch (this.dataSourceType) {

                    case 'mysql':
                        let jsonArray = this.sqlParser(newCode, 'mysql');
                        this.editorOptions.rightCE.code = this.getSchemaJson(jsonArray);
                        break;
                    case 'json':
                       let jsonSchema = toJsonSchema(JSON.parse(newCode));

                       jsonSchema["$id"] =  "http://yourdomain.com/schemas/v1/myClass.json";

                        this.editorOptions.rightCE.code = JSON.stringify(jsonSchemaAvro.convert( jsonSchema),null, 2);

                        break;
                    case 'csv':

                        const csvJsonArray = await   csv({noheader:false,output: "json" ,delimiter:"auto"}).fromString(newCode)


                        if(Array.isArray(csvJsonArray) && csvJsonArray.length > 0){

                            let csvJson =  csvJsonArray.shift();
                            let jsonSchemaCsv = toJsonSchema(csvJson);

                           jsonSchemaCsv["$id"] =  "http://yourdomain.com/schemas/v1/myClass.json";
                           //console.log(jsonSchemaCsv)
                            this.editorOptions.rightCE.code = JSON.stringify(jsonSchemaAvro.convert( jsonSchemaCsv),null, 2);
                        }

                        break;

                }


            },
            scanJsonSchema(obj) {
                for (let k in obj) {
                    if (typeof obj[k] === "object") {
                       // console.log(k);
                        this.scanJsonSchema(obj[k])
                    } else {
                        // base case, stop recurring
                        //console.log(obj[k]);
                    }
                }

            },

            generateDataFromSchema(schema,key) {
                if (!schema) { return }


                let parsedData = ''

                if(typeof schema.properties === "object"){

                    parsedData += ' record ' +
                    Object.keys(schema.properties).forEach( (item) => {

                        //console.log(schema.properties[item])
                        if(typeof schema.properties[item] === "object"){

                            parsedData += ' ' + item + ' {'
                        }
                        parsedData += this.generateDataFromSchema(schema.properties[item],item)

                        if(typeof schema.properties[item] === "object"){

                            parsedData += ' }'
                        }

                    })
                }else{

                   // if (schema.type === 'string') {
                     // console.log(schema)
                        return ' ' +schema.type +' '+ key +';'


                }


                return parsedData
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