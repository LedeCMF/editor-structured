<template>
    <div class="menu-item">
        <component v-if="item.component" :is="item.component" :item="item" :editor="editor" :show-label="showLabel" @exec="$emit('exec', item)"></component>
        <editor-button
                v-else-if="item.isAvailable(editor)"
                :show-label="showLabel"
                :icon="item.icon"
                :label="item.label"
                :active="item.isActive(editor)"
                @click="extensionCommand(item)"></editor-button>
    </div>
</template>

<script>
    import {EditorButton} from '@ledecmf/editor-core'

    export default {
        name: 'MenuItem',
        components: {EditorButton},
        props: {
            item: {
                type: Object,
                required: true
            },

            editor : {
                type: Object,
                required: true
            },

            showLabel: Boolean
        },


        methods: {

            extensionCommand(item) {
                item.command(this.editor)
                this.$emit('exec', item);
            },
        },

         mounted() {
         }
    }
</script>

<style scoped>

</style>
