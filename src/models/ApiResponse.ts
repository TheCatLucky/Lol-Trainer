export type ApiResponse = {
  type: string,
  format: string,
  version: string,
  data: DataObj
}

type DataObj = {
  [index: string]: DataItem
}

export type DataItem = {
  version: string,
  id: string,
  key: string,
  name: string,
  title: string,
  blurb: string,
  stats: StatsType
}

export type StatsType = {
  hp: number,
  hpperlevel: number,
  mp: number,
  mpperlevel: number,
  movespeed: number,
  armor: number,
  armorperlevel: number,
  spellblock: number,
  spellblockperlevel: number,
  attackrange: number,
  hpregen: number,
  hpregenperlevel: number,
  mpregen: number,
  mpregenperlevel: number,
  crit: number,
  critperlevel: number,
  attackdamage: number,
  attackdamageperlevel: number,
  attackspeedperlevel: number,
  attackspeed: number
}
