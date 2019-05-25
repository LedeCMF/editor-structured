import MenuItem from './MenuItem'
import MenuSeparator from '../components/MenuSeparator.vue';
class MenuDivider extends MenuItem{
    constructor() {
        super(null, null, null)
    }
    
    command(state) {
        return true;
    }
    
    component() {
        return MenuSeparator;
    }
}

export default MenuDivider
