import { Node as BaseNode } from 'tiptap'
import {setBlockType} from 'prosemirror-commands';
import {nameToLabel} from '@ledecmf/structured-editor-utils'


class Node extends BaseNode {
    
    get icon() {
        return this.name
    }
    
    get label() {
        return nameToLabel(this.name)
    }

    
    isAvailable(editor, attrs) {
        const state=editor.state;
        let type = state.schema.nodes[this.name];
        if (!type) {
            return true;
        }
        return setBlockType(type, attrs)(state);
    }

}

export default Node;
