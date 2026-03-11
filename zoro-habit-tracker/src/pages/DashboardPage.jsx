import {useMemo} from "react"
import {AreaChart,Area,XAxis,YAxis,ResponsiveContainer,CartesianGrid,Tooltip,BarChart,Bar,LineChart,Line,ReferenceLine} from "recharts"
import {motion} from "framer-motion"
import {dayScore,dateKey,weeklyScores,monthlyScores,streakCount,todayStr} from "../utils/dateUtils"
import {C,F} from "../constants/designTokens"
import EmptyState from "../ui/EmptyState"
import PageHeader from "../ui/PageHeader"
import GlassCard from "../ui/GlassCard"

const TT=({active,payload,label})=>{
  if(!active||!payload?.length)return null
  return(
    <div style={{background:C.cardHi,border:`1px solid ${C.border}`,borderRadius:10,padding:"8px 12px"}}>
      <p style={{fontFamily:F.heading,fontSize:8,letterSpacing:"0.2em",color:C.greenDim,marginBottom:4}}>{label}</p>
      {payload.map((p,i)=>(
        <p key={i} style={{fontFamily:F.heading,fontSize:13,color:p.color||C.green}}>{p.value}{p.name==="score"?"%":""}</p>
      ))}
    </div>
  )
}

export default function DashboardPage({habits,logs}){
  const today=todayStr()

  const last30=useMemo(()=>Array.from({length:30},(_,i)=>{
    const d=new Date(); d.setDate(d.getDate()-(29-i))
    return{label:d.getDate(),score:Math.round(dayScore(habits,logs,dateKey(d))*100)}
  }),[habits,logs])

  const weekly=useMemo(()=>weeklyScores(habits,logs),[habits,logs])
  const monthly=useMemo(()=>monthlyScores(habits,logs),[habits,logs])

  const streak=useMemo(()=>streakCount(habits,logs),[habits,logs])
  const todayScore=Math.round(dayScore(habits,logs,today)*100)
  const avg30=useMemo(()=>Math.round(last30.reduce((a,b)=>a+b.score,0)/30),[last30])
  const bestDay=useMemo(()=>Math.max(...last30.map(d=>d.score)),[last30])

  const habitStats=useMemo(()=>habits.map(h=>{
    const days30=Array.from({length:30},(_,i)=>{const d=new Date();d.setDate(d.getDate()-(29-i));return dateKey(d)})
    const done=days30.filter(d=>{const v=logs[h._id]?.[d];return h.type==="bool"?(v===1||v===true):(v||0)>=(h.target||1)}).length
    return{name:h.name,rate:Math.round(done/30*100),color:h.color||C.green,done}
  }),[habits,logs])

  if(!habits.length)return <EmptyState/>

  return(
    <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}} style={{padding:"clamp(24px,5vw,48px) clamp(16px,4vw,32px)"}}>
      <PageHeader icon="📊" title="Battle Stats" sub="Performance Dashboard"/>

      {/* Summary row */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(110px,1fr))",gap:10,marginBottom:20}}>
        {[
          {icon:"🔥",val:`${streak}d`,label:"Streak",color:C.gold},
          {icon:"⚔️",val:`${todayScore}%`,label:"Today",color:C.green},
          {icon:"📈",val:`${avg30}%`,label:"30d Avg",color:C.blue},
          {icon:"🏆",val:`${bestDay}%`,label:"Best Day",color:C.purple},
        ].map(s=>(
          <div key={s.label} style={{borderRadius:16,padding:"14px 16px",background:`${s.color}0a`,border:`1px solid ${s.color}22`,textAlign:"center"}}>
            <div style={{fontSize:22,marginBottom:4}}>{s.icon}</div>
            <div style={{fontFamily:F.heading,fontSize:"clamp(16px,3.5vw,22px)",color:s.color,lineHeight:1}}>{s.val}</div>
            <div style={{fontFamily:F.heading,fontSize:7,letterSpacing:"0.15em",color:C.ivoryFaint,marginTop:3}}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* 30-day area chart */}
      <GlassCard style={{marginBottom:16}}>
        <p style={{fontFamily:F.heading,fontSize:8,letterSpacing:"0.25em",color:C.greenDim,marginBottom:12}}>📅 30-DAY COMPLETION</p>
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart data={last30} margin={{top:4,right:4,bottom:0,left:-20}}>
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={C.green} stopOpacity={0.25}/>
                <stop offset="95%" stopColor={C.green} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)"/>
            <XAxis dataKey="label" tick={{fontFamily:F.heading,fontSize:9,fill:C.ivoryFaint}} axisLine={false} tickLine={false}/>
            <YAxis domain={[0,100]} tick={{fontFamily:F.heading,fontSize:9,fill:C.ivoryFaint}} axisLine={false} tickLine={false}/>
            <Tooltip content={<TT/>}/>
            <ReferenceLine y={70} stroke={C.gold} strokeDasharray="4 4" strokeOpacity={0.3}/>
            <Area type="monotone" dataKey="score" stroke={C.green} strokeWidth={2} fill="url(#g1)" dot={false} activeDot={{r:4,fill:C.green,strokeWidth:0}}/>
          </AreaChart>
        </ResponsiveContainer>
      </GlassCard>

      {/* Weekly bar + Monthly line side by side on desktop */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:16,marginBottom:16}}>
        <GlassCard>
          <p style={{fontFamily:F.heading,fontSize:8,letterSpacing:"0.25em",color:C.greenDim,marginBottom:12}}>📊 WEEKLY TREND</p>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={weekly} margin={{top:4,right:4,bottom:0,left:-20}}>
              <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)"/>
              <XAxis dataKey="week" tick={{fontFamily:F.heading,fontSize:8,fill:C.ivoryFaint}} axisLine={false} tickLine={false}/>
              <YAxis domain={[0,100]} tick={{fontFamily:F.heading,fontSize:8,fill:C.ivoryFaint}} axisLine={false} tickLine={false}/>
              <Tooltip content={<TT/>}/>
              <Bar dataKey="score" fill={C.green} radius={[4,4,0,0]} maxBarSize={28} opacity={0.85}/>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard>
          <p style={{fontFamily:F.heading,fontSize:8,letterSpacing:"0.25em",color:C.greenDim,marginBottom:12}}>📆 MONTHLY TREND</p>
          <ResponsiveContainer width="100%" height={140}>
            <LineChart data={monthly} margin={{top:4,right:4,bottom:0,left:-20}}>
              <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)"/>
              <XAxis dataKey="month" tick={{fontFamily:F.heading,fontSize:9,fill:C.ivoryFaint}} axisLine={false} tickLine={false}/>
              <YAxis domain={[0,100]} tick={{fontFamily:F.heading,fontSize:9,fill:C.ivoryFaint}} axisLine={false} tickLine={false}/>
              <Tooltip content={<TT/>}/>
              <Line type="monotone" dataKey="score" stroke={C.gold} strokeWidth={2.5} dot={{r:3,fill:C.gold,strokeWidth:0}} activeDot={{r:5,fill:C.gold}}/>
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Per-habit completion rates */}
      <GlassCard>
        <p style={{fontFamily:F.heading,fontSize:8,letterSpacing:"0.25em",color:C.greenDim,marginBottom:16}}>⚔️ HABIT COMPLETION RATES (30d)</p>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {habitStats.map(h=>(
            <div key={h.name}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                <span style={{fontFamily:F.heading,fontSize:10,color:C.ivory,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:"70%"}}>{h.name}</span>
                <span style={{fontFamily:F.heading,fontSize:10,color:h.color,flexShrink:0}}>{h.rate}%</span>
              </div>
              <div style={{height:5,borderRadius:4,background:"rgba(255,255,255,0.05)",overflow:"hidden"}}>
                <motion.div initial={{width:0}} animate={{width:`${h.rate}%`}} transition={{duration:0.8,ease:[0.22,1,0.36,1]}}
                  style={{height:"100%",background:`linear-gradient(90deg,${h.color}66,${h.color})`,borderRadius:4}}/>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  )
}
