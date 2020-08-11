<template>
    <div id="home">

        <b-container fluid  class="h-100">
            <b-row  class="h-100">
                <b-col>
                    <b-navbar class="ce-left"   type="dark" variant="dark">

                        <b-nav-form>

                            <b-form-select v-model="dataSourceType" :options="options" size="sm" class="dropdown-toolbar mr-sm-2"></b-form-select>
                        </b-nav-form>

                        <b-navbar-nav class="ml-auto" size="sm">
                            <b-nav-item-dropdown text="Samples" >
                                <b-dropdown-item  v-on:click="setSample('mysql')">MySQL</b-dropdown-item>
                                <b-dropdown-item  v-on:click="setSample('json')">JSON</b-dropdown-item>
                                <b-dropdown-item  v-on:click="setSample('csv')">CSV</b-dropdown-item>
                            </b-nav-item-dropdown>


                            <b-button title="Clear" size="sm" variant="dark" v-on:click="clear">
                                <b-icon icon="x" style="color: #fff;"></b-icon>
                            </b-button>
                            <b-button title="Copy to Clipboard" size="sm" variant="dark"  :disabled="editorOptions.leftCE.code.trim().length === 0" v-on:click="doCopy(editorOptions.leftCE.code)">
                                <b-icon icon="files" style="color: #fff;"></b-icon>
                            </b-button>
                        </b-navbar-nav>
                    </b-navbar>

                    <code-editor v-bind:editorOptions="editorOptions" v-bind:dataSourceType="dataSourceType"></code-editor>

                </b-col>
                <b-col md="2">




                </b-col>
                <b-col>
                    <b-navbar class="ce-left"   type="dark" variant="dark">
                        <b-navbar-nav class="ml-auto">

                            <b-button title="Copy to Clipboard" size="sm" variant="dark" :disabled="editorOptions.rightCE.code.trim().length === 0" v-on:click="doCopy(editorOptions.rightCE.code)">
                                <b-icon icon="files" style="color: #fff;"></b-icon>
                            </b-button>

                            <b-button title="Download" size="sm" variant="dark" :disabled="editorOptions.rightCE.code.trim().length === 0"  v-on:click="doDownload(editorOptions.rightCE.code)">
                                <b-icon icon="box-arrow-down" style="color: #fff;"></b-icon>
                            </b-button>
                        </b-navbar-nav>

                    </b-navbar>
                    <code-editor-output v-bind:editorOptions="editorOptions"  ></code-editor-output>

                </b-col>
            </b-row>
        </b-container>

        <b-container fluid  class="h-100 mt-4 content-post">


                <b-card-group deck>
                <b-card>
                    <b-media no-body>

                        <b-media-body class="ml-3">

                            <p>
                                Avro Schema Generator is a tool that generates the avro schema json . It also provides a fold gutter  that helps to navigate your formatted JSON data.

                            </p>
                            <p class="mb-0">
                                This Avro Schema Generator tool is very powerful:
                            <ul>
                            <li>It helps to convert from Data Definition Language (DDL), JSON and CSV   to  avro schema </li>
                            <li> Also capable of translating from nested json definition to avro complex type schema. </li>
                            <li> Toolbar that allows copy to clipboard and download the schema.. </li>
                          </ul>

                            </p>
                <h5 class="mt-0">Avro Schema Example </h5>
                            <div v-highlight>
                <pre class="language-json">
                  <code>
                {
                  "name": "tasks",
                  "type": "record",
                  "fields": [
                    {
                      "name": "task_id",
                      "type": "int"
                    },
                    {
                      "name": "title",
                      "type": "string"
                    },
                    {
                      "name": "start_date",
                      "type": "string"
                    }
                  ]
                }
                  </code>
                </pre>
                </div>
                <h5 class="mt-0">About Avro</h5>
                <ul>
                    <li> <a href="https://en.wikipedia.org/wiki/Apache_Avro" target="_blank"> What is Apache Avro? </a> </li>
                    <li> <a href="https://avro.apache.org/docs/current/spec.html#schemas">Avro schema declaration</a> </li>
                </ul>

                        </b-media-body>
                    </b-media>
                </b-card>

                <b-card>
                    <b-media no-body>

                        <b-media-body class="ml-3">

                            <h5 class="mt-0">Source Data Examples:</h5>


                            <h5 class="mt-0">Mysql DDL</h5>

            <div v-highlight>
            <pre class="language-sql">
              <code>
             CREATE TABLE IF NOT EXISTS tasks (
                task_id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                start_date DATE,
                due_date DATE,
                status TINYINT NOT NULL,
                priority TINYINT NOT NULL,
                description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )  ENGINE=INNODB;
              </code>
            </pre>
            </div>

                            <p class="mb-0">
                            <h5 class="mt-0">JSON </h5>

                <div v-highlight>
                <pre class="language-json">
                  <code>
                 {
                    "debug": "on",
                    "window": {
                    "title": "Sample Konfabulator Widget",
                    "name": "main_window",
                    "width": 500,
                    "height": 500
                    }
                }
                  </code>
                </pre>
                </div>
                            </p>

                            <p class="mb-0">
                            <h5 class="mt-0">CSV </h5>

                            <div v-highlight>
           <pre class="language-json">
            <code>
            first_name;last_name;email;gender;age<br>
            Constantin;Langsdon;clangsdon0@hc360.com;Male;96
            </code>
        </pre>
                            </div>
                            </p>


                        </b-media-body>
                    </b-media>
                </b-card>

                </b-card-group>

        </b-container>
    </div>
</template>

<script>
    import CodeEditor from '@/components/CodeEditor.vue'
    import CodeEditorOutput from '@/components/CodeEditorOutput.vue'
    import Analytics from '@/lib/Analytics'

    import { component as VueCodeHighlight } from 'vue-code-highlight';
    import "vue-code-highlight/themes/prism.css";
    import 'prism-es6/components/prism-markup-templating';
    import 'prism-es6/components/prism-json';
    import 'prism-es6/components/prism-sql';

    export default {
        mixins: [Analytics],
        name: 'Home',
        components: {
            CodeEditor,
            CodeEditorOutput,
            VueCodeHighlight,
        },
        data () {
            return {
                dataSourceType: null,

                options: [
                    { value: null, text: 'Source' },
                    {
                        label: 'Database',
                        options: [
                            {value: 'mysql', text: 'MySQL DDL'},
                        ]
                    },
                    { value: 'json', text: 'JSON' },
                    { value: 'csv', text: 'CSV' },
                ],

                editorOptions: {
                    rightCE: {
                        code: "",
                        mode: 'application/json'
                    }

                    ,
                    leftCE: {
                        code:'',
                        sample: "CREATE TABLE IF NOT EXISTS tasks (\n" +
                        "    task_id INT AUTO_INCREMENT PRIMARY KEY,\n" +
                        "    title VARCHAR(255) NOT NULL,\n" +
                        "    start_date DATE,\n" +
                        "    due_date DATE,\n" +
                        "    status TINYINT NOT NULL,\n" +
                        "    priority TINYINT NOT NULL,\n" +
                        "    description TEXT,\n" +
                        "    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n" +
                        ")  ENGINE=INNODB; \n" +
                        "CREATE TABLE IF NOT EXISTS issue (\n" +
                        "    task_id INT AUTO_INCREMENT PRIMARY KEY,\n" +
                        "    title VARCHAR(255) NOT NULL,\n" +
                        "    start_date DATE,\n" +
                        "    due_date DATE,\n" +
                        "    status TINYINT NOT NULL,\n" +
                        "    priority TINYINT NOT NULL,\n" +
                        "    description TEXT,\n" +
                        "    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n" +
                        ")  ENGINE=INNODB;",
                        sampleJson:JSON.stringify(
                            {

                                "debug": "on",
                                "window": {
                                    "title": "Sample Konfabulator Widget",
                                    "name": "main_window",
                                    "width": 500,
                                    "height": 500
                                },
                                "image": {
                                    "src": "Images/Sun.png",
                                    "name": "sun1",
                                    "hOffset": 250,
                                    "vOffset": 250,
                                    "alignment": "center"
                                },
                                "text": {
                                    "data": "Click Here",
                                    "size": 36,
                                    "style": "bold",
                                    "name": "text1",
                                    "hOffset": 250,
                                    "vOffset": 100,
                                    "alignment": "center",
                                    "onMouseUp": "sun1.opacity = (sun1.opacity / 100) * 90;"
                                }
                            }
                            ,null,2),
                        sampleCSV:"first_name;last_name;email;gender;age\n" +
                        "Constantin;Langsdon;clangsdon0@hc360.com;Male;96\n",
                        mode: 'text/x-mysql'
                    }
                }

            }
        },
        created() {

            this.analytics().page({
                   url: '/home'
                 })

        },
        computed: {
            // a computed getter
            /*getSourceType: function () {

                return this.dataSourceType;
            }*/
        },
        methods: {
            setSample(type) {

                switch(type){
                    case 'mysql':
                        this.editorOptions.leftCE.code = this.editorOptions.leftCE.sample;
                        this.dataSourceType = 'mysql';
                        break;
                    case 'json':
                        this.editorOptions.leftCE.code = this.editorOptions.leftCE.sampleJson;
                        this.dataSourceType = 'json';
                        break;
                    case 'csv':
                        this.editorOptions.leftCE.code = this.editorOptions.leftCE.sampleCSV;
                        this.dataSourceType = 'csv';
                        break;
                }

                this.analytics().track('SampleUsage', {
                    category: 'Sample',
                    label: 'Type',
                    value: type
                })

            },
            clear(){
                this.editorOptions.leftCE.code = '';
                this.editorOptions.rightCE.code = '';
                this.dataSourceType = null;

            },
            doCopy: function (model) {
                this.$copyText(model).then(function (/*e*/) {
                    //alert('Copied')
                    //console.log(e)
                }, function (/*e*/) {
                    //alert('Can not copy')
                    //console.log(e)
                })
            },
            doDownload(data){

                const url = window.URL.createObjectURL(new Blob([data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', 'avroSchema.json') //or any other extension
                document.body.appendChild(link)
                link.click()
            }

        }

    }
</script>

<style>


    .ce-left{
        height: 35px;
    }
    .CodeMirror{
        height: 70vh !important;
    }
    .vue-codemirror{
        height: 100% !important;
    }
    .dropdown-toolbar{
        /* background-color: #343a40 !important;
         border: 0 !important;
         color:#fff !important;*/
    }
    .content-post{

        background-color: #3498db;
        color: #fff;
        padding: 20px 20px;

    }
    .content-post a{
        color: #fff;
        text-decoration: underline;

    }
    .content-post .card{

        background-color: #3498db;

    }
    pre[class*="language-"] {
        padding: 0;
    }
</style>
