import API from "./api"

export const getHabits = ()=>{
return API.get("/habits")
}

export const createHabit = (data)=>{
return API.post("/habits",data)
}

export const deleteHabit = (id)=>{
return API.delete(`/habits/${id}`)
}

export const updateHabitLog = (id,data)=>{
return API.put(`/habits/${id}/log`,data)
}