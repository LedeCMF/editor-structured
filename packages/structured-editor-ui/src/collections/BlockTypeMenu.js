import MenuItem from './MenuItem'
import {Node} from '@ledecmf/structured-editor-extensions'

import BlockTypeSelector from '../components/BlockTypeSelector'

class BlockTypeMenu extends MenuItem {
    constructor() {
        super()
        this._items = []
        this._items.push({
            label: 'paragraph',
            command: 'paragraph',
            attrs: {},
        })
    }
    
    get component() {
        return BlockTypeSelector
    }
    
    add(label, command, attrs) {
        if (label instanceof Node) {
            label.blockTypes(this)
        } else {
            this._items.push({
                label: label,
                command: command,
                attrs: attrs,
            })
        }
        return this
    }
    
    all() {
        return this._items
    }
    
}

export default BlockTypeMenu
