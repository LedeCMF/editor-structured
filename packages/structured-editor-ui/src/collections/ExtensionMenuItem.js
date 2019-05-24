import MenuItem from './MenuItem'
import {isFunction} from '@ledecmf/structured-editor-utils'

class ExtensionMenuItem extends MenuItem {
    constructor(item) {
        super(item.label, item, item.icon);
      
    }
    
    get component() {
        return this._command.menu;
    }
    
    
    command(editor, attrs) {
        if (!attrs) {
            attrs = {};
        }
         editor.commands[this._command.name](attrs);
    }
    
    isActive(editor) {
        if (isFunction(this._command.isActive)) {
            return this._command.isActive(editor);
        }
        return editor.isActive[this._command.name]();
    }
    
    isAvailable(editor) {
  
        if (isFunction(this._command.isAvailable)) {
            return this._command.isAvailable(editor);
        }
        return true;
    }
}

export default ExtensionMenuItem;
