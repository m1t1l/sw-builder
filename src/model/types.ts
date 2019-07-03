export enum levels {
  d4 = 4,
  d6 = 6,
  d8 = 8,
  d10 = 10,
  d12 = 12
}

export enum statsTypes {
  agility, smarts, spirit, strength, vigor
}

export type heroStats = {
  [key in statsTypes]: number;
}
export type heroSkill = {
  name: string
  attribute: statsTypes
  value: levels
}
export type heroSkills = heroSkill[]
