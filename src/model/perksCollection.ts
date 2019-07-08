import { EdgeCollection, IEdge } from './edgeCollection'

type ActionList = {
  [key: string]: () => void
}

export class PerkCollection extends EdgeCollection {
  actions: ActionList
  constructor(all_perks: IEdge[], actions: any) {
    super(all_perks)
    this.actions = actions
  }
  add(key: string): boolean {
    this.selected.push(key)
    const action_name = `${key}_add`
    console.log(`action name is ${action_name}`)
    this.actions[`${action_name}`]()
    this.onChange()
    return true
  }
  remove(key: string): boolean {
    const index = this.selected.indexOf(key)
    if (index === -1) return false
    const spliced = this.selected.splice(index, 1)
    console.log(`removed: ${spliced}`)
    this.actions[`${key}_remove`]()
    this.onChange()
    return true
  }
}

/// TESTS
// if (module.parent === null) {
//   const pc = new PerkCollection([
//     { name: 'aa', size: 1 },
//     { name: 'bb', size: 2 }
//   ],
//     {
//       aa_1_add: () => console.log('aa 1 add'),
//       bb_2_add: () => console.log('bb 2 add'),
//       aa_1_remove: () => console.log('aa 1 remove'),
//       bb_2_remove: () => console.log('bb 2 remove')
//     }
//   )
//   console.dir(pc)
//   pc.add('aa_1')
//   console.dir(pc)
//   pc.remove('aa_1')
// }