import Node from './Node'
import {wrappingInputRule, toggleList} from 'tiptap-commands'
import {wrapInList} from 'prosemirror-schema-list'
import ListItem from './ListItem'

export default class OrderedList extends Node {
    
    get name() {
        return 'ordered_list'
    }
    
    isAvailable({state}) {
        let fn = wrapInList(state.schema.nodes.ordered_list)
        
        return fn(state)
    }
    
    get schema() {
        return {
            attrs: {
                order: {
                    default: 1,
                },
            },
            content: 'list_item+',
            group: 'block',
            parseDOM: [
                {
                    tag: 'ol',
                    getAttrs: dom => ({
                        order: dom.hasAttribute('start') ? +dom.getAttribute(
                            'start') : 1,
                    }),
                },
            ],
            toDOM: node => (node.attrs.order === 1 ? ['ol', 0] : [
                'ol',
                {start: node.attrs.order},
                0]),
        }
    }
    
    commands({type, schema}) {
        return () => toggleList(type, schema.nodes.list_item)
    }
    
    keys({type, schema}) {
        return {
            'Shift-Ctrl-9': toggleList(type, schema.nodes.list_item),
        }
    }
    
    get dependencies() {
        return [new ListItem]
    }
    
}
