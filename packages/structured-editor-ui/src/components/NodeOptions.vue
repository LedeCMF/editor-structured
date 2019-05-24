<template>
    <div class="node-has-options" :class="{'is-selected' : selected}" :lede-align="value">
        <div class="options-inner">
            <slot></slot>
            <div class="node-options" v-if="selected">
                <template v-if="options">
                    <editor-button icon="align_justify" @click="$emit('input', '')" v-if="!notAligned"
                                   label="Align none"
                    ></editor-button>
                    <editor-button icon="align_left" @click="$emit('input', 'left')"
                                   label="Align left"
                                   v-if="value !== 'left'"></editor-button>
                    <editor-button icon="align_center" @click="$emit('input', 'center')"
                                   label="Align center"
                                   v-if="value !== 'center'"></editor-button>
                    <editor-button icon="align_right" @click="$emit('input', 'right')"
                                   label="Align right"
                                   v-if="value !== 'right'"></editor-button>
                </template>
                <slot name="options"></slot>
            </div>
        </div>

    </div>
</template>

<script>
    import {EditorButton} from '@ledecmf/editor-core'
    import NodeResizer from './NodeResizer'

    export default {
        name: 'NodeOptions',
        components: {NodeResizer, EditorButton},
        props: {
            selected: Boolean,
            value: {
                type: String,
            },
            options: {
                type: Object,
            },
        },

        computed: {
            notAligned() {
                return this.value !== 'left' && this.value !== 'right' && this.value !== 'center'
            },
        },
    }
</script>

<style lang="scss">
    .node-has-options {
        width: auto;
        margin: 0 auto;

        .options-inner {
            position: relative;
        }

        .node-options {
            background: #fff;
            border: 1px solid #ccc;
            padding: 5px;
            position: absolute;
            right: 0;
            bottom: 100%;
            display: flex;
            align-items: center;
        }

        &[lede-align="left"] {
            width: 100%;
            height: 0;
            z-index: 50;

            .options-inner {
                float: left;
            }

            .node-options {
                left: 0;
                right: auto;
            }
        }

        &[lede-align="right"] {
            width: 100%;
            height: 0;
            z-index: 50;

            .options-inner {
                float: right;
            }
        }

        &[lede-align="center"] {
            display: flex;
            justify-content: center;

            .options-inner {
                display: inline-block;
                margin: 0 auto;
            }
        }
    }
</style>
