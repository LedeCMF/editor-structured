<template>
    <div id="app">
        <div class="editor" v-if="ready">
            <lede-structured-editor :config="config" :value="value"
                                    placeholder="Write something amazing"
                                    @update="update"
                                    ref="editor"
                                    :menu-bar="true"
            ></lede-structured-editor>
        </div>
        <br style="clear:both">

        <div class="results">
            <div>
                <pre>{{ json }}</pre>
            </div>
            <div class="html">
                <pre>{{ html }}</pre>
            </div>
        </div>

    </div>
</template>

<script>
    import {EditorConfiguration} from '@ledecmf/structured-editor'
    import LedeStructuredEditor from '@ledecmf/structured-editor'
    import {
        Bold,
        Italic,
        Underline,
        Strike,
        Link,
        OrderedList,
        BulletList,
        Heading,
        Blockquote,
        Image,
        LiftBlock,
        MergeBlock,
        SelectParentNode,
        HorizontalRule,
        InsertAbove,
        InsertBelow,
    } from '@ledecmf/structured-editor-extensions'
    import Figure from '../nodes/Figure'

    import Table from '@ledecmf/structured-editor-tables'
    import {
        History,
    } from 'tiptap-extensions'
    import {BlockTypeMenu} from '@ledecmf/structured-editor-ui'
    import TableCreateDialog from './TableCreateDialog'

    export default {
        name: 'app',
        components: {
            TableCreateDialog,
            LedeStructuredEditor,
        },

        computed: {
            config() {
                let config = new EditorConfiguration()
                const bold = new Bold,
                    italic = new Italic,
                    underline = new Underline,
                    strike = new Strike,
                    link = new Link(),
                    orderedList = new OrderedList,
                    bulletList = new BulletList,
                    heading = new Heading,
                    blockquote = new Blockquote,
                    liftBlock = new LiftBlock,
                    mergeBlock = new MergeBlock,
                    image = new Image,
                    hr = new HorizontalRule,
                    selectParentNode = new SelectParentNode,
                    figure = new Figure({
                        caption: true,
                        align: {
                            left: true,
                            center: true,
                            right: true,
                        },
                        resize: true,
                    }),
                    insertAbove = new InsertAbove,
                    insertBelow = new InsertBelow,
                    table = new Table

                config.extensions.add(bold).
                    add(italic).
                    add(underline).
                    add(strike).
                    add(link).
                    add(orderedList).
                    add(bulletList).
                    add(new History).
                    add(heading).
                    add(blockquote).
                    add(liftBlock).
                    add(mergeBlock).
                    add(image).
                    add(selectParentNode).
                    add(figure).
                    add(hr).
                    add(insertAbove).
                    add(insertBelow).
                    add(table)

                config.selectionMenu.add(bold).add(italic).add(underline).add(strike).add(link)
                let blockTypes = new BlockTypeMenu()
                blockTypes.add(heading)

                config.blockMenu.add(blockTypes).
                    add(blockquote).
                    add(orderedList).
                    add(bulletList).
                    add(liftBlock).
                    add(mergeBlock).
                    add(selectParentNode).
                    add(insertAbove).
                    add(insertBelow)

                config.insertMenu.quick(blockquote).quick(figure).quick(hr).add(orderedList).
                    add(bulletList).add(table)

                return config
            },
        },

        data() {
            return {
                ready: false,
                table: {},
                json: '',
                html: '',
                value: //'<p>Line</p><p>Ja,mie<a href="http://google.com"></a>woo</p><figure class="align-left"><img src="/assets/images/weaver.jpg" /><figcaption>Caption</figcaption></figure><p>Please aligh right</p>' +
                   '<ul><li><b>List item 1</b></li><li>List item 2</li></ul>' +
                    '<table><tr><th>Head 1</th><th>Head 2</th></tr><tr><td>Col 1</td><td>Col 2</td></tr></table>' +
                    '<table><tr><th>Head 1</th><th>Head 2</th></tr><tr><td>Col 1</td><td>Col 2</td></tr></table>',

            }
        },

        methods: {
            update(editor) {
                this.json = editor.getJSON()
                this.html = editor.getHTML()
            },
        },

        mounted() {
            this.$nextTick(() => {
                this.ready = true
            })
        },

    }
</script>

<style lang="scss">

    @import '../../node_modules/@ledecmf/structured-editor/themes/default/index.scss';

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        padding: 20px;

        .editor {
            max-width: 650px;
            margin: 0 auto 20px;

            p.empty-node {
                position: relative;

                &:before {
                    position: absolute;
                    content: 'Write something awesome';
                    font-style: italic;
                    color: #888;

                }
            }

        }

        table {
            width: 100% !important;
            table-layout: fixed;

            th {
                color: #fff;
                background-color: #343a40;

                padding: .75rem;
                vertical-align: top;
                border: 1px solid #dee2e6;
                border-color: #454d55;
            }

            tr:nth-of-type(odd) {
                background-color: rgba(0, 0, 0, .05);
            }

            td {
                padding: .75rem;
                vertical-align: top;
                border: 1px solid #dee2e6;
            }

            td, th {
                width: 100% !important;;
            }
        }

        .results {
            display: flex;

            div {
                flex: 1;
            }
        }

        pre {
            white-space: pre-wrap;
        }
    }
</style>
