import {Mark as BaseMark} from 'tiptap'
import {nameToLabel} from '@ledecmf/structured-editor-utils'

class Mark extends BaseMark {
    get icon() {
        return this.name
    }
    
    get label() {
        return nameToLabel(this.name)
    }
}

export default Mark
