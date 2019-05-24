<template>
    <div class="node-align">
        <editor-button icon="align_justify" @click="$emit('update', '')"></editor-button>
        <editor-button icon="align_left" @click="$emit('update', 'left')"></editor-button>
        <editor-button icon="align_center" @click="$emit('update', 'center')">></editor-button>
        <editor-button icon="align_right" @click="$emit('update', 'right')">></editor-button>
    </div>
</template>

<script>
    import {EditorButton} from '@ledecmf/editor-core'
    export default {
        name: 'NodeAlign',
        components: {EditorButton},
        props: {
            value: {
                type: String
            },
            options: {
                type: Object
            }
        }
    }
</script>

<style scoped>

</style>
