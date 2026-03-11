import {motion} from "framer-motion"
import {C} from "../constants/designTokens"
export default function NavArrow({dir,onClick}){
  return(
    <motion.button whileTap={{scale:0.85}} onClick={onClick}
      style={{width:34,height:34,borderRadius:10,border:`1px solid ${C.border}`,background:"rgba(52,211,113,0.04)",color:C.green,fontSize:19,display:"flex",alignItems:"center",justifyContent:"center"}}>
      {dir==="left"?"‹":"›"}
    </motion.button>
  )
}
