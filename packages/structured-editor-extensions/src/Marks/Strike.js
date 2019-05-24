import Mark from './Mark'
import { toggleMark } from 'tiptap-commands'

export default class Strike extends Mark {

  get name() {
    return 'strike'
  }

  get schema() {
    return {
      parseDOM: [
        {
          tag: 's',
        },
        {
          tag: 'del',
        },
        {
          tag: 'strike',
        },
        {
          style: 'text-decoration',
          getAttrs: value => value === 'line-through',
        },
      ],
      toDOM: () => ['del', 0],
    }
  }

  keys({ type }) {
    return {
      'Mod-d': toggleMark(type),
    }
  }

  commands({ type }) {
    return () => toggleMark(type)
  }
}
