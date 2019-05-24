<template>
    <transition name="lede-editor-dialog">

        <div class="lede-editor-dialog">
            <div class="dialog-window">
                <div class="dialog-header">
                    <div class="inner">
                        <slot name="header"></slot>
                    </div>

                    <div class="close">
                        <editor-button icon="close" @click="$emit('close')"></editor-button>
                    </div>

                </div>
                <div class="dialog-body">
                    <slot></slot>
                </div>
                <div class="dialog-footer" v-if="$slots.actions">
                    <slot name="actions"></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import {EditorButton} from '@ledecmf/editor-core'

    export default {
        name: 'EditorDialog',
        components: {EditorButton},
    }
</script>

<style lang="scss">
    .lede-editor-dialog-enter,
    .lede-editor-dialog-leave-active {
        opacity: 0;
    }

    .lede-editor-dialog-enter-active,
    .lede-editor-dialog-leave-active {
        transition: opacity .25s ease
    }
    .lede-editor-dialog {
        z-index: 500;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;

        .dialog-window {
            background: #fff;
            border-radius: 4px;
            max-height: 95%;
            display: flex;
            flex-direction: column;
        }

        .dialog-header {
            padding: 15px;
            font-size: 16px;
            font-weight: bold;
            border-bottom: 1px solid #ccc;
            display: flex;
            align-items: center;

            .inner {
                flex: 1;
            }

        }

        .dialog-body {
            overflow: auto;
            padding: 15px;
            flex: 1;
        }
    }
</style>
