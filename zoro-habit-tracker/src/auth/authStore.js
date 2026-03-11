import {todayStr} from "../utils/dateUtils"

function getUsers(){
try{
return JSON.parse(localStorage.getItem("zh_users")||"[]")
}catch{
return[]
}
}

function saveUsers(u){
localStorage.setItem("zh_users",JSON.stringify(u))
}

export function authSignUp(name,email,password){
const users=getUsers()
if(users.find(u=>u.email===email)){
return{error:"An account with this email already exists."}
}

const user={
id:Date.now().toString(),
name,
email,
password,
createdAt:todayStr()
}

saveUsers([...users,user])
return{user}
}

export function authSignIn(email,password){
const users=getUsers()
const user=users.find(u=>u.email===email)

if(!user)return{error:"No account found with this email."}
if(user.password!==password)return{error:"Incorrect password."}

return{user}
}