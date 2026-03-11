import {F,C} from "../constants/designTokens"
export default function CardLabel({children,style={}}){
  return <p style={{fontFamily:F.heading,fontSize:9,letterSpacing:"0.25em",color:C.greenDim,textTransform:"uppercase",marginBottom:12,...style}}>{children}</p>
}
