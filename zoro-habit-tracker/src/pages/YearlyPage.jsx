import {useMemo,useState} from "react"
import {motion} from "framer-motion"
import {last365,dayScore,todayStr,streakCount} from "../utils/dateUtils"
import {C,F,MONTHS_S} from "../constants/designTokens"
import PageHeader from "../ui/PageHeader"
import GlassCard from "../ui/GlassCard"
import EmptyState from "../ui/EmptyState"

export default function YearlyPage({habits,logs}){
  const [tooltip,setTooltip]=useState(null)
  const today=todayStr()
  const days=useMemo(()=>last365(),[])

  const stats=useMemo(()=>{
    const perfect=days.filter(d=>dayScore(habits,logs,d)>=1).length
    const active=days.filter(d=>dayScore(habits,logs,d)>0).length
    const streak=streakCount(habits,logs)
    const scores=days.map(d=>dayScore(habits,logs,d))
    const avg=Math.round(scores.reduce((a,b)=>a+b,0)/365*100)
    // monthly breakdown
    const byMonth=Array.from({length:12},(_,m)=>{
      const yr=new Date().getFullYear()
      const mDays=new Date(yr,m+1,0).getDate()
      let tot=0,cnt=0
      for(let d=1;d<=mDays;d++){
        const ds=`${yr}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`
        if(days.includes(ds)){tot+=dayScore(habits,logs,ds);cnt++}
      }
      return{month:MONTHS_S[m],score:cnt?Math.round(tot/cnt*100):0}
    })
    return{perfect,active,streak,avg,byMonth}
  },[habits,logs,days])

  if(!habits.length)return <EmptyState/>

  // Build weeks grid (53 cols x 7 rows)
  const weeks=useMemo(()=>{
    const grid=[]
    let week=[]
    // pad start
    const firstDay=new Date(days[0])
    const startDOW=firstDay.getDay()
    for(let i=0;i<startDOW;i++)week.push(null)
    days.forEach(d=>{
      week.push(d)
      if(week.length===7){grid.push(week);week=[]}
    })
    if(week.length>0){while(week.length<7)week.push(null);grid.push(week)}
    return grid
  },[days])

  return(
    <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}} style={{padding:"clamp(24px,5vw,48px) clamp(16px,4vw,32px)"}}>
      <PageHeader icon="🌿" title="Year in Review" sub="365-Day Chronicle"/>

      {/* Summary row */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(100px,1fr))",gap:10,marginBottom:20}}>
        {[
          {icon:"🏆",val:stats.perfect,label:"Perfect Days",color:C.green},
          {icon:"⚡",val:`${stats.streak}d`,label:"Streak",color:C.gold},
          {icon:"📈",val:`${stats.avg}%`,label:"Year Avg",color:C.blue},
          {icon:"🌿",val:stats.active,label:"Active Days",color:C.purple},
        ].map(s=>(
          <div key={s.label} style={{borderRadius:14,padding:"12px 14px",background:`${s.color}0a`,border:`1px solid ${s.color}22`,textAlign:"center"}}>
            <div style={{fontSize:20,marginBottom:4}}>{s.icon}</div>
            <div style={{fontFamily:F.heading,fontSize:"clamp(14px,3vw,20px)",color:s.color,lineHeight:1}}>{s.val}</div>
            <div style={{fontFamily:F.heading,fontSize:7,letterSpacing:"0.12em",color:C.ivoryFaint,marginTop:3}}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Heatmap */}
      <GlassCard style={{marginBottom:16,overflowX:"auto"}}>
        <p style={{fontFamily:F.heading,fontSize:8,letterSpacing:"0.25em",color:C.greenDim,marginBottom:14}}>📅 DAILY HEATMAP</p>
        {/* Month labels */}
        <div style={{display:"flex",gap:2,marginBottom:4,paddingLeft:0}}>
          {MONTHS_S.map(m=>(
            <div key={m} style={{flex:1,fontFamily:F.heading,fontSize:7,color:C.ivoryFaint,letterSpacing:"0.1em",textAlign:"center"}}>{m}</div>
          ))}
        </div>
        {/* Day rows */}
        <div style={{display:"flex",gap:2}}>
          {weeks.map((week,wi)=>(
            <div key={wi} style={{display:"flex",flexDirection:"column",gap:2}}>
              {week.map((d,di)=>{
                if(!d)return <div key={di} style={{width:10,height:10}}/>
                const sc=dayScore(habits,logs,d)
                const isToday=d===today
                return(
                  <motion.div key={d} whileHover={{scale:1.3,zIndex:10}} onHoverStart={()=>setTooltip({d,sc:Math.round(sc*100)})} onHoverEnd={()=>setTooltip(null)}
                    style={{width:10,height:10,borderRadius:2,background:C.heat(sc),border:isToday?`1px solid ${C.gold}`:"none",cursor:"pointer",transition:"background 0.2s",position:"relative"}}/>
                )
              })}
            </div>
          ))}
        </div>
        {/* Legend */}
        <div style={{display:"flex",alignItems:"center",gap:6,marginTop:12,justifyContent:"flex-end"}}>
          <span style={{fontFamily:F.heading,fontSize:7,color:C.ivoryFaint}}>Less</span>
          {[0,0.2,0.4,0.7,1].map(v=>(
            <div key={v} style={{width:10,height:10,borderRadius:2,background:C.heat(v)}}/>
          ))}
          <span style={{fontFamily:F.heading,fontSize:7,color:C.ivoryFaint}}>More</span>
        </div>
        {/* Tooltip */}
        {tooltip&&(
          <div style={{marginTop:8,padding:"6px 12px",borderRadius:8,background:C.cardHi,border:`1px solid ${C.border}`,display:"inline-flex",gap:10,alignItems:"center"}}>
            <span style={{fontFamily:F.heading,fontSize:8,color:C.greenDim}}>{tooltip.d}</span>
            <span style={{fontFamily:F.heading,fontSize:11,color:C.green}}>{tooltip.sc}%</span>
          </div>
        )}
      </GlassCard>

      {/* Monthly breakdown bar chart */}
      <GlassCard>
        <p style={{fontFamily:F.heading,fontSize:8,letterSpacing:"0.25em",color:C.greenDim,marginBottom:16}}>📆 MONTHLY BREAKDOWN</p>
        <div style={{display:"flex",alignItems:"flex-end",gap:6,height:100}}>
          {stats.byMonth.map(m=>(
            <div key={m.month} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
              <span style={{fontFamily:F.heading,fontSize:7,color:C.green}}>{m.score>0?m.score+"%":""}</span>
              <motion.div initial={{height:0}} animate={{height:`${Math.max(m.score,2)}%`}} transition={{duration:0.8,ease:[0.22,1,0.36,1]}}
                style={{width:"100%",borderRadius:"3px 3px 0 0",background:m.score>=70?C.green:m.score>=40?C.gold:`${C.green}30`,minHeight:3}}/>
              <span style={{fontFamily:F.heading,fontSize:7,color:C.ivoryFaint}}>{m.month}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  )
}
