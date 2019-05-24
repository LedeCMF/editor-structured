import { TextSelection, NodeSelection } from "prosemirror-state"
import { hasParentNode } from 'prosemirror-utils'

/**
 * @typedef {import('prosemirror-view').EditorView} EditorView
 * @typedef {import('prosemirror-state').EditorState} EditorState
 */
class SelectionEvent {
    /**
     *
     * @param {EditorView} view
     * @param {EditorState} lastState
     */
    constructor(view, lastState) {
        /**
         * @type {EditorView}
         * @public
         */
        this.view = view;
        this.lastState = lastState;
        this._parentNodes = null;
        this._parentNode = null;
        this._box = null;
    }
    
    /**
     *
     * @param type
     * @returns {boolean}
     */
    in(type) {
        return hasParentNode(node => node.type.name === type)(this.selection)
    }
    
    /**
     *
     * @returns {Selection<S>}
     */
    get selection() {
        return this.view.state.selection;
    }
    
    /**
     *
     * @returns {*}
     */
    get node() {
        return this.selection.node;
    }
    
    /**
     *
     * @returns {boolean}
     */
    get empty() {
        return this.selection.empty;
    }
    
    /**
     *
     * @returns {EditorState<S>}
     */
    get state() {
        return this.view.state;
    }
    
    /**
     *
     * @returns {Array.<Node>}
     */
    get parentNodes() {
        if (this._parentNodes) {
            return this._parentNodes;
        }
        const { $from, from, to } = this.state.selection;
        this._parentNodes = [];
        for (let i = $from.depth; i > 0; i--) {
            const node = $from.node(i);
            if (node && !this._parentNode) {
                this._parentNode = node;
            }
            this._parentNodes.push(node);
        }
        return this._parentNodes;
    }
    
    /**
     *
     * @returns {Node}
     */
    get parentNode() {
        if (!this._parentNodes) {
            this.parentNodes;
        }
        return this._parentNode;
    }
    
    /**
     *
     * @returns {string}
     */
    get type() {
        if (this.selection instanceof TextSelection) {
            return 'text';
        }
        if (this.selection instanceof NodeSelection) {
            return 'node';
        }
    }
    
    get box() {
        if (!this._box) {
            const { $from, from, to } = this.selection;
            const start = this.view.coordsAtPos(from);
            const end = this.view.coordsAtPos(to);
            this._box = {
                start: start,
                end: end
            }
        }
        return this._box;
    }
    
    get parentElement() {
    
    }
    
}

export default SelectionEvent;
