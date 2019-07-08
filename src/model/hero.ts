import { heroSkills, statsTypes, heroStats, levels, heroSkill } from './types'
import { skills } from './data'


// export const dice = (sides: number): number => Math.random() * sides + 1 | 0

export default class Hero {
  private stats: heroStats = {
    [statsTypes.agility]: levels.d4,
    [statsTypes.smarts]: levels.d4,
    [statsTypes.spirit]: levels.d4,
    [statsTypes.strength]: levels.d4,
    [statsTypes.vigor]: levels.d4
  }
  private skills = skills.slice()
  private readonly SKILL_LEVELS = [0, 4, 6, 8, 10, 12]
  private stats_points: number = 5
  addStatsPoint = (n: number) => {this.stats_points += n}
  private skill_points: number = 15
  private max_skill_points: number = 15
  addSkillPoint = (n: number) => {
    this.max_skill_points += n
    this.computeSkillPoints()
  }
  getStats = () => this.stats
  getPoints = () => ({
    attributes: this.stats_points,
    skills: this.skill_points,
    skills_total: this.max_skill_points
  })
  getSkills = () => this.skills
  addStats = (t: statsTypes, add: boolean = true) => {
    const sign = add ? 1 : -1
    const newValue = this.stats[t] + 2 * sign
    if (newValue in levels) {
      this.stats[t] = newValue
      this.stats_points -= sign
      this.computeSkillPoints()
      return true
    }
    return false
  }
  computeSkillPoints() {
    const skills = this.skills.filter(s => s.value !== 0)
    let total_points = 0
    for (const skill of skills) {
      const attr_value = this.stats[skill.attribute]
      for (let i = 0; i < this.SKILL_LEVELS.indexOf(skill.value); i++)
        total_points +=
          this.computeSkill(this.SKILL_LEVELS[i], attr_value).points
    }
    this.skill_points = this.max_skill_points + total_points
  }
  addSkill(name: string, add: boolean = true) {
    const skill = this.skills.find((s) => s.name === name)
    if (skill === undefined) return false
    const { value, points } =
      this.computeSkill(skill.value, this.stats[skill.attribute], add)
    if (points !== 0) {
      skill.value = value
      this.skill_points += points
      return true
    }
    return false
  }
  computeSkill = (skill_value: number, attr_value: number, add: boolean = true): { value: number, points: number } => {
    const skill_level = this.SKILL_LEVELS.indexOf(skill_value)
    const new_level = skill_level + (add ? 1 : -1)
    if (skill_level === -1 || new_level < 0 || new_level === this.SKILL_LEVELS.length)
      return { value: skill_value, points: 0 }
    const new_value = this.SKILL_LEVELS[new_level]
    return {
      value: new_value,
      points: add ?
        new_value > attr_value ? -2 : -1 :
        new_value < attr_value ? 1 : 2
    }
  }
}
