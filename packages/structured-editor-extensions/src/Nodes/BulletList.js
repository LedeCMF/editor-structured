import Node from './Node'
import {wrappingInputRule, toggleList} from 'tiptap-commands'
import {wrapInList} from 'prosemirror-schema-list'
import ListItem from './ListItem'

export default class BulletList extends Node {
    
    get name() {
        return 'bullet_list'
    }
    
    isAvailable(editor) {
        const state = editor.state;
        
        let fn = wrapInList(state.schema.nodes.bullet_list)
        
        return fn(state)
    }
    
    get schema() {
        return {
            content: 'list_item+',
            group: 'block',
            parseDOM: [
                {tag: 'ul'},
            ],
            toDOM: () => ['ul', 0],
        }
    }
    
    commands({type, schema}) {
        return () => toggleList(type, schema.nodes.list_item)
    }
    
    keys({type, schema}) {
        return {
            'Shift-Ctrl-8': toggleList(type, schema.nodes.list_item),
        }
    }
    
    get dependencies() {
     
        return [new ListItem]
    }
   
}
