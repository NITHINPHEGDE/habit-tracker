import {useState} from "react"
import {motion} from "framer-motion"
import {C,F} from "../constants/designTokens"
import QtyBtn from "../ui/QtyBtn"

export default function HabitCard({habit,log,onLog,onDelete,idx}){
  const isBool=habit.type==="bool"
  const target=habit.target||1
  const value=log||0
  const done=isBool
    ? (log===1||log===true||log==="1")
    : value>=target
  const progress=isBool?(done?1:0):Math.min(value/target,1)
  const color=habit.color||C.green

  const [editing,setEditing]=useState(false)
  const [draft,setDraft]=useState("")

  const startEdit=()=>{
    setDraft(String(value))
    setEditing(true)
  }

  const commitEdit=()=>{
    const parsed=parseInt(draft,10)
    onLog(isNaN(parsed)||parsed<0?0:parsed)
    setEditing(false)
  }

  return(
    <motion.div
      initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} exit={{opacity:0,x:20,scale:0.95}}
      transition={{delay:idx*0.05,duration:0.35,ease:[0.22,1,0.36,1]}}
      style={{borderRadius:18,marginBottom:10,background:done?`${color}0a`:C.card,border:`1px solid ${done?color+"30":C.border}`,padding:"14px 16px",position:"relative",overflow:"hidden",transition:"background 0.3s,border-color 0.3s",boxShadow:done?`0 0 24px ${color}0d`:"none"}}>

      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"rgba(255,255,255,0.03)"}}>
        <motion.div animate={{width:`${progress*100}%`}} transition={{duration:0.4,ease:"easeOut"}}
          style={{height:"100%",background:`linear-gradient(90deg,${color}88,${color})`,borderRadius:2}}/>
      </div>

      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12}}>
        <div style={{flex:1,minWidth:0}}>
          <p style={{fontFamily:F.heading,fontSize:11,color:C.ivory,marginBottom:2,letterSpacing:"0.05em",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
            {habit.name}
          </p>
          <p style={{fontFamily:F.heading,fontSize:7,letterSpacing:"0.2em",color:done?color:C.ivoryFaint,textTransform:"uppercase"}}>
            {isBool
              ? (done?"✓ COMPLETE":"○ PENDING")
              : `${value} / ${target}${habit.unit?" "+habit.unit:""}`}
          </p>
        </div>

        <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
          {isBool&&(
            <motion.button whileTap={{scale:0.85}}
              onClick={()=>onLog(done?0:1)}
              style={{width:44,height:44,borderRadius:14,border:`1.5px solid ${done?color:C.border}`,background:done?`${color}22`:"transparent",color:done?color:C.ivoryFaint,fontSize:20,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s",boxShadow:done?`0 0 16px ${color}22`:"none"}}>
              {done?"✓":"○"}
            </motion.button>
          )}
          {!isBool&&(
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <QtyBtn label="−" color={color} disabled={value<=0} onClick={()=>{if(value>0)onLog(value-1)}}/>
              <div style={{minWidth:48,textAlign:"center"}}>
                {editing
                  ? <input
                      autoFocus
                      type="text"
                      inputMode="numeric"
                      value={draft}
                      onChange={e=>setDraft(e.target.value.replace(/[^0-9]/g,""))}
                      onFocus={e=>e.target.select()}
                      onBlur={commitEdit}
                      onKeyDown={e=>{
                        if(e.key==="Enter")commitEdit()
                        if(e.key==="Escape")setEditing(false)
                      }}
                      style={{width:52,textAlign:"center",background:"rgba(255,255,255,0.07)",border:`1.5px solid ${color}`,borderRadius:8,color,fontFamily:F.heading,fontSize:18,padding:"4px",outline:"none"}}
                    />
                  : <span
                      onClick={startEdit}
                      style={{fontFamily:F.heading,fontSize:18,color,cursor:"text",borderBottom:`1.5px dashed ${color}66`,paddingBottom:1,userSelect:"none"}}>
                      {value}
                    </span>
                }
              </div>
              <QtyBtn label="+" color={color} onClick={()=>onLog(value+1)}/>
            </div>
          )}
          <motion.button whileTap={{scale:0.85}} onClick={onDelete}
            style={{width:30,height:30,borderRadius:8,background:"none",border:"none",color:C.red+"88",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>
            ✕
          </motion.button>
        </div>
      </div>

      {!isBool&&target>1&&(
        <div style={{marginTop:10,height:4,borderRadius:4,background:"rgba(255,255,255,0.05)",overflow:"hidden"}}>
          <motion.div animate={{width:`${progress*100}%`}} transition={{duration:0.4}}
            style={{height:"100%",background:`linear-gradient(90deg,${color}66,${color})`,borderRadius:4}}/>
        </div>
      )}
    </motion.div>
  )
}
