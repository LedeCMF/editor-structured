import Extension from './Extension'
import {
    findParentNode,
} from 'prosemirror-utils'

export default class InsertAbove extends Extension {
    
    get name() {
        return 'insert_above'
    }
    
    get label() {
        return 'Insert block above'
    }
    
    get icon() {
        return 'insert_above'
    }
    
    isActive() {
        return false
    }
    
    isAvailable(editor) {
        return true
        
    }
    
    commands() {
        return () => function(state, dispatch, view) {
            let tr = state.tr,
                target = null
            
            // If we're on an embedded node, we need to work up the tree
            // to the top node and get the position info from that.
            
            let predicate = (node) => {
                
                if (depth < 2) {
                    target = node
                    return true
                }
                depth--
            }
            let depth = state.selection.$from.depth
            let parent = findParentNode(predicate)(state.selection)
            let pos = parent ? parent.start - 1 : state.selection.$from.pos
            tr.insert(pos,
                state.config.schema.nodes.paragraph.createAndFill())
            view.dispatch(tr)
            
        }
        
    }
}
