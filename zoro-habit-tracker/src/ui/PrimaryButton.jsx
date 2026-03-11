import {motion} from "framer-motion"
import {C,F} from "../constants/designTokens"
export default function PrimaryButton({children,onClick,loading}){
  return(
    <motion.button whileTap={{scale:0.97}} onClick={onClick} disabled={loading}
      style={{width:"100%",padding:"15px",borderRadius:14,border:`1px solid rgba(52,211,113,0.3)`,background:loading?"rgba(52,211,113,0.08)":"linear-gradient(135deg,#0f3320 0%,#1a5c35 50%,#0f3320 100%)",color:loading?C.ivoryFaint:C.ivory,fontFamily:F.heading,fontSize:11,letterSpacing:"0.25em",transition:"all 0.3s",boxShadow:loading?"none":`inset 0 1px 0 rgba(52,211,113,0.15),0 4px 20px rgba(0,0,0,0.3)`}}>
      {loading?"...":children}
    </motion.button>
  )
}
