<template>
    <div class="lede-editor-menu-bar" :class="{'is-stuck' : isStuck}"
         :style="{top: isStuck ? settings.offset + 'px' : 'auto', width: width}">
        <div class="menu-inner" ref="menu">
            <template v-for="(item, idx) in items">
                <menu-separator v-if="item==='divider'"></menu-separator>
                <insert-dialog v-else-if="item === 'insert-dialog'" :menu="config.insertMenu" :editor="editor"></insert-dialog>
                <menu-item v-else :item="item" :key="idx" :editor="editor"></menu-item>
            </template>
        </div>
    </div>
</template>

<script>
    import MenuItem from './MenuItem.vue'
    import InsertDialog from './InsertDialog.vue'
    import MenuSeparator from './MenuSeparator.vue'

    function addMenuItems(items, newItems) {
        let labels = [];
        items.forEach((item) => {
            labels.push(item.label + item.icon);
        })

        newItems.forEach((item) => {
            if (labels.indexOf(item.label + item.icon) < 0) {
                items.push(item)
            }

        })
        return items
    }

    export default {
        name: 'MenuBar',
        components: {
            MenuSeparator,
            InsertDialog, MenuItem},
        inject: ['$editor'],
        provide() {
            return {
                '$menu': this,
            }
        },
        props: {
            config: {
                type: Object,
                required: true,
            },

            editor: {
                type: Object,
                required: true,
            },

            settings: {
                type: Object,
                required: true,
            },
        },

        computed: {
            items() {
                let items = []
                items = addMenuItems(items, this.config.selectionMenu.all())
                items.push('divider')
                items = addMenuItems(items, this.config.insertMenu.quickItems())
                items.push('insert-dialog')
                items = addMenuItems(items, this.config.blockMenu.all())
                return items

            },
            width() {
                if (this.isStuck) {
                    return this.$el.getBoundingClientRect().width + 'px'
                }
                return '100%'
            },
        },

        watch: {
            isStuck(val, oldVal) {
                if (val) {
                    this.$editor.$el.style['padding-top'] = this.$el.clientHeight + 'px'
                } else {
                    this.$editor.$el.style['padding-top'] = 0
                }
            },
        },

        data() {
            return {
                isStuck: false,

            }
        },

        mounted() {
            let el = typeof this.settings.scrollElement === 'string' ? document.querySelector(
                this.settings.scrollElement) : this.settings.scrollElement
            el.addEventListener('scroll', this.watchScroll)
        },

        methods: {
            watchScroll(e) {
                if (this.$editor.$el.getBoundingClientRect().top < this.settings.offset) {
                    this.isStuck = true
                } else {
                    this.isStuck = false
                }

            },
        },
    }
</script>

<style lang="scss">
    .lede-editor-menu-bar {
        &.is-stuck {
            position: fixed;
        }

        .menu-inner {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
        }

        .menu-arrow {
            display: none;
        }

        select {
            border-radius: .25rem;
            padding: 0;
            height: 28px;
        }
    }
</style>
