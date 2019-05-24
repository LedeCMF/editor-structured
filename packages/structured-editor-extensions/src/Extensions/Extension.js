import { Extension as BaseExtension, Plugin } from 'tiptap'
import {nameToLabel} from '@ledecmf/structured-editor-utils'

class Extension extends BaseExtension {
    get icon() {
        return this.name
    }
    
    get label() {
        return nameToLabel(this.name)
    }

    
    isAvailable(state) {
        return true;
    }

}

export default Extension
