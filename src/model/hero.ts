import { heroSkills, statsTypes, heroStats, levels, heroSkill } from './types'
import { skills } from './data'

export const dice = (sides: number): number => Math.random() * sides + 1 | 0

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
  private skill_points: number = 15
  private max_skill_points: number = 15
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
    const skill_levels = add ? this.SKILL_LEVELS : this.SKILL_LEVELS.reverse()
    const skill_level = skill_levels.indexOf(skill_value)
    if (skill_level === skill_levels.length - 1)
      return { value: skill_value, points: 0 }
    return {
      value: skill_levels[skill_level + 1],
      points: add ?
        skill_value < attr_value ? -1 : -2 :
        skill_value > attr_value ? 2 : 1
    }
  }
}
