import {useState} from "react"
import {motion,AnimatePresence} from "framer-motion"
import {C,F,PALETTE} from "../constants/designTokens"
import FieldLabel from "../ui/FieldLabel"

const inp={width:"100%",boxSizing:"border-box",padding:"11px 14px",borderRadius:12,background:"rgba(255,255,255,0.04)",border:`1.5px solid rgba(52,211,113,0.2)`,color:"#ede8dc",fontFamily:"'Crimson Pro',Georgia,serif",fontSize:15,outline:"none"}

export default function AddModal({onAdd,onClose,count}){
  const [form,setForm]=useState({name:"",type:"bool",target:1,unit:"",color:PALETTE[count%PALETTE.length]})
  const [targetInput,setTargetInput]=useState("1")
  const set=(k,v)=>setForm(p=>({...p,[k]:v}))
  const isQty=form.type==="quantity"

  const handleTargetChange=(e)=>{
    const raw=e.target.value.replace(/[^0-9]/g,"")
    setTargetInput(raw)
    const parsed=parseInt(raw,10)
    if(!isNaN(parsed)&&parsed>0) set("target",parsed)
  }

  const handleTargetBlur=()=>{
    const parsed=parseInt(targetInput,10)
    if(isNaN(parsed)||parsed<=0){
      setTargetInput("1")
      set("target",1)
    }
  }

  return(
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      style={{position:"fixed",inset:0,display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:200}}>
      <motion.div onClick={onClose} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
        style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.75)",backdropFilter:"blur(4px)"}}/>

      <motion.div initial={{y:60,opacity:0}} animate={{y:0,opacity:1}} exit={{y:60,opacity:0}} transition={{type:"spring",damping:28,stiffness:320}}
        style={{position:"relative",width:"100%",maxWidth:540,background:C.card,border:`1px solid ${C.borderHi}`,borderRadius:"24px 24px 0 0",padding:"28px 24px 40px",boxShadow:`0 -20px 60px rgba(0,0,0,0.6),0 0 0 1px rgba(52,211,113,0.05)`}}>

        <div style={{width:36,height:3,borderRadius:2,background:"rgba(255,255,255,0.12)",margin:"0 auto 24px"}}/>

        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
          <h3 style={{fontFamily:F.display,fontSize:18,color:C.ivory}}>Forge New Habit</h3>
          <motion.button whileTap={{scale:0.85}} onClick={onClose}
            style={{width:32,height:32,borderRadius:8,background:"none",border:`1px solid ${C.border}`,color:C.ivoryFaint,fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>
            ✕
          </motion.button>
        </div>

        <div style={{marginBottom:18}}>
          <FieldLabel>Habit Name</FieldLabel>
          <input value={form.name} onChange={e=>set("name",e.target.value)} placeholder="e.g. Morning run, Read, Meditate…" style={inp}/>
        </div>

        <div style={{marginBottom:18}}>
          <FieldLabel>Tracking Type</FieldLabel>
          <div style={{display:"flex",gap:8}}>
            {["bool","quantity"].map(t=>(
              <motion.button key={t} whileTap={{scale:0.95}} onClick={()=>set("type",t)}
                style={{flex:1,padding:"10px",borderRadius:12,border:`1.5px solid ${form.type===t?C.green:C.border}`,background:form.type===t?`${C.green}15`:"transparent",color:form.type===t?C.green:C.ivoryFaint,fontFamily:F.heading,fontSize:9,letterSpacing:"0.15em",transition:"all 0.2s"}}>
                {t==="bool"?"✓  YES / NO":"# QUANTITY"}
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {isQty&&(
            <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}} style={{overflow:"hidden"}}>
              <div style={{display:"flex",gap:12,marginBottom:18}}>
                <div style={{flex:1}}>
                  <FieldLabel>Daily Target</FieldLabel>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={targetInput}
                    onChange={handleTargetChange}
                    onFocus={e=>e.target.select()}
                    onBlur={handleTargetBlur}
                    style={inp}
                  />
                </div>
                <div style={{flex:1}}>
                  <FieldLabel>Unit (optional)</FieldLabel>
                  <input value={form.unit} onChange={e=>set("unit",e.target.value)} placeholder="hrs, km, pages…" style={inp}/>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{marginBottom:24}}>
          <FieldLabel>Color</FieldLabel>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {PALETTE.map(col=>(
              <motion.button key={col} whileTap={{scale:0.85}} onClick={()=>set("color",col)}
                style={{width:28,height:28,borderRadius:8,background:col,border:form.color===col?`2px solid ${C.ivory}`:`2px solid transparent`,boxShadow:form.color===col?`0 0 10px ${col}88`:"none",transition:"all 0.15s"}}/>
            ))}
          </div>
        </div>

        <div style={{marginBottom:20,padding:"12px 16px",borderRadius:14,background:`${form.color}10`,border:`1px solid ${form.color}30`,display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:10,height:10,borderRadius:3,background:form.color,flexShrink:0}}/>
          <span style={{fontFamily:F.heading,fontSize:11,color:C.ivory,flex:1,minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{form.name||"Habit name…"}</span>
          <span style={{fontFamily:F.heading,fontSize:8,color:form.color,letterSpacing:"0.15em",flexShrink:0}}>{isQty?`0 / ${form.target}${form.unit?" "+form.unit:""}`:"○ PENDING"}</span>
        </div>

        <motion.button whileTap={{scale:0.97}} onClick={()=>form.name.trim()&&onAdd(form)}
          style={{width:"100%",padding:"15px",borderRadius:14,border:`1px solid rgba(52,211,113,0.3)`,background:form.name.trim()?"linear-gradient(135deg,#0f3320,#1a5c35)":"rgba(52,211,113,0.05)",color:form.name.trim()?C.ivory:C.ivoryFaint,fontFamily:F.heading,fontSize:11,letterSpacing:"0.25em",transition:"all 0.2s",boxShadow:form.name.trim()?`inset 0 1px 0 rgba(52,211,113,0.15),0 4px 20px rgba(0,0,0,0.3)`:"none"}}>
          ⚔ FORGE HABIT
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
