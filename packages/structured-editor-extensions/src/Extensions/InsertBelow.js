import Extension from './Extension'
import {findParentNode} from 'prosemirror-utils'

export default class InsertBelow extends Extension {
    
    get name() {
        return 'insert_below'
    }
    
    get label() {
        return 'Insert block below'
    }
    
    get icon() {
        return 'insert_below'
    }
    
    isActive() {
        return false
    }
    
    isAvailable(editor) {
        return true
    }
    
    commands() {
        return () => function(state, dispatch, view) {
            let tr = state.tr
            
            // If we're on an embedded node, we need to work up the tree
            // to the top node and get the position info from that.
            const predicate = () => {
                if (depth < 2) {
                    return true
                }
                depth--
            }
            let depth = state.selection.$from.depth
            let parent = findParentNode(predicate)(state.selection)
            let newPos = state.selection.$from.pos + 1
            if (parent) {
                newPos = parent.start + parent.node.nodeSize - 1
            }
            
            tr.insert(newPos,
                state.config.schema.nodes.paragraph.createAndFill())
            view.dispatch(tr)
            
        }
        
    }
}
