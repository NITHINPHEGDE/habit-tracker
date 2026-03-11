export const todayStr=()=>new Date().toISOString().split("T")[0]
export const dateKey=d=>d.toISOString().split("T")[0]
export const daysInM=(y,m)=>new Date(y,m+1,0).getDate()
export const firstDOW=(y,m)=>new Date(y,m,1).getDay()
export function last365(){
  return Array.from({length:365},(_,i)=>{
    const d=new Date(); d.setDate(d.getDate()-(364-i)); return dateKey(d)
  })
}
export function dayScore(habits,logs,ds){
  if(!habits.length)return 0
  let total=0,max=0
  habits.forEach(h=>{
    const v=logs[h._id]?.[ds]
    if(h.type==="bool"){max++;if(v===1||v===true)total++}
    else{const t=h.target||1;max+=t;total+=Math.min(v||0,t)}
  })
  return max?total/max:0
}
export function streakCount(habits,logs){
  if(!habits.length)return 0
  let streak=0
  const d=new Date()
  while(true){
    const ds=dateKey(d)
    const sc=dayScore(habits,logs,ds)
    if(sc===0&&ds!==todayStr())break
    if(sc>0)streak++
    d.setDate(d.getDate()-1)
    if(streak>365)break
  }
  return streak
}
export function weeklyScores(habits,logs){
  return Array.from({length:12},(_,i)=>{
    const scores=[]
    for(let d=0;d<7;d++){
      const dt=new Date()
      dt.setDate(dt.getDate()-((11-i)*7+d))
      scores.push(dayScore(habits,logs,dateKey(dt)))
    }
    const avg=scores.reduce((a,b)=>a+b,0)/7
    const wk=new Date(); wk.setDate(wk.getDate()-((11-i)*7))
    return{week:`W${i+1}`,score:Math.round(avg*100),date:dateKey(wk)}
  })
}
export function monthlyScores(habits,logs){
  return Array.from({length:6},(_,i)=>{
    const dt=new Date()
    dt.setMonth(dt.getMonth()-(5-i))
    const y=dt.getFullYear(),m=dt.getMonth()
    const dim=new Date(y,m+1,0).getDate()
    let total=0
    for(let d=1;d<=dim;d++){
      const ds=`${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`
      total+=dayScore(habits,logs,ds)
    }
    return{month:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][m],score:Math.round(total/dim*100)}
  })
}
