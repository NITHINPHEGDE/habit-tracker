import {F,C} from "../constants/designTokens"
export default function StatPill({icon,value,label,color}){
  return(
    <div style={{flex:1,minWidth:0,borderRadius:16,padding:"14px 16px",background:`${color}08`,border:`1px solid ${color}22`,display:"flex",alignItems:"center",gap:10,boxShadow:`inset 0 1px 0 ${color}10`}}>
      <span style={{fontSize:20,lineHeight:1,flexShrink:0}}>{icon}</span>
      <div style={{minWidth:0}}>
        <div style={{fontFamily:F.heading,fontSize:"clamp(14px,3vw,18px)",color,lineHeight:1,marginBottom:3}}>{value}</div>
        <div style={{fontFamily:F.heading,fontSize:7,letterSpacing:"0.16em",color:C.ivoryFaint,textTransform:"uppercase",whiteSpace:"nowrap"}}>{label}</div>
      </div>
    </div>
  )
}
