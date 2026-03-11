import {F,C} from "../constants/designTokens"
export default function PageHeader({icon,title,sub}){
  return(
    <div style={{marginBottom:24}}>
      <p style={{fontFamily:F.heading,fontSize:8,letterSpacing:"0.35em",color:C.greenDim,textTransform:"uppercase",marginBottom:6}}>{icon} {sub}</p>
      <h2 style={{fontFamily:F.display,fontSize:"clamp(20px,4vw,28px)",color:C.ivory}}>{title}</h2>
    </div>
  )
}
