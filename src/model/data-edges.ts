import { IEdge } from "./edgeCollection";

export type hSize = 1 | 2
export type Hindrance = {
  name: string
  describtion: string
  size: hSize
}

export type Edge = {
  name: string
  describtion: string
  size: hSize
  requirement: Object
}

// изьяны
export const hindrances: Hindrance[] = [
  {
    name: 'Болезненность',
    describtion: '−2 к проверкам выносливости на сопротивление болезням, ядам и природным условиям.',
    size: 1
  },
  {
    name: 'Болезненность',
    describtion: '−4 к проверкам выносливости на сопротивление болезням, ядам и природным условиям.',
    size: 2
  },
  {
    name: 'Боязнь',
    describtion: '',
    size: 2
  },
  {
    name: 'Боязнь',
    describtion: '',
    size: 1
  },
  {
    name: 'В розыске',
    describtion: '',
    size: 2
  },
  {
    name: "В розыске",
    describtion: '',
    size: 1
  },
  {
    name: "Гемофилия",
    describtion: '',
    size: 2
  },
]
// черты
export const edges: Edge[] = [
  {
    name: 'Адепт* (Н, МД (чудеса), вера d8, драка d8)',
    describtion: 'ББ 2 голыми руками за 1 ПС; часть сил — свободное действие',
    size: 1,
    requirement: {}
  },
  {
    name: 'Акробат* (Н, ловкость d8, сила d6)',
    describtion: '+2 к проверкам ловкости; защита +1, если нет нагрузки',
    size: 1,
    requirement: {}
  },
  {
    name: 'Амбидекстр* (Н, ловкость d8)',
    describtion: 'нет штрафа –2 за непривычную руку',
    size: 2,
    requirement: {}
  },
  {
    name: 'Аристократ* (Н)',
    describtion: 'харизма +2; благородное происхождение, высокий статус и благосостояние',
    size: 1,
    requirement: {}
  },
]


export const perks: IEdge[] = [
  { name: 'добавить аттрибут', size: 2, describtion: '' },
  { name: 'приобрести черту', size: 2, describtion: '' },
  { name: 'добавить навык', size: 1, describtion: '' },
  { name: 'добавить денег', size: 1, describtion: '' }
]
