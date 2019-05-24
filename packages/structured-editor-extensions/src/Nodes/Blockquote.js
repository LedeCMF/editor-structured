import Node from './Node';
import { toggleWrap, wrapIn } from 'tiptap-commands'

export default class Blockquote extends Node {
    
    get name() {
        return 'blockquote'
    }
    
    get schema() {
        return {
            content: "block+",
            group: "block",
            defining: true,
            draggable: false,
            attrs: {
                citation: {default: ''},
                citation_url: {default: ''}
            },
    
            parseDOM: [{tag: "blockquote"}],
            toDOM: () => ['blockquote', 0],
        }
    }
    
    commands({ type, schema }) {
        return () => wrapIn(type, schema.nodes.paragraph)
    }
    
    keys({ type }) {
        return {
            'Ctrl->': toggleWrap(type),
        }
    }

   
}
