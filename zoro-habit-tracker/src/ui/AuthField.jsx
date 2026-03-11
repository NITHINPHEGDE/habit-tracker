import {useState} from "react"
import {motion} from "framer-motion"
import {C,F} from "../constants/designTokens"
export default function AuthField({label,type,value,onChange,placeholder,valid}){
  const [focused,setFocused]=useState(false)
  const showValid=valid===true
  return(
    <div style={{marginBottom:18}}>
      <p style={{fontFamily:F.heading,fontSize:8,letterSpacing:"0.28em",textTransform:"uppercase",color:focused?C.green:C.greenDim,marginBottom:8,transition:"color 0.2s"}}>{label}</p>
      <div style={{position:"relative"}}>
        <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
          onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
          style={{width:"100%",padding:"13px 16px",borderRadius:12,background:focused?"rgba(52,211,113,0.04)":"rgba(255,255,255,0.02)",border:`1.5px solid ${focused?C.green:showValid?C.green:C.border}`,color:C.ivory,fontFamily:F.body,fontSize:16,outline:"none",transition:"all 0.2s",boxShadow:focused?`0 0 0 3px rgba(52,211,113,0.06)`:"none"}}/>
        {showValid&&<motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",color:C.green,fontSize:14}}>✓</motion.div>}
      </div>
    </div>
  )
}
