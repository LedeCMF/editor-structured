import {Plugin} from "prosemirror-state"
import Vue from 'vue';
import Toolbar from '../components/TableTools';
import {findParentNode} from 'prosemirror-utils'

let Component = null;

class TableToolbar {
    
    constructor(extension, editorView) {
        this.editor = extension.editor;
        this.component = null;
        this.editorView = editorView;
        
    }
    update(view, lastState) {
        if (this.editor.$vm && !this.component) {
            let vm = Vue.extend(Toolbar);
            this.component = new vm({
                parent: this.editor.$vm,
                propsData: {
                    editor: this.editor
                }
            }).$mount();
            this.editorView.dom.parentNode.appendChild(this.component.$el);
        }
        
        if (this.component) {
   
            let state = view.state;
            if (lastState && lastState.doc.eq(state.doc) &&
                lastState.selection.eq(state.selection)) return;
            let predicate = (node) => node.type === state.config.schema.nodes.table;
            let tableNode = findParentNode(predicate)(state.selection);
            this.component.updateSelection(tableNode, view);
            
        }

    }
}


export default function(ext) {
    return new Plugin({
        view(editorView) {
            return new TableToolbar(ext, editorView);
        }
    })
}
