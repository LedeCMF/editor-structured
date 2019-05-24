import MenuItem from './MenuItem'
import MenuSeparatorComponent from '../components/MenuSeparator';
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
