import {F,C} from "../constants/designTokens"
export default function FieldLabel({children}){
  return <p style={{fontFamily:F.heading,fontSize:8,letterSpacing:"0.25em",color:C.greenDim,textTransform:"uppercase",marginBottom:6}}>{children}</p>
}
