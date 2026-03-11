import {useState} from "react"
import {motion,AnimatePresence} from "framer-motion"
import AuthHeader from "../ui/AuthHeader"
import AuthField from "../ui/AuthField"
import ErrorBanner from "../ui/ErrorBanner"
import PrimaryButton from "../ui/PrimaryButton"
import {registerUser} from "../api/authApi"
import {C,F} from "../constants/designTokens"
export default function SignUpPage({setView,onAuth}){
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [confirm,setConfirm]=useState("")
  const [error,setError]=useState("")
  const [loading,setLoading]=useState(false)
  const handleSubmit=async()=>{
    setError("")
    if(!name.trim()){setError("Enter your warrior name.");return}
    if(!email.trim()||!/\S+@\S+\.\S+/.test(email)){setError("Enter a valid email.");return}
    if(password.length<6){setError("Password must be at least 6 characters.");return}
    if(password!==confirm){setError("Passwords don't match.");return}
    try{
      setLoading(true)
      const res=await registerUser({name:name.trim(),email:email.trim().toLowerCase(),password})
      localStorage.setItem("user",JSON.stringify(res.data))
      onAuth(res.data)
    }catch(err){setError(err.response?.data?.message||"Registration failed")}
    finally{setLoading(false)}
  }
  return(
    <motion.div initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}} transition={{duration:0.35,ease:[0.22,1,0.36,1]}}
      style={{minHeight:"100vh",display:"flex",flexDirection:"column",overflowY:"auto"}}>
      <AuthHeader onBack={()=>setView("landing")}/>
      <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"flex-start",padding:"24px 24px 40px"}}>
        <div style={{marginBottom:24,textAlign:"center"}}>
          <p style={{fontFamily:F.heading,fontSize:9,letterSpacing:"0.4em",color:C.greenDim,marginBottom:10}}>FORGE YOUR IDENTITY</p>
          <h1 style={{fontFamily:F.display,fontSize:26,color:C.ivory}}>Begin Training</h1>
        </div>
        <div style={{height:1,background:`linear-gradient(90deg,transparent,${C.border},transparent)`,marginBottom:20}}/>
        <AuthField label="Warrior Name" type="text" value={name} onChange={setName} placeholder="Your name" valid={name.length>1}/>
        <AuthField label="Email" type="email" value={email} onChange={setEmail} placeholder="your@email.com" valid={/\S+@\S+\.\S+/.test(email)}/>
        <AuthField label="Password" type="password" value={password} onChange={setPassword} placeholder="Min 6 characters" valid={password.length>=6}/>
        <AuthField label="Confirm Password" type="password" value={confirm} onChange={setConfirm} placeholder="Repeat password" valid={confirm.length>0&&confirm===password}/>
        <AnimatePresence>{error&&<ErrorBanner message={error}/>}</AnimatePresence>
        <div style={{marginTop:20}}><PrimaryButton onClick={handleSubmit} loading={loading}>⚔ Forge My Account</PrimaryButton></div>
        <p style={{textAlign:"center",marginTop:16,fontSize:15,color:C.ivoryFaint}}>Already have an account?{" "}
          <button onClick={()=>setView("signin")} style={{background:"none",border:"none",color:C.green,cursor:"pointer",fontSize:15,fontFamily:F.body}}>Sign In</button>
        </p>
      </div>
    </motion.div>
  )
}
