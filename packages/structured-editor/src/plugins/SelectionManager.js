import {Plugin} from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'
import SelectionEvent from '../events/SelectionEvent';

class SelectionManager {
    
    constructor(vm) {
       this._vm = vm;
       
    }
    
    update(view, prevState) {
        let state = view.state;
    
        if (prevState && prevState.doc.eq(state.doc) &&
            prevState.selection.eq(state.selection))
            return;
        
        this._vm.$emit('selection', new SelectionEvent(view, prevState));
    }
}

export default function(vm) {

    return new Plugin({
        view() {
           return new SelectionManager(vm);
        },
        props: {

            decorations: state => {
            
                const decorations = []

                const decorate = (node, pos) => {
                    if (node.type.isBlock && node.childCount === 0) {
                        decorations.push(
                            Decoration.node(pos, pos + node.nodeSize, {
                                class: 'empty-node'
                            })
                        )
                    }
                }
            
                state.doc.descendants(decorate)
            
                return DecorationSet.create(state.doc, decorations)
            }
        }
    })
}
