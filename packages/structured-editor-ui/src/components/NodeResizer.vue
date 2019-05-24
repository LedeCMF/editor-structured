<template>
    <div class="lede-node-resizer">
        <slot></slot>

        <template v-if="enabled">
            <div v-for="side in sides" class="resize-handle" :class="'resize-handle-' + side"
                 @mousedown.stop.prevent="startResize"
            ></div>
        </template>

    </div>
</template>

<script>
    import {addEvent, removeEvent} from '@ledecmf/editor-core'

    export default {
        name: 'NodeResizer',
        props: {
            enabled: {
                type: Boolean,
                default: false,
            },
            min: {
                type: Number,
            },
            max: {
                type: Number
            }
        },

        data() {
            return {
                sides: ['top', 'right', 'bottom', 'left'],
                resizing: false,
            }
        },

        methods: {
            startResize(e) {
                this.startPos = event.x
                this.width = parseInt(getComputedStyle(this.$el).width)
                addEvent(document.documentElement, 'mousemove', this.doDrag)
                addEvent(document.documentElement, 'mouseup', this.stopDrag)
                this.resizing = true
                this.$emit('resizeStart')
            },
            stop() {

                removeEvent(document.documentElement, 'mousemove', this.doDrag)
                removeEvent(document.documentElement, 'mouseup', this.stopDrag)
                this.$nextTick(() => {
                    this.resizing = false
                    this.$emit('resize-stop')
                })

            },

            doDrag(event) {
                const dx = this.startPos - event.x
                let newSize = this.width + dx
                if (this.min && newSize < this.min) {
                    return
                }

                if (this.max && newSize>this.max) {
                    return;
                }
                this.$emit('update', newSize)
            },

            stopDrag(event) {
                this.stop()
            },
        },
    }
</script>

<style lang="scss">
    .lede-node-resizer {
        position: relative;

        .resize-handle {
            width: 18px;
            height: 18px;
            position: absolute;
            border-radius: 50%;
            background: #4f8aff;
            border: 2px solid #fff;

            &.resize-handle-left {
                left: -9px;
                top: 50%;
            }

            &.resize-handle-right {
                right: -9px;
                top: 50%;
            }

            &.resize-handle-top {
                top: -9px;
                left: 50%;
            }

            &.resize-handle-bottom {
                bottom: -9px;
                left: 50%;
            }
        }
    }
</style>
