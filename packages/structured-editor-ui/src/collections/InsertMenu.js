import EditorMenu from './EditorMenu'

class InsertMenuCollection extends EditorMenu {

    constructor() {
        super();
        this._quick=[];
        this.settings = {
            collapse: 200
        }
    }
    
    set(setting, value) {
        this.settings[setting] = value;
        return this;
    }
    quick(label, icon, command) {
        let item = this.transformItem(label, icon, command);
        this._quick.push(item);
        this._items.push(item);
        return this;
    }
    
    quickItems() {
        return this._quick;
    }
}

export default InsertMenuCollection
