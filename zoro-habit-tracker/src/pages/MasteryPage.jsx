import {useMemo} from "react"
import {RadarChart,Radar,PolarGrid,PolarAngleAxis,PolarRadiusAxis,ResponsiveContainer,Tooltip,BarChart,Bar,XAxis,YAxis,CartesianGrid,LineChart,Line,Cell} from "recharts"
import {motion} from "framer-motion"
import {dateKey,dayScore,todayStr} from "../utils/dateUtils"
import {C,F,PALETTE} from "../constants/designTokens"
import PageHeader from "../ui/PageHeader"
import GlassCard from "../ui/GlassCard"
import EmptyState from "../ui/EmptyState"

const TT=({active,payload,label})=>{
  if(!active||!payload?.length)return null
  return(
    <div style={{background:C.cardHi,border:`1px solid ${C.border}`,borderRadius:10,padding:"8px 12px"}}>
      <p style={{fontFamily:F.heading,fontSize:8,color:C.greenDim,marginBottom:3}}>{label}</p>
      {payload.map((p,i)=><p key={i} style={{fontFamily:F.heading,fontSize:12,color:p.color||C.green}}>{Math.round(p.value)}%</p>)}
    </div>
  )
}

export default function MasteryPage({habits,logs}){
  const today=todayStr()

  const last30days=useMemo(()=>Array.from({length:30},(_,i)=>{const d=new Date();d.setDate(d.getDate()-(29-i));return dateKey(d)}),[])
  const last7days=useMemo(()=>Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()-(6-i));return dateKey(d)}),[])

  const radarData=useMemo(()=>habits.map(h=>{
    const done=last30days.filter(d=>{const v=logs[h._id]?.[d];return h.type==="bool"?(v===1||v===true):(v||0)>=(h.target||1)}).length
    return{subject:h.name.length>10?h.name.slice(0,10)+"…":h.name,fullName:h.name,score:Math.round(done/30*100),color:h.color||C.green}
  }),[habits,logs,last30days])

  const weekTrend=useMemo(()=>last7days.map(d=>{
    const entry={day:new Date(d).toLocaleDateString("en",{weekday:"short"})}
    habits.forEach(h=>{
      const v=logs[h._id]?.[d]
      const done=h.type==="bool"?(v===1||v===true):((v||0)>=(h.target||1))
      entry[h._id]=done?100:0
    })
    return entry
  }),[habits,logs,last7days])

  const ranked=useMemo(()=>[...radarData].sort((a,b)=>b.score-a.score),[radarData])

  const consistency=useMemo(()=>habits.map(h=>{
    let streak=0
    const d=new Date()
    while(streak<30){
      const ds=dateKey(d)
      const v=logs[h._id]?.[ds]
      const done=h.type==="bool"?(v===1||v===true):((v||0)>=(h.target||1))
      if(!done&&ds!==today)break
      if(done)streak++
      d.setDate(d.getDate()-1)
    }
    return{name:h.name.length>12?h.name.slice(0,12)+"…":h.name,streak,color:h.color||C.green}
  }),[habits,logs,today])

  if(!habits.length)return <EmptyState/>

  return(
    <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}} style={{padding:"20px 16px"}}>
      <PageHeader icon="🎯" title="Mastery" sub="Deep Habit Intelligence"/>

      {/* Radar chart */}
      <GlassCard style={{marginBottom:16}} glow>
        <p style={{fontFamily:F.heading,fontSize:8,letterSpacing:"0.25em",color:C.greenDim,marginBottom:8}}>🕸 MASTERY RADAR · 30-DAY</p>
        <ResponsiveContainer width="100%" height={240}>
          <RadarChart data={radarData} margin={{top:10,right:20,bottom:10,left:20}}>
            <PolarGrid stroke="rgba(52,211,113,0.12)" gridType="polygon"/>
            <PolarAngleAxis dataKey="subject" tick={{fontFamily:F.heading,fontSize:9,fill:C.ivoryFaint,letterSpacing:"0.05em"}}/>
            <PolarRadiusAxis domain={[0,100]} tick={false} axisLine={false}/>
            <Tooltip content={<TT/>}/>
            <Radar dataKey="score" stroke={C.green} strokeWidth={2} fill={C.green} fillOpacity={0.12} dot={{r:3,fill:C.green,strokeWidth:0}}/>
          </RadarChart>
        </ResponsiveContainer>
      </GlassCard>

      {/* Rank leaderboard + streak stacked on mobile */}
      <div style={{display:"flex",flexDirection:"column",gap:16,marginBottom:16}}>
        <GlassCard>
          <p style={{fontFamily:F.heading,fontSize:8,letterSpacing:"0.25em",color:C.greenDim,marginBottom:16}}>🏆 HABIT LEADERBOARD</p>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {ranked.map((h,i)=>(
              <div key={h.subject} style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontFamily:F.heading,fontSize:10,color:i===0?C.gold:i===1?C.ivory:C.ivoryFaint,width:16,flexShrink:0}}>{i+1}</span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                    <span style={{fontFamily:F.heading,fontSize:10,color:C.ivory,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{h.fullName}</span>
                    <span style={{fontFamily:F.heading,fontSize:10,color:h.color,flexShrink:0,marginLeft:8}}>{h.score}%</span>
                  </div>
                  <div style={{height:6,borderRadius:4,background:"rgba(255,255,255,0.05)",overflow:"hidden"}}>
                    <motion.div initial={{width:0}} animate={{width:`${h.score}%`}} transition={{duration:0.8,delay:i*0.1,ease:[0.22,1,0.36,1]}}
                      style={{height:"100%",background:`linear-gradient(90deg,${h.color}55,${h.color})`,borderRadius:4,boxShadow:`0 0 8px ${h.color}44`}}/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <p style={{fontFamily:F.heading,fontSize:8,letterSpacing:"0.25em",color:C.greenDim,marginBottom:16}}>⚡ CURRENT STREAKS</p>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {consistency.map((h,i)=>(
              <div key={h.name} style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:8,height:8,borderRadius:2,background:h.color,flexShrink:0}}/>
                <span style={{fontFamily:F.heading,fontSize:10,color:C.ivory,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{h.name}</span>
                <div style={{display:"flex",alignItems:"center",gap:4,flexShrink:0}}>
                  <span style={{fontSize:12}}>🔥</span>
                  <span style={{fontFamily:F.heading,fontSize:13,color:h.streak>0?h.color:C.ivoryFaint}}>{h.streak}d</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* 7-day per habit line chart */}
      <GlassCard style={{marginBottom:16}}>
        <p style={{fontFamily:F.heading,fontSize:8,letterSpacing:"0.25em",color:C.greenDim,marginBottom:12}}>📈 7-DAY HABIT LINES</p>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={weekTrend} margin={{top:4,right:4,bottom:0,left:-20}}>
            <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)"/>
            <XAxis dataKey="day" tick={{fontFamily:F.heading,fontSize:9,fill:C.ivoryFaint}} axisLine={false} tickLine={false}/>
            <YAxis domain={[0,100]} tick={false} axisLine={false} tickLine={false}/>
            <Tooltip content={<TT/>}/>
            {habits.map((h,i)=>(
              <Line key={h._id} type="monotone" dataKey={h._id} name={h.name} stroke={h.color||PALETTE[i%PALETTE.length]} strokeWidth={2} dot={{r:3,fill:h.color||PALETTE[i%PALETTE.length],strokeWidth:0}} activeDot={{r:5}} connectNulls/>
            ))}
          </LineChart>
        </ResponsiveContainer>
        <div style={{display:"flex",flexWrap:"wrap",gap:10,marginTop:10}}>
          {habits.map((h,i)=>(
            <div key={h._id} style={{display:"flex",alignItems:"center",gap:5}}>
              <div style={{width:10,height:3,borderRadius:2,background:h.color||PALETTE[i%PALETTE.length]}}/>
              <span style={{fontFamily:F.heading,fontSize:8,color:C.ivoryFaint,letterSpacing:"0.1em"}}>{h.name.length>12?h.name.slice(0,12)+"…":h.name}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* 30-day completion bars — redesigned */}
      <GlassCard>
        <p style={{fontFamily:F.heading,fontSize:8,letterSpacing:"0.25em",color:C.greenDim,marginBottom:16}}>🎯 30-DAY COMPLETION</p>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {ranked.map((h,i)=>(
            <div key={h.fullName}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:8,height:8,borderRadius:2,background:h.color,flexShrink:0,boxShadow:`0 0 6px ${h.color}`}}/>
                  <span style={{fontFamily:F.heading,fontSize:11,color:C.ivory}}>{h.fullName}</span>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <span style={{fontFamily:F.heading,fontSize:13,color:h.color,fontWeight:"bold"}}>{h.score}%</span>
                  {h.score>=70&&<span style={{fontSize:12}}>🏆</span>}
                  {h.score>=40&&h.score<70&&<span style={{fontSize:12}}>⚡</span>}
                  {h.score<40&&<span style={{fontSize:12}}>🌱</span>}
                </div>
              </div>
              <div style={{height:10,borderRadius:6,background:"rgba(255,255,255,0.05)",overflow:"hidden",position:"relative"}}>
                <motion.div
                  initial={{width:0}}
                  animate={{width:`${h.score}%`}}
                  transition={{duration:1,delay:i*0.1,ease:[0.22,1,0.36,1]}}
                  style={{height:"100%",borderRadius:6,background:`linear-gradient(90deg,${h.color}44,${h.color})`,boxShadow:`0 0 12px ${h.color}66`,position:"relative"}}>
                  <div style={{position:"absolute",right:0,top:0,bottom:0,width:3,background:h.color,borderRadius:"0 6px 6px 0",boxShadow:`0 0 8px ${h.color}`}}/>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  )
}
