<template>
    <div class="table-create-button">
        <editor-button icon="table" :label="item.label" :show-label="true" @click="showProps"></editor-button>
         <div v-if="propsOpen" ref="props" class="props-window" v-click-outside="close">
            <table-create-props @select="createTable"></table-create-props>
            <div x-arrow></div>
        </div>
    </div>


</template>

<script>
    import {MenuDropButton} from '@ledecmf/structured-editor-ui'
    import TableCreateProps from './TableCreateProps.vue'
    import { EditorButton } from '@ledecmf/editor-core'
    import Popper from 'popper.js';
    import vClickOutside from 'v-click-outside'
    export default {
        name: 'TableCreateButton',
        components: {EditorButton, TableCreateProps, MenuDropButton},
        directives: {
            clickOutside: vClickOutside.directive
        },
        props: {
            item: Object,
            editor: Object,
            showLabel: Boolean
        },
        inject: ['$editor'],
        data() {

            return {
                propsOpen: false
            }
        },

        beforeDestroy() {
            this.close();
        },

        methods: {
            showProps() {
                this.propsOpen = true;
                this.$nextTick(() => {
                    this.popper = new Popper(this.$el, this.$refs.props);
                })

            },

            close() {
                if (this.popper) {
                    this.popper.destroy();
                    this.popper = null;
                }
                this.propsOpen = false;
            },

            createTable(dims) {
                this.close();
                this.editor.commands.createTable({
                    rowsCount: dims.rows,
                    colsCount: dims.cols,
                    withHeaderRow: false
                });
                this.$emit('exec', this.item);
            }
        }
    }
</script>

<style lang="scss">
    .props-window {
        background:#fff;
        border: 1px solid #ddd;
        padding: 10px;
        border-radius: 4px;
        box-shadow: 1px 1px 2px rgba(0,0,0,0.4);
    }
</style>
