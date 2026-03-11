import {motion} from "framer-motion"

export default function QtyBtn({label,onClick,color,disabled}){
  return(
    <motion.button whileTap={disabled?{}:{scale:0.85}} onClick={onClick} disabled={disabled}
      style={{width:40,height:40,borderRadius:12,border:`1px solid ${disabled?"rgba(255,255,255,0.06)":color+"33"}`,background:disabled?"rgba(255,255,255,0.02)":`${color}12`,color:disabled?"rgba(255,255,255,0.2)":color,fontSize:20,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:disabled?"not-allowed":"pointer",transition:"all 0.15s"}}>
      {label}
    </motion.button>
  )
}
