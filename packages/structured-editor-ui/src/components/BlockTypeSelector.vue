<template>
    <div class="lede-block-selector">
        <select v-model="activeBlock">
            <option v-for="(type, idx) in types" :value="type" v-text="type.label" :key="idx"></option>
        </select>
    </div>
</template>

<script>
    import {setBlockType} from 'prosemirror-commands';
    export default {
        name: 'BlockTypeSelector',
        inject: ['$editor'],
        props: {
            editor: {
                type: Object,
                required: true,
            },

            item: Object,
        },

        computed: {
            types() {
                return this.item.all()
            },
            activeBlock: {
                get() {
                    let active = null
                    this.types.forEach((type) => {
                        if (this.editor.isActive[type.command] &&
                            this.editor.isActive[type.command](type.attrs)) {
                            active = type
                        }
                    })
                    return active
                },

                set(type) {
                    this.editor.commands[type.command](type.attrs)
                },
            },
        },

    }
</script>

<style scoped>

</style>
