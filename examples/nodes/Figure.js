import {Node} from '@ledecmf/structured-editor-extensions'
import {isFunction} from '@ledecmf/structured-editor-utils'
import FigureComponent from './components/Figure'

export default class Figure extends Node {
    get name() {
        return 'figure'
    }
    
    get icon() {
        return 'image'
    }
    
    get defaultOptions() {
        return {alignment: null, caption: false, link: false, resize: false}
    }
    
    get schema() {
        let that = this
        return {
            // here you have to specify all values that can be stored in this node
            attrs: {
                caption: {default: ''},
                src: {default: ''},
                link: {default: ''},
                align: {default: 'none'},
                width: {default: 'auto'},
                alt: {default: ''},
            },
            group: 'block',
            selectable: true,
            draggable: true,
            // parseDOM and toDOM is still required to make copy and paste work
            parseDOM: [
                {
                    tag: 'figure',
                    getAttrs(node) {
                        let img = node.getElementsByTagName('img')
                        let attrs = {}
                        if (!img.length) {
                            return false
                        }
                        attrs.src = img.item(0).getAttribute('src')
                        if (!attrs.src) {
                            return false
                        }
                        attrs.alt = img.item(0).getAttribute('alt')
                        if (that.options.link &&
                            img.parentNode.nodeName.toLowerCase() === 'a') {
                            attrs.href = img.parentNode.getAttribute('href')
                        }
                        
                        if (that.options.resize) {
                            let width = img.item(0).style.width
                            if (width) {
                                attrs.width = width
                            }
                        }
                        
                        if (that.options.caption) {
                            let caption = node.getElementsByTagName(
                                'figcaption')
                            if (caption.length) {
                                attrs.caption = caption.item(0).innerText
                            }
                        }
                        
                        if (that.options.align) {
                            if (isFunction(that.options.align)) {
                                attrs.align = that.options.align(node, null,
                                    that)
                            } else {
                                Object.keys(that.options.align).
                                    forEach((align) => {
                                        if (that.options.align[align] !==
                                            false) {
                                            let cls = that.options.align[align] ===
                                            true
                                                ? 'align-' + align
                                                : that.options.align[align]
                                            if (node.classList.contains(cls)) {
                                                attrs.align = align
                                            }
                                        }
                                        
                                    })
                            }
                        }
                        return attrs
                        
                    },
                }],
            toDOM(node) {
                let figure = document.createElement('figure')
                let img = document.createElement('img')
                img.setAttribute('src', node.attrs.src)
                if (node.attrs.alt) {
                    img.setAttribute('alt', node.attrs.alt)
                }
                if (that.options.resize && node.attrs.size) {
                    img.style.width = node.attrs.size
                }
                
                if (that.options.link && node.attrs.link) {
                    let link = document.createElement('a')
                    link.setAttribute('href', node.attrs.link)
                    link.appendChild(img)
                    figure.appendChild(link)
                } else {
                    figure.appendChild(img)
                }
                
                if (that.options.caption && node.attrs.caption) {
                    let caption = document.createElement('figcaption')
                    caption.innerText = node.attrs.caption
                    figure.appendChild(caption)
                }
                
                if (that.options.align) {
                    if (isFunction(that.options.align)) {
                        that.options.align(node, figure, that)
                    } else {
                        let cls = that.options.align[node.attrs.align]
                        if (cls) {
                            figure.classList.add(cls)
                        }
                    }
                }
                return figure
                
            },
        }
    }
    
    get view() {
        return FigureComponent
    }
    
    commands({type}) {
        return (attrs) => (state, dispatch) => dispatch(
            state.tr.replaceSelectionWith(type.create(attrs)))
    }
    
    stopEvent(event, vueInstance) {
        
        if (!vueInstance.selected) {
            return false
        }
        
        const isPaste = event.type === 'paste'
        if (isPaste) {
            return false
        }
        
        return true
    }
}
