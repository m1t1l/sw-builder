export interface IEdge {
  name: string
  size: 1 | 2
  describtion?: string
}

export type EdgeMap = {
  [key: string]: IEdge
}

export class EdgeCollection {
  availabe = { 1: 2, 2: 1 }
  all: EdgeMap
  selected: string[] = []
  onChange: () => void = () => {}
  constructor(all_edges: IEdge[]) {
    const edges: EdgeMap = {}
    for (const e of all_edges) edges[`${e.name}_${e.size}`] = e
    this.all = edges
  }
  add(key: string) {
    if (this.selected.includes(key)) return false
    this.selected.push(key)
    this.onChange()
    return true
  }
  remove(key: string) {
    const index = this.selected.indexOf(key)
    if (index === -1) return false
    const spliced = this.selected.splice(index, 1)
    console.log(`removed: ${spliced}`)
    this.onChange()
    return true
  }
  count() {
    const res = { 1: 0, 2: 0 }
    for (const k of this.selected) res[this.all[k].size] += 1
    return res
  }
  keys = (): string[] => this.selected
}

// tests
if (module.parent === null) {
  const ec = new EdgeCollection([
    { name: 'aa', size: 1 },
    { name: 'aa', size: 2 },
    { name: 'bb', size: 1 },
    { name: 'cc', size: 2 }
  ])

  console.dir(ec)
  ec.add('aa_1')
  ec.add('aa_1')
  ec.add('bb_1')
  ec.remove('bb_1')
  ec.add('cc_2')
  console.dir(ec)
  console.log(ec.count())
}