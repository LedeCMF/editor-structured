import MenuItem from './MenuItem'
import MenuSeparatorComponent from '../components/MenuSeparator.vue';
class MenuSeparator extends MenuItem{
    constructor() {
        super(null, null, null)
    }
    
    command(state) {
        return true;
    }
    
    component() {
        return MenuSeparatorComponent;
    }
}

export default MenuSeparator
