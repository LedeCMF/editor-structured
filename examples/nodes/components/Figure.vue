<template>

        <node-options
                v-if="node.attrs.src"
                :selected="selected"
                v-model="alignment"
                :options="options.align"
                class="figure-node"
        >
            <figure class="lede-figure-node" :class="alignClass">
                <node-resizer @update="updateSize" :enabled="options.resize && selected">
                    <img :src="src" :style="{width: imgWidth}"/>
                </node-resizer>

                <editable v-if="options.caption" v-model="caption" wrapper="figcaption" placeholder="Give it a caption"
                          @drag.stop @mousedown.stop @click.stop></editable>

            </figure>
            <template v-slot:options>
                <editor-drop-button icon="label" label="Alternative text">
                    <label>Alternative text</label>
                    <input type="text" v-model="alt">
                </editor-drop-button>
                <editor-drop-button icon="link" label="Link image">
                    <label>Link</label>
                    <input type="text" v-model="alt">
                </editor-drop-button>
                <editor-button v-if="isResized" icon="resize" label="reset size"
                               @click="imgWidth='auto'"></editor-button>
            </template>
        </node-options>
        <div v-else class="figure-node-upload">
            <input type="file" @change="handleUpload" class="file-upload" ref="file">
            <div class="text">Drop file here</div>
            <button type="button" @click="browseClick">Browse files</button>

        </div>
</template>

<script>
    import {Editable} from '@ledecmf/structured-editor'
    import {NodeOptions, NodeAlign, NodeResizer} from '@ledecmf/structured-editor-ui'
    import {EditorButton, EditorDropButton} from '@ledecmf/editor-core'

    export default {
        name: 'Figure.vue',
        components: {EditorDropButton, EditorButton, NodeResizer, NodeOptions, Editable, NodeAlign},
        props: ['node', 'updateAttrs', 'editable', 'options', 'selected'],
        computed: {
            isResized() {

                return this.options.resize && this.imgWidth && this.imgWidth !== 'auto'
            },

            src: {
                get() {
                    return this.node.attrs.src
                },
                set(src) {
                    // we cannot update `src` itself because `this.node.attrs` is immutable
                    this.updateAttrs({
                        src,
                    })
                },
            },

            alignment: {
                get() {
                    return this.node.attrs.align
                },

                set(align) {
                    this.align = align
                    this.updateAttrs({
                        align,
                    })
                },
            },

            alignClass() {
                let cls = {}
                if (this.align && this.options.align && this.options.align[this.align]) {
                    if (this.options.align[this.align] === true) {
                        return 'align-' + this.align
                    }
                    return this.options.align[this.align]
                }
                return cls
            },

            alt: {
                get() {
                    return this.node.attrs.alt
                },

                set(alt) {
                    this.updateAttrs({alt})
                },
            },
            link: {
                get() {
                    return this.node.attrs.link
                },

                set(link) {
                    this.updateAttrs({link})
                },
            },

            caption: {
                get() {
                    return this.node.attrs.caption
                },

                set(caption) {

                    this.updateAttrs({
                        caption,
                    })
                },
            },
        },

        data() {
            return {
                align: this.node.attrs.align,
                imgWidth: this.node.attrs.width && this.node.attrs.width !== 'auto'
                    ? this.node.attrs.width + 'px'
                    : 'auto',
            }
        },
        methods: {

            browseClick() {
                this.$refs.file.click()
            },

            handleUpload(e) {
                function uploadFile(file) {
                    let reader = new FileReader
                    return new Promise((accept, fail) => {
                        reader.onload = () => accept(reader.result)
                        reader.onerror = () => fail(reader.error)
                        reader.readAsDataURL(file)
                    })
                }

                uploadFile(e.target.files[0]).then((file) => {
                    this.updateAttrs({
                        src: file
                    })
                }).catch((err) => {
                    console.error(err);
                })
            },

            updateSize(width) {
                this.imgWidth = width + 'px'
                this.updateAttrs({
                    width,
                })
            },
        },
    }
</script>

<style lang="scss">
    .figure-node-upload {
        min-height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: #f2f2f2;
        border: 1px solid #eee;
        border-radius: 6px;
        padding: 15px;
        margin: 15px 0;
        position: relative;
        .file-upload {
            position: absolute;
            top:0;
            left:0;
            right:0;
            bottom: 0;
            opacity: 0;
        }
        button {
            background:#fff;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            margin-top: 15px;
        }
    }
    .lede-figure-node {
        display: table;
        margin: 0;

        &.align-left, &.align-right {
        }

        &.align-left {
            margin-right: 15px;
            margin-bottom: 15px;
        }

        &.align-right {
            margin-left: 15px;
            margin-bottom: 15px;
        }

        &.align-center {
            margin: 0 auto;
        }

        img {
            max-width: 100%;

        }

        figcaption {
            width: 100%;
            display: table-caption;
            caption-side: bottom;
            font-style: italic;
        }
    }
</style>
