import {motion} from "framer-motion"
import {C,F,QUOTES} from "../constants/designTokens"
import PrimaryButton from "../ui/PrimaryButton"
import GhostButton from "../ui/GhostButton"
const s={
  container:{animate:{transition:{staggerChildren:0.1}}},
  item:{initial:{opacity:0,y:20},animate:{opacity:1,y:0,transition:{duration:0.6,ease:[0.22,1,0.36,1]}}}
}
export default function LandingPage({setView}){
  const quote=QUOTES[0]
  return(
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,scale:0.98}} transition={{duration:0.4}}
      style={{minHeight:"100vh",display:"flex",flexDirection:"column",padding:"0 20px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"24px 0 0"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:16}}>⚔️</span>
          <span style={{fontFamily:F.heading,fontSize:9,letterSpacing:"0.3em",color:C.greenDim,textTransform:"uppercase"}}>Zoro · Habit Dojo</span>
        </div>
        <motion.button whileTap={{scale:0.95}} onClick={()=>setView("signin")}
          style={{background:"none",border:`1px solid ${C.border}`,borderRadius:8,padding:"6px 14px",color:C.ivoryFaint,fontFamily:F.heading,fontSize:9,letterSpacing:"0.15em"}}>
          SIGN IN
        </motion.button>
      </div>
      <motion.div variants={s.container} initial="initial" animate="animate"
        style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center",paddingBottom:40,gap:0}}>
        <motion.div variants={s.item} animate={{y:[0,-8,0]}} transition={{duration:4,repeat:Infinity,ease:"easeInOut"}}
          style={{width:96,height:96,borderRadius:28,background:"linear-gradient(145deg,#0a2215,#152e1c)",border:`1px solid ${C.borderHi}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:44,marginBottom:32,boxShadow:`0 0 0 1px rgba(52,211,113,0.05),0 20px 60px rgba(0,0,0,0.5),0 0 80px rgba(52,211,113,0.08)`}}>
          ⚔️
        </motion.div>
        <motion.p variants={s.item} style={{fontFamily:F.heading,fontSize:10,letterSpacing:"0.45em",color:C.greenDim,textTransform:"uppercase",marginBottom:16}}>The Way of the Sword</motion.p>
        <motion.h1 variants={s.item} style={{fontFamily:F.display,fontSize:"clamp(28px,8vw,52px)",fontWeight:900,color:C.ivory,lineHeight:1.1,marginBottom:16}}>
          FORGE YOUR<br/><span style={{background:`linear-gradient(135deg,${C.green},${C.gold})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>LEGEND</span>
        </motion.h1>
        <motion.p variants={s.item} style={{fontSize:16,color:C.ivoryFaint,maxWidth:280,lineHeight:1.6,marginBottom:36}}>Track your daily habits.<br/>Cut a path through weakness.</motion.p>
        <motion.div variants={s.item} style={{borderLeft:`2px solid ${C.gold}`,paddingLeft:16,marginBottom:48,textAlign:"left",maxWidth:300}}>
          <p style={{fontStyle:"italic",fontSize:14,color:C.goldDim,lineHeight:1.6,marginBottom:4}}>"{quote.text}"</p>
          <p style={{fontFamily:F.heading,fontSize:8,letterSpacing:"0.2em",color:C.greenDim}}>— {quote.attr}</p>
        </motion.div>
        <motion.div variants={s.item} style={{display:"flex",flexDirection:"column",gap:12,width:"100%",maxWidth:340}}>
          <PrimaryButton onClick={()=>setView("signup")}>⚔ Begin Your Training</PrimaryButton>
          <GhostButton onClick={()=>setView("signin")}>Sign In to Your Dojo</GhostButton>
        </motion.div>
      </motion.div>
      <div style={{textAlign:"center",paddingBottom:24,fontFamily:F.heading,fontSize:8,letterSpacing:"0.3em",color:C.ivoryFaint}}>◆ &nbsp; HONOR · DISCIPLINE · STRENGTH &nbsp; ◆</div>
    </motion.div>
  )
}
