<template>
    <div class="lede-structured-editor" :class="{'has-focus' : hasFocus, 'menu-mode' : showMenu}">
        <template v-if="tiptap">

            <template v-if="showMenu">
                <menu-bar :config="config" :editor="tiptap" :settings="menuSettings"></menu-bar>
            </template>
            <template v-else>

                <selection-menu :editor="tiptap" :menu="config.selectionMenu"></selection-menu>
                <block-menu :editor="tiptap" :menu="config.blockMenu"></block-menu>
                <insert-menu :editor="tiptap" :menu="config.insertMenu"></insert-menu>
            </template>
            <editor-content :editor="tiptap"></editor-content>
        </template>

    </div>
</template>

<script>
    import {EditorContent} from 'tiptap'
    import Editor from '../overrides/Editor';
    import {Placeholder} from 'tiptap-extensions'
    import SelectionManager from '../plugins/SelectionManager'
    import {BlockMenu, InsertMenu, SelectionMenu, MenuBar} from '@ledecmf/structured-editor-ui'
    import EditorConfiguration from '../configuration/EditorConfiguration'

    export default {
        name: 'StructuredEditor',
        components: {InsertMenu, BlockMenu, SelectionMenu, EditorContent, MenuBar},
        provide() {
            return {
                '$editor': this,
            }
        },

        props: {
            config: {
                type: [Object, EditorConfiguration],
                required: true,
            },
            value: {
                type: [String, Object],
                required: true,
            },
            menuBar: {
                type: [Boolean, Number, String],
            },

            menuConfig: Object,
            placeholder: String,

        },

        computed: {
            showMenu() {
                if (typeof this.menuBar === 'boolean') {
                    return this.menuBar;
                }

                if (this.menuBar === 'touch') {
                    return "ontouchstart" in document.documentElement;
                }
                let targetWidth = Number(this.menuBar);
                if (targetWidth) {
                    return this.screenWidth <= targetWidth;
                }
                return false;
            },

            menuSettings() {

                let settings =  {
                    sticky: true,
                    placement: 'top',
                    offset: 0,
                    scrollElement:window
                }
                if (typeof this.menuConfig === 'object') {
                    settings = Object.assign(settings, this.menuConfig);
                }

                return settings

            }
        },
        data() {

            return {
                tiptap: null,
                hasFocus: false,
                screenWidth: null,
            }
        },

        mounted() {
            this.screenWidth = window.innerWidth;
            window.addEventListener('resize', this.updateSize);
            if (this.placeholder) {
                this.config.extensions.add(new Placeholder({
                    emptyClass: 'is-empty',
                    emptyNodeText: this.placeholder,
                    showOnlyWhenEditable: true,

                }))
            }
            this.config.plugins.add(new SelectionManager())
            this.createEditor()

        },

        destroyed() {
            window.removeEventListener('resize', this.updateSize);
        },
        methods: {
            updateSize() {
                this.screenWidth = window.innerWidth;
            },
            setValue(content) {
                if (this.tiptap) {
                    this.tiptap.setContent(content)
                }
            },

            getHTML() {
                return this.tiptap.getHTML()
            },

            getJSON() {
                return this.tiptap.getJSON()
            },

            focus() {
                if (this.tiptap) {
                    this.tiptap.focus()
                }
            },
            createEditor() {
                let vm = this
                this.tiptap = new Editor({
                    extensions: this.config.extensions.all(),
                    useBuiltInExtensions: false,
                    onUpdate: ({getJSON, getHTML}) => {
                        vm.$emit('update', this)

                    },

                    onInit(editor) {
                        vm.$nextTick(() => {
                            vm.tiptap.registerPlugin(new SelectionManager(vm))

                            vm.$emit('ready', editor);
                        })

                    },

                    onFocus() {
                        vm.hasFocus = true
                        vm.$emit('focus')
                    },

                    onBlur() {
                        vm.hasFocus = false
                        vm.$emit('blur')
                    },
                })
                this.setValue(this.value)
            },
        },
    }
</script>

<style scoped>

</style>
