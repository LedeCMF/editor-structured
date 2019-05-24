
class MenuItem {
    constructor(label, command, icon) {
        
        this.label = label
        this._command = command
        this.icon = icon
        
    }
    
    get component() {
        return false;
    }
    
    isActive(editor) {
        return editor.commands[this.command.name] ? editor.commands[this.command.name](this.command.attrs) : false;
    }
    
    isAvailable(editor) {
        return true;
    }
    
    enabled() {
    
    }
    
    command(state) {
    
    }
    
}

export default MenuItem
