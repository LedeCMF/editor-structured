<template>
    <div class="lede-insert-menu" :style="{top: top + 'px', left: left+ 'px'}">
        <div class="menu-inner" v-if="isActive">
            <template v-if="!collapsed" v-for="(item, idx) in quick">
                <menu-item :item="item" :key="idx" :editor="editor"></menu-item>
            </template>
            <insert-dialog :menu="menu" :editor="editor"></insert-dialog>
        </div>
    </div>
</template>

<script>
    import MenuItem from './MenuItem.vue'
    import {EditorButton} from '@ledecmf/editor-core'
    import {SelectionEvent} from '@ledecmf/structured-editor'
    import InsertDialog from './InsertDialog.vue'

    export default {
        name: 'InsertMenu',
        components: {InsertDialog, EditorButton, MenuItem},
        provide() {
            return {
                '$menu': this,
            }
        },

        inject: ['$editor'],
        props: {
            menu: {
                type: Object,
                required: true,
            },

            editor: {
                type: Object,
                required: true,
            },
        },
        computed: {

            quick() {
                return this.menu.quickItems()
            },
        },

        data() {
            return {
                left: 0,
                isActive: false,
                top: 0,
                collapsed: false

            }
        },

        mounted() {

            this.$editor.$on('selection', this.onSelection)
            this.$nextTick(() => {
                this.onSelection(new SelectionEvent(this.$editor.tiptap.view))
            })
        },

        beforeDestroy() {

            this.$editor.$off('selection', this.onSelection)
        },

        methods: {
            /**
             *
             * @param {SelectionEvent} selection
             */
            onSelection(selection) {
                const state = selection.view.state

                const currentDom = selection.view.domAtPos(state.selection.$anchor.pos)
                this.isActive = currentDom.node.innerHTML === '<br>'
                    && currentDom.node.tagName === 'P'

                if (this.isActive) {
                    let ownerPos = currentDom.node.getBoundingClientRect();
                    this.collapsed = false;
                            if (this.menu.settings.collapse &&  currentDom.node.offsetWidth <= this.menu.settings.collapse) {
                        this.collapsed = true;
                    }
                    let parent = this.$editor.$el.parentNode;
                    const editorBounds = parent.getBoundingClientRect()
                    const cursorBounds = selection.view.coordsAtPos(state.selection.$anchor.pos)
                    this.top = cursorBounds.top - editorBounds.top
                    this.$nextTick(() => {
                        this.left = (ownerPos.x  - editorBounds.x) + currentDom.node.offsetWidth - this.$el.offsetWidth;
                    })
                }

            },
        },
    }
</script>

<style lang="scss">
    .lede-insert-menu {
        position: absolute;
        display: inline-block;

        z-index: 10;



        .menu-inner {
            display: flex;
        }
    }
</style>
