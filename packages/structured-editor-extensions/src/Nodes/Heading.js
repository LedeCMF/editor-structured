import Node from './Node';
import { getMarkRange } from 'tiptap-utils'
import { setBlockType, textblockTypeInputRule, toggleBlockType } from 'tiptap-commands'

export default class extends Node {
    
    get name() {
        return 'heading'
    }
    

    get defaultOptions() {
        return {
            levels: [2, 3, 4, 5],
        }
    }
    
    blockTypes(typeMenu) {

       this.options.levels.forEach((level) => {
            typeMenu.add('heading ' + level, 'heading', {level: level})
        });
     
    }

    get schema() {
    
        return {
            attrs: {
                level: {
                    default: 2,
                },
            },
            content: 'text*',
            marks: '',
            group: 'block',
            defining: true,
            draggable: false,
            parseDOM: this.options.levels
                .map(level => ({
                    tag: `h${level}`,
                    attrs: { level },
                })),
            toDOM: node => [`h${node.attrs.level}`, 0],
        }
    }
    
    commands({type}) {
        return attrs => {
            return setBlockType(type, attrs);
        }
    }

}
