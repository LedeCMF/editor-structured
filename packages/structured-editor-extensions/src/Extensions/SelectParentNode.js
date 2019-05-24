import Extension from './Extension'
import {selectParentNode} from 'prosemirror-commands'

export default class SelectParentNode extends Extension {
    get name() {
        return 'select_parent_block'
    }
    
    get icon() {
        return 'select_up'
    }
    
    isActive() {
        return false;
    }
    
    isAvailable(editor) {
        return selectParentNode(editor.state)
    }
    
    commands() {
        return () => function(state, dispatch, view) {
            return selectParentNode(state, dispatch, view)
        }
        
    }
   
}
