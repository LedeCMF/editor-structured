class ConfigCollection {
    
    constructor(keyProp) {
        this._keyProp = keyProp;
        this._items = [];
    }
    
    all() {
        return this._items;
    }
    
    has(key) {
        return !!this.get(key);
    }
    
    get(key) {
        return this._items.find((item) => {return item[this._keyProp] === key});
    }
    
    add(object) {
        this._items.push(object);
        return this;
    }
    
    getIndex(key) {
        this._items.findIndex((item) => {
            return item[this._keyProp] === key;
        })
    }
    
    replace(key, object) {
        let idx = this.getIndex(key);
        
        if (idx > -1) {
            this._items[idx] = object;
            return true;
        } else {
            return false;
        }
    }
    
    remove(key) {
        let idx = this.getIndex(key);
        if (idx > -1) {
            this._items.splice(idx, 1);
            return true;
        } else {
            return false;
        }
    }
}

export default ConfigCollection
