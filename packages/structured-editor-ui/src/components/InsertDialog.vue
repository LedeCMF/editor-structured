<template>
    <div class="node-insert-dialog">
        <editor-button icon="add" label="Browse more blocks" @click="showItems=true"></editor-button>
        <editor-dialog v-show="showItems" @close="showItems=false">
            <template v-slot:header>Insert new block</template>
            <div class="insert-items">

                <div class="insert-item" v-for="item in items">
                    <menu-item :show-label="true" :item="item" :editor="editor" @exec="showItems = false"></menu-item>
                </div>
            </div>
        </editor-dialog>
    </div>
</template>

<script>
    import EditorDialog from './EditorDialog'
    import {EditorButton, EditorIcon} from '@ledecmf/editor-core'
    import MenuItem from './MenuItem.vue'
    export default {
        name: 'InsertDialog',
        inject: ['$editor'],
        components:{MenuItem, EditorDialog, EditorButton, EditorIcon},
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
                showItems: false,
            }
        },

        methods: {
            insert(item) {
                item.command(this.editor)
                this.showItems = false;
            }
        },

    }
</script>

<style lang="scss">
    .node-insert-dialog {
        .insert-items {
            min-width: 250px;
        }

        .insert-item {
            margin: 10px 0;
            align-items: center;
            cursor: pointer;
            button {
                text-align: left;
            }

            .menu-item {
                width: 100%;
                display: block;
            }
            .editor-icon {
                margin-right: 15px;
            }
            .lede-editor-button {
                display:flex;
                align-items: center;
                width: 100%;
                padding:10px 5px;
            }
            .lede-editor-button:hover {
                background: #2cb5ff;
                color: #fff;

                svg {
                    fill: #fff;
                }
            }
        }
    }
</style>
