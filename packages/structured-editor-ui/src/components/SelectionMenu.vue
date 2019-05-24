<template>
    <div class="lede-selection-menu" :style="style">

        <div class="selection-marker" ref="marker"></div>
        <div class="menu-inner" v-if="active" ref="menu">
            <template v-for="(item, idx) in items">
                <menu-item v-if="!only || only === item" :item="item" :key="idx" :editor="editor"></menu-item>
            </template>
            <div class="menu-arrow" x-arrow></div>
        </div>

    </div>
</template>
<script>
    import Popper from 'popper.js'
    import MenuItem from './MenuItem'
    import { findDomRefAtPos } from 'prosemirror-utils';

    export default {
        name: 'SelectionMenu',
        components: {MenuItem},
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

        watch: {
            active(val) {
                if (this.popper && !val) {
                    this.popper.destroy()
                    this.popper = null
                }
            },
        },

        computed: {
            items() {
                return this.menu.all()
            },
        },

        data() {
            return {
                active: false,
                style: {},
                only: null,
            }
        },

        mounted() {
            this.showDebounce = null
            this.$editor.$on('selection', this.onSelection)
        },

        beforeDestroy() {
            this.hide()
            if (this.showDebounce) {
                clearTimeout(this.showDebounce)
            }
            this.$editor.$off('selection', this.onSelection)
        },

        methods: {

            showOnly(item) {
                this.only = item
                this.$nextTick(() => {
                    if(this.popper) {
                        this.popper.update();
                    }
                })
            },

            onSelection(selection) {

                if (this.showDebounce) {
                    clearTimeout(this.showDebounce)
                }
                this.hide()
                if (!selection.empty && (selection.type === 'text' || (selection.type === 'node' && selection.node.type.isInline))) {
                    this.showDebounce = setTimeout(() => {
                        if (!selection.empty) {
                            this.show(selection)
                        }
                    }, 100)
                }
            },

            hide() {

                this.active = false
                document.removeEventListener('mousedown', this.maybeHide)
                this.only = null;
            },

            maybeHide(event) {
                if (!this.$el.contains(event.target)) {
                    this.hide()

                }
            },
            show(selection) {
                document.addEventListener('mousedown', this.maybeHide)
                this.active = true
                let parent = this.$editor.$el
                const box = parent.getBoundingClientRect()
                let left = 0, bottom = 0

                left = Math.max((selection.box.start.left + selection.box.end.left) / 2, selection.box.start.left + 3)
                left = parseInt(left - box.left, 10)
                bottom = selection.box.start.top

                this.style = {
                    left: left + 'px',
                    bottom: parseInt(box.bottom - bottom, 10) + 'px',
                }

                this.$nextTick(() => {
                    let anchor = this.$refs.marker;

                    this.popper = new Popper(anchor, this.$refs.menu, {
                        placement: 'top',
                        offset: 0,
                    })

                    //  document.addEventListener('mousedown', this.checkMouse);
                })
            },

        },
    }
</script>

<style lang="scss">

    .lede-selection-menu {
        position: absolute;
        z-index: 100;
        .selection-marker {
            position: absolute;
            width:0;
            height: 0;
        }

        .menu-inner {
            display: inline-flex;
            border-radius: 4px;
        }

        button {
            display: inline-flex;
            align-items: center;
            padding: 5px;
        }
    }

    .menu-drop-button {
        display: flex;
        .button-body {
            display: flex;
        }
    }

</style>
