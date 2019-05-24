import {Node} from '@ledecmf/structured-editor-extensions'
import Toolbar from './plugins/Toolbar'
import {
    tableEditing,
    columnResizing,
    goToNextCell,
    addColumnBefore,
    addColumnAfter,
    deleteColumn,
    addRowBefore,
    addRowAfter,
    deleteRow,
    deleteTable,
    mergeCells,
    splitCell,
    toggleHeaderColumn,
    toggleHeaderRow,
    toggleHeaderCell,
    setCellAttr,
    fixTables,
} from 'prosemirror-tables'
import {createTable} from 'prosemirror-utils'
import TableNodes from './TableNodes'
import TableRow from './TableRow'
import TableHeader from './TableHeader'
import TableCell from './TableCell'
import TableCreateButton from './components/TableCreateButton.vue'

import table from '@mdi/svg/svg/table.svg'
import column_before from '@mdi/svg/svg/table-column-plus-before.svg'
import column_after from '@mdi/svg/svg/table-column-plus-after.svg'
import column_remove from '@mdi/svg/svg/table-column-remove.svg'
import column_merge from '@mdi/svg/svg/table-column-width.svg'
import row_before from '@mdi/svg/svg/table-row-plus-before.svg'
import row_after from '@mdi/svg/svg/table-row-plus-after.svg'
import row_remove from '@mdi/svg/svg/table-row-remove.svg'
import row_merge from '@mdi/svg/svg/table-row-height.svg'
import split_cell from '@mdi/svg/svg/table-border.svg'
import row_header from './svg/table-header-row.svg'
import column_header from './svg/table-header-col.svg'

import {Icons} from '@ledecmf/editor-core'

Icons.set('table', table).
    set('column_before', column_before).
    set('column_after', column_after).
    set('column_remove', column_remove).
    set('column_merge', column_merge).
    set('row_before', row_before).
    set('row_after', row_after).
    set('row_remove', row_remove).
    set('row_merge', row_merge).
    set('split_cell', split_cell).
    set('row_header', row_header).
    set('column_header', column_header)
export default class Table extends Node {
    
    get name() {
        return 'table'
    }
    
    get icon() {
        return 'table'
    }
    
    get menu() {
        return TableCreateButton
    }
    
    get schema() {
        return TableNodes.table
    }
    
    get defaultOptions() {
        
        return {
            resizable: false,
        }
    }
    
    commands({schema}) {
        return {
            createTable: ({rowsCount, colsCount, withHeaderRow}) => (
                (state, dispatch) => {
                    const nodes = createTable(schema, rowsCount, colsCount,
                        withHeaderRow)
                    const tr = state.tr.replaceSelectionWith(nodes).
                        scrollIntoView()
                    dispatch(tr)
                }
            ),
            addColumnBefore: () => addColumnBefore,
            addColumnAfter: () => addColumnAfter,
            deleteColumn: () => deleteColumn,
            addRowBefore: () => addRowBefore,
            addRowAfter: () => addRowAfter,
            deleteRow: () => deleteRow,
            deleteTable: () => deleteTable,
            toggleCellMerge: () => (
                (state, dispatch) => {
                    if (mergeCells(state, dispatch)) {
                        return
                    }
                    splitCell(state, dispatch)
                }
            ),
            mergeCells: () => mergeCells,
            splitCell: () => splitCell,
            toggleHeaderColumn: () => toggleHeaderColumn,
            toggleHeaderRow: () => toggleHeaderRow,
            toggleHeaderCell: () => toggleHeaderCell,
            setCellAttr: () => setCellAttr,
            fixTables: () => fixTables,
        }
    }
    
    keys() {
        return {
            Tab: goToNextCell(1),
            'Shift-Tab': goToNextCell(-1),
        }
    }
    
    get plugins() {
        return [
            new Toolbar(this),
            ...(this.options.resizable ? [columnResizing()] : []),
            tableEditing(),
        ]
    }
    
    get dependencies() {
        
        return [new TableHeader(), new TableRow, new TableCell]
    }
    
}
