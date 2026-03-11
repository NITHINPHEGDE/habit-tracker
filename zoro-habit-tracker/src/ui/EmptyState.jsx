import {motion} from "framer-motion"
import {F,C} from "../constants/designTokens"
export default function EmptyState(){
  return(
    <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"80px 32px",textAlign:"center"}}>
      <motion.div animate={{y:[0,-6,0]}} transition={{duration:3,repeat:Infinity,ease:"easeInOut"}} style={{fontSize:52,opacity:0.12,marginBottom:20}}>⚔️</motion.div>
      <p style={{fontFamily:F.heading,fontSize:11,letterSpacing:"0.2em",color:C.greenDim,marginBottom:10}}>NO HABITS FORGED YET</p>
      <p style={{fontSize:15,color:C.ivoryFaint,lineHeight:1.6}}>Return to the Dojo tab and<br/>forge your first habit.</p>
    </motion.div>
  )
}
