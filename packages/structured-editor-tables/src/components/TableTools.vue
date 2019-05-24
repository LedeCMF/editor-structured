<template>
    <div class="table-toolbar" v-if="node">
        <editor-button v-for="(data, cmd) in commands"
                       :key="cmd"
                       :icon="data.icon"
                       :label="data.label"
                       @click="command(cmd)"></editor-button>
        <div x-arrow></div>
    </div>
</template>

<script>
    import {EditorButton} from '@ledecmf/editor-core'
    import {findDomRefAtPos} from 'prosemirror-utils'
    import Popper from 'popper.js';
    export default {
        name: 'TableTools',
        components: {EditorButton},
        props: ['editor'],
        data() {
            return {
                node: null,
                commands: {
                    addColumnBefore: {icon: 'column_before', label: 'Add column before'},
                    addColumnAfter: {icon: 'column_after', label: 'Add column after'},
                    deleteColumn: {icon: 'column_remove', label: 'Delete column'},
                    addRowBefore: {icon: 'row_before', label: 'Add row before'},
                    addRowAfter: {icon: 'row_after', label: 'Add row after'},
                    deleteRow: {icon: 'row_remove', label: 'Delete row'},
                    mergeCells: {icon: 'column_merge', label: 'Merge cells'},
                  //  splitCell: {icon: 'split_cell', label: 'Split cells'},
                    toggleHeaderRow: {icon: 'row_header', label: 'Make row header'},
                    toggleHeaderColumn: {icon: 'column_header', label: 'Make column header'},
                    deleteTable: {icon: 'trash', label: 'Delete table'},
                },
            }
        },

        beforeDestroy() {
            this.hide();
        },


        methods: {
            command(cmd) {
                this.editor.commands[cmd]()
            },
            updateSelection(node, view) {
                if (node && node.node === this.node) {
                    return
                }

                this.node = node ? node.node : false

                if (this.node) {
                    this.$nextTick(() => {
                        const domAtPos = view.domAtPos.bind(view);
                        const ref = findDomRefAtPos(node.pos, domAtPos);
                        if (ref) {
                            this.popper = new Popper(ref, this.$el);
                        }
                    })
                } else {
                    this.hide();
                }
            },
            hide() {
                if (this.popper) {
                    this.popper.destroy();
                    this.popper = null;
                }
            }
        },
    }
</script>

<style scoped>

</style>
