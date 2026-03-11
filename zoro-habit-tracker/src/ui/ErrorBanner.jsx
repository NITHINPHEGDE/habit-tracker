import {motion} from "framer-motion"
import {C,F} from "../constants/designTokens"
export default function ErrorBanner({message}){
  return(
    <motion.div initial={{opacity:0,y:-8,scale:0.97}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:-8}}
      style={{marginTop:14,padding:"11px 16px",borderRadius:10,background:C.redDim,border:"1px solid rgba(224,82,82,0.25)",display:"flex",alignItems:"center",gap:10}}>
      <span style={{fontSize:14}}>⚠️</span>
      <p style={{fontSize:14,color:"#f87171",fontFamily:F.body}}>{message}</p>
    </motion.div>
  )
}
