import Extension from './Extension'
import {lift} from 'prosemirror-commands'

export default class LiftBlock extends Extension {
    get name() {
        return 'lift_block'
    }
    
    get icon() {
        return 'outdent'
    }
    
    isActive() {
        return false;
    }
    
    isAvailable(editor) {
        return lift(editor.state)
    }
    
    commands() {
        return () => function(state, dispatch, view) {
            return lift(state, dispatch)
        }
        
    }
    
}
