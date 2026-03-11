import {C} from "../constants/designTokens"
export default function GlassCard({children,style={},glow=false}){
  return(
    <div style={{borderRadius:20,padding:20,background:C.card,border:`1px solid ${C.border}`,boxShadow:glow?`0 0 40px rgba(52,211,113,0.06),inset 0 1px 0 rgba(52,211,113,0.05)`:`inset 0 1px 0 rgba(255,255,255,0.02)`,...style}}>
      {children}
    </div>
  )
}
