import {useState} from "react"
import {motion,AnimatePresence} from "framer-motion"
import AuthHeader from "../ui/AuthHeader"
import AuthField from "../ui/AuthField"
import ErrorBanner from "../ui/ErrorBanner"
import PrimaryButton from "../ui/PrimaryButton"
import {loginUser} from "../api/authApi"
import {C,F} from "../constants/designTokens"
export default function SignInPage({setView,onAuth}){
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState("")
  const [loading,setLoading]=useState(false)
  const handleSubmit=async()=>{
    setError("")
    if(!email||!password){setError("Please fill in all fields.");return}
    try{
      setLoading(true)
      const res=await loginUser({email:email.trim().toLowerCase(),password})
      localStorage.setItem("user",JSON.stringify(res.data))
      onAuth(res.data)
    }catch(err){setError(err.response?.data?.message||"Login failed")}
    finally{setLoading(false)}
  }
  return(
    <motion.div initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}} transition={{duration:0.35,ease:[0.22,1,0.36,1]}}
      style={{minHeight:"100vh",display:"flex",flexDirection:"column"}}>
      <AuthHeader onBack={()=>setView("landing")}/>
      <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",padding:"40px 24px"}}>
        <div style={{marginBottom:36,textAlign:"center"}}>
          <p style={{fontFamily:F.heading,fontSize:9,letterSpacing:"0.4em",color:C.greenDim,marginBottom:10}}>RETURN TO THE DOJO</p>
          <h1 style={{fontFamily:F.display,fontSize:28,color:C.ivory}}>Sign In</h1>
        </div>
        <div style={{height:1,background:`linear-gradient(90deg,transparent,${C.border},transparent)`,marginBottom:32}}/>
        <AuthField label="Email" type="email" value={email} onChange={setEmail} placeholder="your@email.com"/>
        <AuthField label="Password" type="password" value={password} onChange={setPassword} placeholder="Your password"/>
        <AnimatePresence>{error&&<ErrorBanner message={error}/>}</AnimatePresence>
        <div style={{marginTop:24}}><PrimaryButton onClick={handleSubmit} loading={loading}>Enter the Dojo</PrimaryButton></div>
        <p style={{textAlign:"center",marginTop:20,fontSize:15,color:C.ivoryFaint}}>No account?{" "}
          <button onClick={()=>setView("signup")} style={{background:"none",border:"none",color:C.green,cursor:"pointer",fontSize:15,fontFamily:F.body}}>Begin training</button>
        </p>
      </div>
    </motion.div>
  )
}
