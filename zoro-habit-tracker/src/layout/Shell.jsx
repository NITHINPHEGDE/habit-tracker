import {C,F} from "../constants/designTokens"
export default function Shell({children}){
  return(
    <div style={{background:C.bg,minHeight:"100vh",color:C.ivory,fontFamily:F.body,position:"relative",overflowX:"hidden"}}>
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,background:`radial-gradient(ellipse 80% 40% at 50% -5%,rgba(52,211,113,0.07) 0%,transparent 60%),radial-gradient(ellipse 50% 50% at 100% 60%,rgba(26,74,40,0.05) 0%,transparent 55%),radial-gradient(ellipse 60% 40% at 0% 100%,rgba(13,61,31,0.06) 0%,transparent 50%)`}}/>
      <div style={{position:"fixed",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${C.green},transparent)`,opacity:0.3,zIndex:100,pointerEvents:"none"}}/>
      <div style={{position:"relative",zIndex:1}}>{children}</div>
    </div>
  )
}
