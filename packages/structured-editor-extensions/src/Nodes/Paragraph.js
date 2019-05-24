import {setBlockType} from 'tiptap-commands'
import Node from './Node'

export default class Paragraph extends Node {
    
    get name() {
        return 'paragraph'
    }
    
    get menu() {
        return 'selection'
    }
    
    blockTypes() {
        return true;
    }
    
    get schema() {
        return {
            content: 'inline*',
            group: 'block',
            draggable: false,
            parseDOM: [
                {
                    tag: 'p',
                }],
            toDOM(node) {
                return ['p', 0]
            },
        }
    }
    
    commands({type}) {
        return () => setBlockType(type)
    }
    
}
