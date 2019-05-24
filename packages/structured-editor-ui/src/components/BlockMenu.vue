<template>
    <div class="lede-block-menu" :style="{'top' : top + 'px', 'left' : left + 'px'}">
        <div ref="toggle">
            <editor-button icon="paragraph2" @click="toggle"></editor-button>
        </div>
        <div class="menu-inner" ref="toolbar" v-if="isActive">
            <template v-for="(item, idx) in items">
                <menu-item v-if="!only || only === item" :item="item" :key="idx" :editor="editor"
                           @exec="onExec"></menu-item>
            </template>
            <div class="menu-arrow" x-arrow></div>
        </div>
    </div>
</template>

<script>
    import Popper from 'popper.js'
    import MenuItem from './MenuItem.vue'
    import {EditorButton} from '@ledecmf/editor-core'

    export default {
        name: 'BlockMenu',
        components: {EditorButton, MenuItem},
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
            items() {
                return this.menu.all()
            },
        },

        data() {
            return {
                top: 0,
                only: null,
                isActive: false,
                left: 0,
            }
        },
        mounted() {
            this.$editor.$on('selection', this.onSelection)

        },

        beforeDestroy() {
            this.hide()
            this.$editor.$off('selection', this.onSelection)
        },

        methods: {
            onExec() {
                this.hide()
            },

            onSelection(selection) {
                this.selection = selection
                const state = selection.view.state
                let parent = this.$editor.$el.parentNode
                const editorBoundings = parent.getBoundingClientRect()
                const cursorBoundings = selection.view.coordsAtPos(state.selection.$anchor.pos)
                const currentDom = selection.view.domAtPos(state.selection.$anchor.pos)
                if (currentDom && currentDom.node && currentDom.node.getBoundingClientRect) {
                    const domOffset = currentDom.node.getBoundingClientRect()
                    this.top = cursorBoundings.top - editorBoundings.top
                    this.left = domOffset.x - editorBoundings.left - 36
                }

            },

            open() {
                this.$editor.focus()
                this.isActive = true
                this.$nextTick(() => {
                    this.popper = new Popper(this.$refs.toggle, this.$refs.toolbar, {
                        placement: 'bottom-start',
                    })
                })
                document.addEventListener('mousedown', this.maybeHide)
            },

            toggle() {
                if (this.isActive) {
                    this.hide()
                } else {
                    this.open()
                }
            },

            hide() {
                if (this.popper) {
                    this.popper.destroy()
                    this.popper = null
                }
                this.isActive = false
                document.removeEventListener('mousedown', this.maybeHide)
            },

            maybeHide(event) {
                if (!this.$el.contains(event.target)) {
                    this.hide()
                }
            },

        },

    }
</script>

<style lang="scss">

    .lede-block-menu {
        position: absolute;
        z-index: 100;
        width: 24px;
        height: 24px;

        .menu-inner {
            display: flex;
            border-radius: 4px;

            button {
                display: inline-flex;
                align-items: center;
                padding: 5px;

            }
        }

        .lede-block-selector {
            display: flex;
            align-items: center;
            height: 100%;
            padding: 5px;

            select {
                border-radius: .25rem;
                padding: 0;
                height: 28px;
            }
        }
    }

</style>
