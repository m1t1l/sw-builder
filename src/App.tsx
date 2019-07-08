import React from 'react';
import './App.css';
import Hero from './model/hero'
import { statsTypes, heroSkills } from './model/types'
import PerkController from './model/perksController'
import { edges, hindrances, perks } from './model/data-edges'
import { PerkList, PerksTotals } from './perks'
import { EdgeMap } from './model/edgeCollection';

const h = new Hero()
const p = new PerkController(edges, hindrances, perks, h)

const attr_names = {
  [statsTypes.agility.toString()]: "Ловкость",
  [statsTypes.smarts.toString()]: "Интелект",
  [statsTypes.spirit.toString()]: "Дух",
  [statsTypes.strength.toString()]: "Сила",
  [statsTypes.vigor.toString()]: "Энергия",
}



const Stat: React.FC<{ value: string, minus: () => void, plus: () => void }> = props => (
  <div className="stat-selector">
    <span>{props.value}</span>
    <button onClick={props.minus}>-</button>
    <button onClick={props.plus}>+</button>
  </div>
)
const Bage: React.FC<{ extraClass?: string, name: string, value: string }> = props => (
  <div className={'bage ' + props.extraClass}>
    {props.name}
    <span>{props.value}</span>
  </div>
)

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      stats: h.getStats(),
      points: h.getPoints(),
      skills: h.getSkills(),
      hindrances: p.hindrances.keys(),
      edges: p.edges.keys(),
      perks: p.perks.keys()
    }

    p.edges.onChange = () => this.setState({ edges: p.edges.keys() })
    p.hindrances.onChange = () => this.setState({ hindrances: p.hindrances.keys() })
    p.perks.onChange = () => {
      this.setState({ perks: p.perks.keys() })
      this.update()
    }
  }
  update() {
    this.setState({
      stats: h.getStats(),
      points: h.getPoints(),
      skills: h.getSkills()
    })
  }
  changeStats(statKey: number, add: boolean) {
    if (h.addStats(statKey, add)) this.update()
  }
  changeSkill(name: string, add: boolean) {
    if (h.addSkill(name, add)) this.update()
  }
  getStatsControllers(stats: any) {
    const keys = Object.keys(stats)
    return (
      <div className="stats">
        {keys.map(k => {
          const ki = parseInt(k)
          return (
            <Stat
              value={`${attr_names[ki]}: ${stats[k]}`}
              minus={() => this.changeStats(ki, false)}
              plus={() => this.changeStats(ki, true)}
            />)
        })}
      </div>)
  }
  getSkills = (skills: heroSkills) => {
    let cur_attr = skills[0].attribute
    let all_arr = []
    let arr: any[] = []
    for (const skill of skills) {
      const skill_component = (
        <Stat
          value={`${skill.name}: ${skill.value}`}
          minus={() => this.changeSkill(skill.name, false)}
          plus={() => this.changeSkill(skill.name, true)}
        />
      )
      if (skill.attribute === cur_attr)
        arr.push(skill_component)
      else {
        all_arr.push(
          <div className="skill-group">
            <div className="skill-group-name">{attr_names[cur_attr]}</div>
            {arr}
          </div>
        )
        arr = [skill_component]
        cur_attr = skill.attribute
      }
    }
    all_arr.push(
      <div className="skill-group">
        <div className="skill-group-name">{attr_names[cur_attr]}</div>
        {arr}
      </div>
    )
    return (
      <div className="skills">
        {all_arr}
      </div>
    )
  }
  getPointsBages = (points: any) => (
    <div className="bages">
      <Bage extraClass={points.attributes < 0 ? 'invalid' : ''}
        name="Очков персонажа:" value={points.attributes} />
      <Bage extraClass={points.skills < 0 ? 'invalid' : ''}
        name="Очков умений:" value={points.skills} />
      <Bage name="Всего очков умений :" value={points.skills_total} />
    </div>
  )
  render() {
    const state = this.state
    const statsControllers = this.getStatsControllers(state.stats)
    const bages = this.getPointsBages(state.points)
    const skills = this.getSkills(state.skills)

    const hindrancesUsedMap: EdgeMap = {}
    for (const key of p.hindrances.keys()) hindrancesUsedMap[key] = p.hindrances.all[key]
    const hindrances = (
      <PerkList perkMap={p.hindrances.all} actionCaption="+" action={(key) => p.hindrances.add(key)}>
        <p>Изьяны</p>
      </PerkList>
    )
    const hindrancesUsed = (
      <PerkList perkMap={hindrancesUsedMap} actionCaption="-" action={(key) => p.hindrances.remove(key)}>
        <p>Используемые изьяны</p>
      </PerkList>
    )

    const edgesUsedMap: EdgeMap = {}
    for (const key of p.edges.keys()) edgesUsedMap[key] = p.edges.all[key]
    const edges = (
      <PerkList perkMap={p.edges.all} actionCaption="+" action={(key) => p.edges.add(key)}>
        <p>Черты</p>
      </PerkList>
    )
    for (const key of p.edges.keys()) edgesUsedMap[key] = p.edges.all[key]
    const edgesUsed = (
      <PerkList perkMap={edgesUsedMap} actionCaption="-" action={(key) => p.edges.remove(key)}>
        <p>Используемы черты</p>
      </PerkList>
    )

    const perksUsedMap: EdgeMap = {}
    for (const key of p.perks.keys()) {
      let tmp_key = key
      while (perksUsedMap[tmp_key]) tmp_key = tmp_key + key
      perksUsedMap[tmp_key] = p.perks.all[key]
    }

    const perks = (
      <PerkList perkMap={p.perks.all} actionCaption="+" action={(key) => p.perks.add(key)}>
        <p>Перки</p>
      </PerkList>
    )
    const perksUsed = (
      <PerkList perkMap={perksUsedMap} actionCaption="-" action={(key) => p.perks.remove(key)}>
        <p>Используемые перки</p>
      </PerkList>
    )
    return (
      <div className="App">
        {bages}
        {statsControllers}
        {skills}
        <PerksTotals {...p.getPoints()} />
        <div className="perks-container">
          {hindrancesUsed}
          {perksUsed}
          {edgesUsed}
          {hindrances}
          {perks}
          {edges}
        </div>
      </div>
    )
  }
}

export default App;
