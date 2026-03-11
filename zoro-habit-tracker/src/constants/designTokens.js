export const C={
  bg:"#040a06",surface:"#07100a",card:"#0a1a0e",cardHi:"#0d2113",
  border:"rgba(52,211,113,0.1)",borderHi:"rgba(52,211,113,0.35)",
  green:"#34d371",greenDim:"#1a7a3e",greenGlow:"rgba(52,211,113,0.18)",greenDeep:"#0d3d1f",
  gold:"#d4a847",goldBright:"#f0c060",goldDim:"rgba(212,168,71,0.5)",
  ivory:"#ede8dc",ivoryDim:"rgba(237,232,220,0.55)",ivoryFaint:"rgba(237,232,220,0.2)",
  red:"#e05252",redDim:"rgba(224,82,82,0.12)",
  blue:"#60a5fa",purple:"#a78bfa",pink:"#f472b6",orange:"#fb923c",
  heat:s=>{
    if(s<=0)return"rgba(255,255,255,0.03)"
    if(s<0.25)return"#0f2e18"
    if(s<0.5)return"#165c2b"
    if(s<0.75)return"#1e8a3c"
    return"#34d371"
  }
}
export const F={display:"'Cinzel Decorative',serif",heading:"'Cinzel',serif",body:"'Crimson Pro',Georgia,serif"}
export const PALETTE=["#34d371","#d4a847","#60a5fa","#f472b6","#a78bfa","#fb923c","#34d9c7","#e879f9"]
export const MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"]
export const MONTHS_S=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
export const DAYS_S=["S","M","T","W","T","F","S"]
export const NAV_ITEMS=[
  {id:"home",icon:"⚔️",label:"DOJO"},
  {id:"dashboard",icon:"📊",label:"STATS"},
  {id:"yearly",icon:"🌿",label:"YEAR"},
  {id:"mastery",icon:"🎯",label:"MASTERY"}
]
export const QUOTES=[
  {text:"Nothing happened.",attr:"Zoro, bleeding out"},
  {text:"I don't know the way. But I'll cut a path through.",attr:"Roronoa Zoro"},
  {text:"Bring on the hardship. It's preferred in a path of carnage.",attr:"Roronoa Zoro"},
  {text:"A wound that would make an ordinary man faint… I'll beat it back with spirit.",attr:"Roronoa Zoro"},
  {text:"When the world shoves you around, you just gotta stand up and shove back.",attr:"Roronoa Zoro"}
]
