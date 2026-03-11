import {motion} from "framer-motion"
import {C,F} from "../constants/designTokens"
export default function GhostButton({children,onClick}){
  return(
    <motion.button whileTap={{scale:0.97}} onClick={onClick}
      style={{width:"100%",padding:"15px",borderRadius:14,background:"rgba(52,211,113,0.03)",border:`1px solid ${C.border}`,color:C.ivoryDim,fontFamily:F.heading,fontSize:11,letterSpacing:"0.2em",transition:"all 0.2s"}}>
      {children}
    </motion.button>
  )
}
