import MenuItem from './MenuItem'
import {Node, Mark, Extension} from '@ledecmf/structured-editor-extensions'
import {isFunction} from '@ledecmf/structured-editor-utils'

import ExtensionMenuItem from './ExtensionMenuItem'

class EditorMenu {
    
    constructor() {
        this._items = []
        
    }
    
    add(label, command, icon) {
        this._items.push(this.transformItem(label, command, icon));
        return this;
    }
    
    transformItem(label, command, icon) {
        if (command) {
            command = typeof command === 'object' ? command : {command: command}
            return new MenuItem(label, command, icon)
            
        } else if (this.isExtension(label)) {
            
            return new ExtensionMenuItem(label)
        } else if (isFunction(label)) {
            return label()
        } else {
            return label
        }
    }
    
    isExtension(item) {
        return item &&
            (item instanceof Node || item instanceof Mark || item instanceof
                Extension)
    }
    
    all() {
        return this._items
    }
}

export default EditorMenu
