import React from 'react';
import { IEdge, EdgeMap } from './model/edgeCollection'
import { IPerkTotals } from './model/perksController'

export const PerkInput: React.FC<{ name: string, describtion: string }> = props => (
  <div className="perk-input">
    <p className="perk-name">{props.name}</p>
    <p>{props.describtion}</p>
    {props.children}
  </div>
)

export const PerkList: React.FC<{
  perkMap: EdgeMap,
  actionCaption: string,
  action: (key: string) => void
}> = props => {
  const perkArr = Object.keys(props.perkMap).map(key => ({ key, ...props.perkMap[key] }))
  return (
    <div className="perk-list">
      {props.children}
      {perkArr.map(perk => (
        <PerkInput key={perk.key} name={perk.name} describtion={perk.describtion || 'нет описания'}>
          <button onClick={() => props.action(perk.key)}>{props.actionCaption}</button>
        </PerkInput>))}
    </div>
  )
}

const SpanOfTotal: React.FC<{val: number, total: number}> = props => (
  <span className={props.val > props.total ? 'invalid' : ''}>
    {props.children} {props.val} из {props.total}
  </span>
)
export const PerksTotals: React.FC<IPerkTotals> = props => (
  <div className="pers-totals">
    <p>Использовано:</p>
    <p>
      Изьяны:
      <SpanOfTotal val={props.hindrances[2]} total={props.hindrances_total[2]}>крупных</SpanOfTotal>
      ,
      <SpanOfTotal val={props.hindrances[1]} total={props.hindrances_total[1]}>мелких</SpanOfTotal>
    </p>
    <p>
      Перки:
      <SpanOfTotal val={props.perks} total={props.perks_total}/>
    </p>
    <p>
      Черты:
      <SpanOfTotal val={props.edges} total={props.edges_total}/>
    </p>
  </div>
)