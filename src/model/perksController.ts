import { Hindrance, Edge } from './data-edges'
import { EdgeCollection, IEdge } from './edgeCollection'
import { PerkCollection } from './perksCollection'
import Hero from './hero'

export interface IPerkTotals {
  perks: number
  perks_total: number
  edges: number
  edges_total: number
  hindrances: {
    1: number
    2: number
  }
  hindrances_total: {
    1: number
    2: number
  }
}

export default class PerksController {
  edges: EdgeCollection
  hindrances: EdgeCollection
  perks: PerkCollection
  constructor(edges: Edge[], hindrances: Hindrance[], perks: IEdge[], hero: Hero) {
    this.edges = new EdgeCollection(edges)
    this.hindrances = new EdgeCollection(hindrances)
    const actions = {
      'добавить аттрибут_2_add': () => hero.addStatsPoint(1),
      'добавить аттрибут_2_remove': () => hero.addStatsPoint(-1),
      'приобрести черту_2_add': () => this.edges.availabe[1] += 1,
      'приобрести черту_2_remove': () => this.edges.availabe[1] -= 1,
      'добавить навык_1_add': () => hero.addSkillPoint(1),
      'добавить навык_1_remove': () => hero.addSkillPoint(-1),
      'добавить денег_1_add': () => console.log('add money'),
      'добавить денег_1_remove': () => console.log('remove money'),
    }
    this.perks = new PerkCollection(perks, actions)
    this.perks.availabe = { 2: 0, 1: 0 }
    this.edges.availabe = { 2: 0, 1: 0 }
  }
  getPoints(): IPerkTotals {
    const hindrances = { 2: 0, 1: 0 }
    for (const key of this.hindrances.selected) hindrances[this.hindrances.all[key].size] += 1
    const perks_total = hindrances[1] + hindrances[2] * 2
    let perks = 0
    for (const p of this.perks.selected) perks += this.perks.all[p].size
    const edges = this.edges.selected.length
    return {
      perks,
      perks_total,
      edges,
      edges_total: this.edges.availabe[1],
      hindrances,
      hindrances_total: this.hindrances.availabe
    }

  }
}

// const hero = new Hero()
// const pc = new PerksController(edges, hindrances, perks, hero)

// pc.perks.add('add_attr_2')
// // pc.perks.add('+1 очко к характеристикам_2_remove')
// console.dir(hero)