<template>
    <div class="link-button">
        <menu-drop-button :item="item" :editor="editor" @opened="onOpen" ref="button">
            <input type="text" placeholder="http://" ref="input" @keydown.13.prevent="insert" v-model="href">
            <editor-button icon="check" @click="insert"></editor-button>
            <editor-button v-if="href" icon="trash" @click="trash"></editor-button>
        </menu-drop-button>
    </div>


</template>

<script>
    import {EditorButton} from '@ledecmf/editor-core'
    import {MenuDropButton} from '@ledecmf/structured-editor-ui'
    export default {
        name: 'LinkButton',
        components: {MenuDropButton, EditorButton},
        props: {
            item: Object,
            editor: Object,
            showLabel: Boolean
        },
        inject: ['$editor'],
        data() {
            return {
                href: '',
                opened: false,
                href: ''
            }
        },

        watch: {
            menuActive(val) {
                if (!val) {
                    this.opened = false
                }
            },
        },

        methods: {
            insert() {
                this.item.command(this.editor, {href: this.href});
                this.$refs.button.close();

            },
            onOpen() {
                let attrs = this.editor.getMarkAttrs('link');
                this.href = attrs && attrs.href ? attrs.href : '';
                this.$nextTick(() => {
                    this.$refs.input.focus();
                })

            },
            trash() {
                this.href = '';
                this.item.command(this.editor, {href: this.href});
                this.$refs.button.close();
            },

            toggleOpened() {
                if (this.opened) {
                    this.close()
                } else {
                    this.open()
                }
            },

            open() {
                let attrs = this.editor.getMarkAttrs ? this.editor.getMarkAttrs('link') : {}
                this.href = attrs ? attrs.href : ''
                this.opened = true
            },

            close() {
                this.opened = false
            },

        },
    }
</script>

<style lang="scss">
    .link-option-dialog {
        display: flex;
    }

    .code-toolbar .delete-link {
        display: none;
    }


</style>
