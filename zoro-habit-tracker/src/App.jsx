import {useState,useCallback} from "react"
import {AnimatePresence} from "framer-motion"
import Shell from "./layout/Shell"
import LandingPage from "./pages/LandingPage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TrackerApp from "./app/TrackerApp"

export default function App(){
  const [authUser,setAuthUser]=useState(()=>{
    try{return JSON.parse(localStorage.getItem("user")||"null")}
    catch{return null}
  })
  const [authView,setAuthView]=useState("landing")

  const handleAuth=useCallback(user=>{
    localStorage.setItem("user",JSON.stringify(user))
    setAuthUser(user)
  },[])

  const handleLogout=useCallback(()=>{
    localStorage.removeItem("user")
    setAuthUser(null)
    setAuthView("landing")
  },[])

  if(!authUser){
    return(
      <Shell>
        <AnimatePresence mode="wait">
          {authView==="landing"&&<LandingPage key="land" setView={setAuthView}/>}
          {authView==="signin"&&<SignInPage key="in" setView={setAuthView} onAuth={handleAuth}/>}
          {authView==="signup"&&<SignUpPage key="up" setView={setAuthView} onAuth={handleAuth}/>}
        </AnimatePresence>
      </Shell>
    )
  }

  return <TrackerApp user={authUser} onLogout={handleLogout}/>
}
