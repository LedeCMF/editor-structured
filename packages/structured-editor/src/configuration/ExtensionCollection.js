import ConfigCollection from './ConfigCollection'

class ExtensionCollection extends ConfigCollection {
    
    constructor() {
        super('name')
        
    }
    
    all() {
        this._items.forEach((item) => {
            if (item.dependencies) {
                item.dependencies.forEach((dep) => {
                    if (!this.has(dep.name)) {
                        this.add(dep);
                    }
                })
            }
        })
        return this._items;
    }
    
}

export default ExtensionCollection;
