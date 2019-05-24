
import { Plugin, TextSelection } from 'tiptap'
import { updateMark, removeMark} from 'tiptap-commands'
import { getMarkRange } from 'tiptap-utils'
import LinkButton from './components/LinkButton.vue';
import Mark from './Mark';

export default class Link extends Mark {

    
    get name() {
        return 'link'
    }
    
    get menu() {
        return LinkButton
    }

    get schema() {
        return {
            attrs: {
                href: {
                    default: null,
                },
            },
            inclusive: false,
            parseDOM: [
                {
                    tag: 'a[href]',
                    getAttrs: dom => ({
                        href: dom.getAttribute('href'),
                    }),
                },
            ],
            toDOM: (node) => {
   
                return ['a', {
                    target: '_blank',
                    ...node.attrs,
                //    rel: 'noopener noreferrer nofollow',
                }, 0];
                
            }
        }
    }

    commands({ type }) {
        return attrs => {
            if (attrs.href) {
                return updateMark(type, attrs)
            }

            return removeMark(type)
        }
    }

    get button() {
        return LinkButton;
    }


    get plugins() {
        return [
            new Plugin({
                props: {
                    handleClick(view, pos) {
                        const { schema, doc, tr } = view.state
                        const range = getMarkRange(doc.resolve(pos), schema.marks.link)

                        if (!range) {
                            return
                        }

                        const $start = doc.resolve(range.from)
                        const $end = doc.resolve(range.to)
                        const transaction = tr.setSelection(new TextSelection($start, $end))

                        view.dispatch(transaction)
                    },
                },
            }),
        ]
    }
}
