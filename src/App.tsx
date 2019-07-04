import React, { Children } from 'react';
// import logo from './logo.svg';
import './App.css';
import Hero from './model/hero'
import { statsTypes, heroStats, heroSkills } from './model/types'
const h = new Hero()
const attr_names = {
  [statsTypes.agility.toString()]: "Ловкость",
  [statsTypes.smarts.toString()]: "Интелект",
  [statsTypes.spirit.toString()]: "Дух",
  [statsTypes.strength.toString()]: "Сила",
  [statsTypes.vigor.toString()]: "Энергия",
}



const Stat: React.FC<any> = (props: any) => (
  <div className="stat-selector">
    <span>{props.value}</span>
    <button onClick={props.minus}>-</button>
    <button onClick={props.plus}>+</button>
  </div>
)
const Bage: React.FC<any> = (props: any) => (
  <div className="bage">
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
      skills: h.getSkills()
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
    const container = <div></div>
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
  // (
  //   <div className="skills">
  //     {skills.map(skill => (
  //       <Stat
  //         value={`${skill.name} (${skill.attribute}): ${skill.value}`}
  //         minus={() => this.changeSkill(skill.name, false)}
  //         plus={() => this.changeSkill(skill.name, true)}
  //       />
  //     ))}
  //   </div>
  // )
  getPointsBages = (points: any) => (
    <div className="bages">
      <Bage name="Очков персонажа:" value={points.attributes} />
      <Bage name="Очков умений:" value={points.skills} />
      <Bage name="Всего очков умений :" value={points.skills_total} />
    </div>

  )
  render() {
    const statsControllers = this.getStatsControllers(this.state.stats)
    const bages = this.getPointsBages(this.state.points)
    const skills = this.getSkills(this.state.skills)
    return (
      <div className="App">
        {bages}
        {statsControllers}
        {skills}
      </div>
    )
  }
}

export default App;
