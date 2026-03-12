import { useAuth } from "@clerk/clerk-expo"
import axios, { AxiosInstance } from "axios"
import { useEffect } from "react"

const API_URL = "http://192.168.1.11/api"

const api = axios.create({
  baseURL: API_URL,
  headers:{
    "Content-Type":"application/json"
  }
})

export const useApi = () =>{
  const {getToken} = useAuth()
  useEffect(()=>{
    const interceptor = api.interceptors.request.use(async(config) =>{
      const token = await getToken()
      if(token){
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })
    //remove interceptor when component unmounts
    return  () =>{ api.interceptors.request.eject(interceptor)}
  },[getToken])
   return api
}

export const userApi= {
  syncUser: (api:AxiosInstance) => api.post("/user/sync"),
  getCurrentUser:(api:AxiosInstance)=>api.get("/users/me"),
  updateProfile: (api:AxiosInstance,data:any)=> api.put("/users/profile",data) 
}

