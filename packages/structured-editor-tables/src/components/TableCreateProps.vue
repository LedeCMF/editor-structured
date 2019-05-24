<template>
    <div class="table-create-dialog">
        <div class="select-row" v-for="(row, rIdx) in cells" :key="rIdx">
            <div class="select-cell"
                 v-for="(col, cIdx) in row"
                 :key="cIdx"
                   :class="{'on' : col}"
                 @mouseover="mouseOver(rIdx + 1,cIdx + 1)"
                 @click="select(rIdx + 1,cIdx + 1)"
            >

            </div>
        </div>
        <div class="dimensions-input">
            <div class="input-item">
                <label for="rowInput">Rows</label> <input type="number" id="rowInput" v-model="activeRow">
            </div>
            <div class="input-item">
                <label for="colInput">Cols</label> <input type="number" id="colInput" v-model="activeCol">
            </div>
            <div class="input-item">
                <button @click="insert">Create</button>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'TableCreateProps',
        props: {
            rows: {
                type: Number,
                default: 10
            },

            cols: {
                type: Number,
                default: 10
            }
        },
        computed: {
            cells() {
                let rows = [];
                for (let r = 0; r < this.rows; r++) {
                    let cells = [];
                    for (let c = 0; c< this.cols; c++ ) {
                        let active = r < this.activeRow && c < this.activeCol;
                        cells.push(active);
                    }
                    rows.push(cells);
                }
                return rows;
            }
        },

        data() {
            return {
                activeRow: 1,
                activeCol:1
            }
        },

        methods: {
            mouseOver(row, col) {
                this.activeRow = row;
                this.activeCol = col;
            },

            select(row,col) {
                this.$emit('select', {
                    rows: row ,
                    cols: col
                })
            },

            insert() {
                this.select(this.activeRow, this.activeCol)
            }
        },
    }
</script>

<style lang="scss">
    .table-create-dialog {
        display: inline-block;
        .select-row {
            display: flex;
        }

        .select-cell {
            border:1px solid #ccc;
            width: 12px;
            height: 12px;
            margin: 1px;
            cursor: pointer;
            &.on {
                background: #6780b7;
            }
        }

        .dimensions-input {
            label {
                display: inline-block;
                font-weight: bold;
                width:50px;
            }
            .input-item {
                margin-bottom: 10px;
                &:last-child {
                    margin-bottom: 0;
                    text-align: center;
                }
            }
            input {
                border: 1px solid #ddd;
                padding: 4px;
                border-radius: 4px;
                width: 60px;
            }
            button {
                background: transparent;
                border:1px solid #ddd;
                padding: 5px 8px;
                border-radius: 4px;
                background:#efefef;
            }
        }
    }
</style>
