import Hero from './hero'
import { statsTypes } from './types'

const h = new Hero()
h.addStats(statsTypes.agility)
console.dir(h)
// for (let i = 0, levels = [0, 4, 6, 8, 10, 12]; i < levels.length; i++) 
// console.dir(h.upSkill(levels[i], statsTypes.agility))
const stats = h.getStats()
console.dir(stats)
const keys = Object.keys(stats)
keys.map(k)