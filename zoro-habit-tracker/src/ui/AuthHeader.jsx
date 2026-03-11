import {motion} from "framer-motion"
import {C,F} from "../constants/designTokens"
export default function AuthHeader({onBack}){
  return(
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"24px 20px 0"}}>
      <motion.button whileTap={{scale:0.9}} onClick={onBack}
        style={{background:"none",border:`1px solid ${C.border}`,borderRadius:8,padding:"6px 14px",color:C.ivoryFaint,fontFamily:F.heading,fontSize:9,letterSpacing:"0.15em"}}>
        ← BACK
      </motion.button>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontSize:16}}>⚔️</span>
        <span style={{fontFamily:F.heading,fontSize:9,letterSpacing:"0.25em",color:C.greenDim}}>ZORO DOJO</span>
      </div>
    </div>
  )
}
