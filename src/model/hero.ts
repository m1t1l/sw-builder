export let dice = (sides: number): number => Math.random() * sides + 1 | 0
import { heroSkills, statsTypes, heroStats, levels } from './types'
import { skills } from './data'

export default class Hero {
  private stats: heroStats = {
    [statsTypes.agility]: levels.d4,
    [statsTypes.smarts]: levels.d4,
    [statsTypes.spirit]: levels.d4,
    [statsTypes.strength]: levels.d4,
    [statsTypes.vigor]: levels.d4
  }
  private skills = skills.slice()
  private stats_points: number = 5
  private skill_points: number = 15

  addStats = (t: statsTypes, add: boolean = true) => {
    if (this.stats_points === 0 && add) return false
    const sign = add ? 1 : -1
    const newValue = this.stats[t] + 2 * sign
    console.log(newValue, newValue in levels)
    if (newValue in levels) {
      this.stats[t] = newValue
      this.stats_points -= sign
      return true
    }
    return false
  }

  addSkill = (name: string, add: boolean = true) => {
    const levels_min = levels.d4,
      // levels_max = levels.d12,
      sign = add ? 1 : -1

    const index = this.skills.findIndex(s => s.name === name)
    if (index === -1) throw new Error(`unkown skill ${name}`)
    const s = this.skills[index]
    const newValue = add ?
      s.value === 0 ? levels_min : s.value + 2 :
      s.value === levels_min ? 0 : s.value - 2
    if (!((newValue in levels) || newValue === 0)) {
      console.log(`wrong new value for skill: ${newValue}`)
      return false
    }
    const points = add ?
      newValue > this.stats[s.attribute] ? 2 : 1 : // new value more than attr
      s.value > this.stats[s.attribute] ? 2 : 1    // old value more than attr
    if (this.skill_points - points * sign < 0) {
      console.log(`no more skill points`)
      return false
    }
    s.value = newValue
    this.skill_points -= points * sign
    this.skills[index] = s
    return true
  }
}
