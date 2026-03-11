import {motion} from "framer-motion"
import {NAV_ITEMS,C,F} from "../constants/designTokens"
export default function BottomNav({nav,setNav}){
  return(
    <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:1200,zIndex:50,padding:"0 16px 12px"}}>
      <div style={{position:"absolute",bottom:"100%",left:0,right:0,height:50,background:`linear-gradient(to top,${C.bg} 30%,transparent)`,pointerEvents:"none"}}/>
      <div style={{display:"flex",borderRadius:20,overflow:"hidden",background:"rgba(7,16,10,0.97)",border:`1px solid ${C.border}`,backdropFilter:"blur(20px)",boxShadow:`0 -4px 30px rgba(0,0,0,0.4),inset 0 1px 0 rgba(52,211,113,0.05)`}}>
        {NAV_ITEMS.map(item=>{
          const active=nav===item.id
          return(
            <motion.button key={item.id} onClick={()=>setNav(item.id)} whileTap={{scale:0.9}}
              style={{flex:1,padding:"12px 4px 10px",border:"none",background:active?`linear-gradient(180deg,rgba(52,211,113,0.1) 0%,transparent 100%)`:"transparent",display:"flex",flexDirection:"column",alignItems:"center",gap:4,position:"relative",transition:"background 0.2s"}}>
              {active&&<motion.div layoutId="navLine" style={{position:"absolute",top:0,left:"15%",right:"15%",height:2,borderRadius:"0 0 2px 2px",background:C.green,boxShadow:`0 0 8px ${C.green}`}}/>}
              <span style={{fontSize:18,lineHeight:1}}>{item.icon}</span>
              <span style={{fontFamily:F.heading,fontSize:7,letterSpacing:"0.2em",color:active?C.green:C.ivoryFaint,transition:"color 0.2s"}}>{item.label}</span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
