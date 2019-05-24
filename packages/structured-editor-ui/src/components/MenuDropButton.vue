<template>
    <div class="menu-drop-button" :class="{'from-menu' : fromMenu}" >
        <editor-button
                @click="toggle"
                ref="button"
                :label="item.label"
                :show-label="showLabel"
                :icon="item.icon">
        </editor-button>
        <div class="button-body" ref="body">
            <div v-click-outside="close"  v-if="opened">
                <slot ></slot>
                <div x-arrow v-if="fromMenu"></div>
            </div>

        </div>
    </div>
</template>

<script>
    import {EditorButton} from '@ledecmf/editor-core'
    import Popper from 'popper.js'
    import vClickOutside from 'v-click-outside'
    export default {
        name: 'MenuDropButton',
        components: {EditorButton},
        directives: {
            clickOutside: vClickOutside.directive
        },
        inject: ['$menu', '$editor'],
        props: {
            item: {
                type: Object,
                required: true,
            },

            editor: {
                type: Object,
                required: true,
            },

            showLabel: Boolean
        },

        data() {
            return {
                opened: false,
                fromMenu : false
            }
        },
        beforeDestroy(){
            this.destroyPopper();
        },
        methods: {

            destroyPopper() {
                if (this.popper) {
                    this.popper.destroy();
                    this.popper = null;
                }
            },
            open() {

                if (this.$editor.showMenu) {
                    this.fromMenu = true;
                    this.destroyPopper();
                    this.$nextTick(() => {

                        this.popper = new Popper(this.$el, this.$refs.body, {
                            'placement': 'bottom'
                        });
                    })

                } else {
                    this.$menu.showOnly(this.item)
                    this.fromMenu = false;
                }

                this.opened=true;
                this.$emit('opened');
            },

            close() {
                if (this.$editor.showMenu) {
                    this.destroyPopper();
                } else {
                    this.$menu.showOnly()
                }

                this.opened=false;
                this.$emit('closed');
            },

            toggle() {
                if (this.opened) {
                    this.close()
                } else {
                    this.open()
                }
            },
        },

    }
</script>

<style lang="scss">

</style>
