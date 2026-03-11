import {motion,AnimatePresence} from "framer-motion"
import {daysInM,firstDOW,dayScore,todayStr,streakCount} from "../utils/dateUtils"
import {MONTHS,DAYS_S,C,F} from "../constants/designTokens"
import HabitCard from "../habits/HabitCard"
import StatPill from "../ui/StatPill"
import NavArrow from "../ui/NavArrow"

export default function HomePage({habits,logs,selDate,setSelDate,calMo,calYr,setCalMo,setCalYr,log,getLog,deleteHabit,setModal,quote,user,onLogout}){
  const today=todayStr()
  const dim=daysInM(calYr,calMo)
  const fd=firstDOW(calYr,calMo)
  const prevMo=()=>calMo===0?(setCalMo(11),setCalYr(y=>y-1)):setCalMo(m=>m-1)
  const nextMo=()=>calMo===11?(setCalMo(0),setCalYr(y=>y+1)):setCalMo(m=>m+1)
  const completedToday=habits.filter(h=>{const v=getLog(h._id,today);return h.type==="bool"?(v===1||v===true):(v||0)>=(h.target||1)}).length
  const todayScore=dayScore(habits,logs,today)
  const streak=streakCount(habits,logs)
  const isSelectedToday=selDate===today

  return(
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>

      {/* Header */}
      <div style={{padding:"clamp(24px,5vw,48px) clamp(16px,4vw,32px) 0",display:"flex",flexWrap:"wrap",gap:16,alignItems:"flex-start",justifyContent:"space-between"}}>
        <div style={{flex:1,minWidth:200}}>
          <p style={{fontFamily:F.heading,fontSize:9,letterSpacing:"0.3em",color:C.greenDim,marginBottom:6}}>⚔️ WELCOME BACK, {(user?.name||"WARRIOR").toUpperCase()}</p>
          <h1 style={{fontFamily:F.display,fontSize:"clamp(20px,5vw,32px)",color:C.ivory,lineHeight:1.1,marginBottom:8}}>
            THE WAY OF <span style={{color:C.green}}>THE SWORD</span>
          </h1>
          <p style={{color:C.goldDim,fontStyle:"italic",fontSize:"clamp(13px,2vw,15px)",lineHeight:1.5}}>"{quote.text}"</p>
        </div>
        <motion.button whileTap={{scale:0.95}} onClick={onLogout}
          style={{background:"none",border:`1px solid ${C.border}`,borderRadius:8,padding:"6px 14px",color:C.ivoryFaint,fontFamily:F.heading,fontSize:8,letterSpacing:"0.15em",flexShrink:0}}>
          LOGOUT
        </motion.button>
      </div>

      {/* Stat pills */}
      <div style={{padding:"16px clamp(16px,4vw,32px)",display:"flex",gap:10,flexWrap:"nowrap",overflowX:"auto"}}>
        <StatPill icon="⚔️" value={`${completedToday}/${habits.length}`} label="done today" color={C.green}/>
        <StatPill icon="🔥" value={`${Math.round(todayScore*100)}%`} label="completion" color={C.gold}/>
        <StatPill icon="⚡" value={`${streak}d`} label="streak" color={C.blue}/>
      </div>

      {/* Calendar */}
      <div style={{margin:"0 clamp(16px,4vw,32px)",background:C.card,borderRadius:20,padding:"16px",border:`1px solid ${C.border}`}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
          <NavArrow dir="left" onClick={prevMo}/>
          <span style={{fontFamily:F.heading,fontSize:"clamp(11px,2.5vw,14px)",color:C.ivory,letterSpacing:"0.1em"}}>{MONTHS[calMo]} {calYr}</span>
          <NavArrow dir="right" onClick={nextMo}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",marginBottom:8}}>
          {DAYS_S.map((d,i)=>(
            <div key={i} style={{textAlign:"center",fontFamily:F.heading,fontSize:8,letterSpacing:"0.1em",color:C.ivoryFaint,padding:"2px 0"}}>{d}</div>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3}}>
          {Array(fd).fill(null).map((_,i)=><div key={`e${i}`}/>)}
          {Array(dim).fill(null).map((_,i)=>{
            const day=i+1
            const ds=`${calYr}-${String(calMo+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`
            const sc=dayScore(habits,logs,ds)
            const isSel=selDate===ds
            const isToday=ds===today
            return(
              <motion.button key={day} whileTap={{scale:0.85}} onClick={()=>setSelDate(ds)}
                style={{aspectRatio:"1",borderRadius:8,border:isSel?`1.5px solid ${C.green}`:isToday?`1.5px solid ${C.gold}44`:"1px solid transparent",background:sc>0?C.heat(sc):"rgba(255,255,255,0.03)",color:isSel?C.green:isToday?C.gold:C.ivory,fontFamily:isSel||isToday?F.heading:"inherit",fontSize:"clamp(9px,2vw,12px)",fontWeight:isSel?"bold":"normal",transition:"all 0.15s",boxShadow:isSel?`0 0 10px ${C.green}33`:"none"}}>
                {day}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Selected date + habits */}
      <div style={{padding:"16px clamp(16px,4vw,32px)"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
          <div>
            <p style={{fontFamily:F.heading,fontSize:8,letterSpacing:"0.2em",color:C.greenDim,marginBottom:2}}>
              {isSelectedToday?"TODAY":"SELECTED DAY"}
            </p>
            <p style={{fontFamily:F.heading,fontSize:"clamp(11px,2.5vw,14px)",color:C.ivory}}>{selDate}</p>
          </div>
          <motion.button whileTap={{scale:0.95}} onClick={()=>setModal(true)}
            style={{display:"flex",alignItems:"center",gap:8,padding:"9px 18px",background:`linear-gradient(135deg,#0f3320,#1a5c35)`,border:`1px solid rgba(52,211,113,0.3)`,borderRadius:12,color:C.ivory,fontFamily:F.heading,fontSize:9,letterSpacing:"0.15em",boxShadow:`inset 0 1px 0 rgba(52,211,113,0.15)`}}>
            <span style={{fontSize:14}}>+</span> NEW HABIT
          </motion.button>
        </div>

        <div style={{height:1,background:`linear-gradient(90deg,transparent,${C.border},transparent)`,marginBottom:14}}/>

        <AnimatePresence>
          {habits.length===0&&(
            <motion.div initial={{opacity:0}} animate={{opacity:1}} style={{textAlign:"center",padding:"40px 0"}}>
              <p style={{fontSize:48,opacity:0.1,marginBottom:12}}>⚔️</p>
              <p style={{fontFamily:F.heading,fontSize:10,letterSpacing:"0.2em",color:C.greenDim,marginBottom:8}}>NO HABITS YET</p>
              <p style={{color:C.ivoryFaint,fontSize:14}}>Tap + NEW HABIT to forge your first one.</p>
            </motion.div>
          )}
          {habits.map((h,idx)=>(
            <HabitCard key={h._id} habit={h} log={getLog(h._id,selDate)} onLog={v=>log(h._id,selDate,v)} onDelete={()=>deleteHabit(h._id)} idx={idx}/>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
