import Extension from './Extension'
import { joinUp } from 'prosemirror-commands'

export default class MergeBlock extends Extension {
    get name() {
        return 'merge_block'
    }
    
    get icon() {
        return 'merge'
    }
    
    isActive() {
        return false
    }
    
    isAvailable(editor) {
        return joinUp(editor.state)
    }
    
    commands() {
        return () => function(state, dispatch) {
            return joinUp(state, dispatch)
        }
        
    }
    
}
