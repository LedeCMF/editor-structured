<template>
    <component :is="wrapper" :contenteditable="editable" @focus="$emit('focus')"
               @input="doUpdate" ref="input"
               :placeholder="placeholder"
               @blur="$emit('blur')"
               class="lede-editable"
               @paste="onPaste"
               :class="{'is-empty' : isEmpty}"
               @keydown="checkKey"
               v-text="input"
    >

    </component>
</template>

<script>
export default {
    name: 'Editable',
    props: {
        wrapper: {
            type: String,
            default: 'div',
        },

        placeholder: {
            type: String,
            default: ''
        },

        editable: {
            type: Boolean,
            default: true,
        },

        value: {},

        textOnly: {
            type: Boolean,
            default: true,
        },

        singleLine: {
            type: Boolean,
            default: true
        }
    },

    computed: {
        isEmpty() {
            return this.value === '';
        },
    },
    data() {
        return {
            input: this.value + '',
        }
    },

    mounted() {
      window.addEventListener('click', this.checkMouse);
    },

    beforeDestroy() {
        window.removeEventListener('click', this.checkMouse);
    },

    methods: {
        onPaste(e) {
            e.preventDefault();

            // get text representation of clipboard
            let text = (e.originalEvent || e).clipboardData.getData('text/plain');
            if (this.singleLine) {
                text=text.replace(/(\r\n|\n|\r)/gm, ' ');
            }

            // insert text manually
            document.execCommand("insertHTML", false, text);
        },
        checkMouse(e) {
            if (!this.$refs.input.contains(e.target)) {
                this.$emit('blur');
            }
        },

        checkKey(e) {
          if (this.singleLine && e.keyCode === 13) {
              e.preventDefault();
              this.$emit('enter');
          }

        },

        doUpdate() {
            let val = this.textOnly ? this.$refs.input.textContent : this.$refs.input.innerHTML
            this.$emit('input', val)
        },
    },
}
</script>
