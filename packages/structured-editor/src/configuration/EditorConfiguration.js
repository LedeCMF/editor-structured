import ConfigCollection from './ConfigCollection'

import {Doc, Paragraph, Text} from '@ledecmf/structured-editor-extensions'
import { EditorMenu, InsertMenuCollection } from '@ledecmf/structured-editor-ui'
import ExtensionCollection from './ExtensionCollection'

/**
 * @property { ConfigCollection } extensions
 * @property {ConfigCollection } plugins
 */
class EditorConfiguration {
    
    /**
     *
     */
    constructor() {
        this.extensions = new ExtensionCollection();
        this.extensions.add(new Doc()).add(new Paragraph()).add(new Text())
        this.plugins = new ConfigCollection('name')
        this.selectionMenu = new EditorMenu();
        this.blockMenu = new EditorMenu();
        this.insertMenu = new InsertMenuCollection();
    }
    
}

export default EditorConfiguration
