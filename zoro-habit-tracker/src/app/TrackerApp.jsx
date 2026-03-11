import {useState,useEffect,useCallback} from "react"
import {AnimatePresence} from "framer-motion"
import Shell from "../layout/Shell"
import BottomNav from "../layout/BottomNav"
import HomePage from "../pages/HomePage"
import DashboardPage from "../pages/DashboardPage"
import YearlyPage from "../pages/YearlyPage"
import MasteryPage from "../pages/MasteryPage"
import AddModal from "../habits/AddModal"
import {todayStr} from "../utils/dateUtils"
import {QUOTES} from "../constants/designTokens"
import {getHabits,createHabit,deleteHabit as deleteHabitAPI,updateHabitLog} from "../api/habitApi"

// Safely converts a Mongoose Map or plain object to a plain JS object
function normalizeLogs(logs){
  if(!logs) return {}
  try {
    if(logs instanceof Map) return Object.fromEntries(logs)
    if(typeof logs === "object") return Object.fromEntries(Object.entries(logs))
    return {}
  } catch { return {} }
}

export default function TrackerApp({user,onLogout}){
  const [habits,setHabits]=useState([])
  const [logs,setLogs]=useState({})
  const [nav,setNav]=useState("home")
  const [selDate,setSelDate]=useState(todayStr())
  const [calMo,setCalMo]=useState(new Date().getMonth())
  const [calYr,setCalYr]=useState(new Date().getFullYear())
  const [modal,setModal]=useState(false)
  const [quote]=useState(()=>QUOTES[Math.floor(Math.random()*QUOTES.length)])

  useEffect(()=>{
    const fetchHabits=async()=>{
      try{
        const res=await getHabits()
        const normalized=res.data.map(h=>({...h,id:h._id}))
        setHabits(normalized)
        const logsMap={}
        normalized.forEach(h=>{ logsMap[h._id]=normalizeLogs(h.logs) })
        setLogs(logsMap)
      }catch(err){console.error(err)}
    }
    fetchHabits()
  },[])

  const addHabit=useCallback(async habit=>{
    try{
      const res=await createHabit(habit)
      const h={...res.data,id:res.data._id}
      setHabits(prev=>[...prev,h])
      setLogs(prev=>({...prev,[h._id]:normalizeLogs(h.logs)}))
      setModal(false)
    }catch(err){console.error(err)}
  },[])

  const deleteHabit=useCallback(async id=>{
    try{
      await deleteHabitAPI(id)
      setHabits(prev=>prev.filter(h=>h._id!==id))
      setLogs(prev=>{const n={...prev};delete n[id];return n})
    }catch(err){console.error(err)}
  },[])

  const log=useCallback(async(hid,date,val)=>{
    try{
      const res=await updateHabitLog(hid,{date,value:val})
      setLogs(prev=>({...prev,[hid]:normalizeLogs(res.data.logs)}))
    }catch(err){console.error(err)}
  },[])

  const getLog=useCallback((hid,date)=>logs[hid]?.[date??selDate],[logs,selDate])

  const shared={habits,logs,selDate,setSelDate,calMo,calYr,setCalMo,setCalYr,log,getLog,deleteHabit,setModal,quote,user,onLogout}

  return(
    <Shell>
      <div style={{paddingBottom:90}}>
        <AnimatePresence mode="wait">
          {nav==="home"&&<HomePage key="home" {...shared}/>}
          {nav==="dashboard"&&<DashboardPage key="dash" {...shared}/>}
          {nav==="yearly"&&<YearlyPage key="yearly" {...shared}/>}
          {nav==="mastery"&&<MasteryPage key="mastery" {...shared}/>}
        </AnimatePresence>
      </div>
      <BottomNav nav={nav} setNav={setNav}/>
      <AnimatePresence>
        {modal&&<AddModal onAdd={addHabit} onClose={()=>setModal(false)} count={habits.length}/>}
      </AnimatePresence>
    </Shell>
  )
}
