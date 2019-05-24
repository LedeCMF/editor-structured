import {Editor as BaseEditor} from 'tiptap'
import {DOMSerializer} from 'prosemirror-model'
import ComponentView from './ComponentView'

class Editor extends BaseEditor {
    
    setParentComponent(component = null) {
        super.setParentComponent(component);
        this.$vm = component;
    }
    dispatchTransact1ion(transaction) {
        this.state = this.state.apply(transaction)
        this.view.updateState(this.state)
        this.setActiveNodesAndMarks()
        
        if (!transaction.docChanged) {
            return
        }
        
        this.emitUpdate(transaction)
    }
    
    initNodeViews({parent, extensions, editable}) {
        return extensions.filter(
            extension => ['node', 'mark'].includes(extension.type)).
            filter(extension => extension.view).
            reduce((nodeViews, extension) => {
                const nodeView = (node, view, getPos, decorations) => {
                    const component = extension.view
                    
                    return new ComponentView(component, {
                        extension,
                        parent,
                        node,
                        view,
                        getPos,
                        decorations,
                        editable,
                    })
                }
                
                return {
                    ...nodeViews,
                    [extension.name]: nodeView,
                }
            }, {})
    }
    
    createPlugins() {
        let plugins = this.extensions.plugins
        if (Array.isArray(this.options.plugins)) {
            plugins = plugins.concat(this.options.plugins)
        }
        return plugins
    }
    
    getHTML() {
        
        const div = document.createElement('div')
        const fragment = DOMSerializer.fromSchema(this.schema).
            serializeFragment(this.state.doc.content)
        
        div.appendChild(fragment)
        Array.prototype.slice.call(div.getElementsByTagName('remove-me')).
            forEach(
                function(item) {
                    item.remove()
                    // or item.parentNode.removeChild(item); for older browsers (Edge-)
                })
        let removeEmpty = [
            'p',
            'blockquote',
            'a',
            'li',
            'ol',
            'ul',
            'em',
            'del',
            'strong',
            'u']
        removeEmpty.forEach((intent) => {
            Array.prototype.slice.call(div.getElementsByTagName(intent)).
                forEach(
                    function(item) {
                        if (item.innerHTML === '') {
                            item.remove()
                        }
                        // or item.parentNode.removeChild(item); for older browsers (Edge-)
                    })
        })
        
        return div.innerHTML
    }
    
}

export default Editor
