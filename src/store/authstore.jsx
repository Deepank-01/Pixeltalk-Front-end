import { create } from "zustand";
import axiosInstance from "../Lib/AxiosInstance";
import toast from "react-hot-toast";

export const useAuthStore=create((set)=>({
authUser:localStorage.getItem("User")? JSON.parse(localStorage.getItem("User")) : null,
isSigningUp: false,
isLoggingIn: false,
isUpdatingProfile: false,
// isCheckingAuth: true,
onlineUsers: [],
socket: null,

// functions
updateAuthUser: (user) => set({ authUser: user }),
signup:async(data)=>{
    try{
        const res=await axiosInstance.post("/auth/Singin",data)
        console.log("The resposne from the backedn is ", res)
        if(res?.data?.success==false) {
            toast.error(res?.data?.message)
            return 
        }
      
        // JSON.parse(localStorage.setItem("User",res?.data?.User))
        localStorage.setItem("User", JSON.stringify(res?.data?.User));
        toast.success("SignUp Success")
        
    }
    catch(err){
        console.log(err.message)
    }
},
login:async(data)=>{
    try{
         set({isLoggingIn:true})
        const res=await axiosInstance.post("/auth/Login",data)
        console.log("The resposne from the backedn is ", res?.data?.User)
        if(res?.data?.success==false) {
            toast.error(res?.data?.message)
            set({isLoggingIn:false})
            return 
        }
        // (localStorage.setItem("User",res?.data?.User))
        localStorage.setItem("User", JSON.stringify(res?.data?.User));
        toast.success("SignUp Success")
        set({authUser:JSON.parse(localStorage.getItem("User"))})
        console.log(authUser)
        set({isLoggingIn:false})
    }
    catch(err){
        console.log(err.message)
        set({isLoggingIn:false})
    }
},
updateProfile:async(data)=>{
try{
  set({isUpdatingProfile:true})
  console.log(data)
  const res=await axiosInstance.post("/auth/update_profile",data,{
    headers: {
        'Content-Type': 'multipart/form-data'
      }

  });
  if(res?.data?.success==false){
    toast.error(res?.data?.message)
    set({isUpdatingProfile:false})
    return
  }
  localStorage.setItem("User", JSON.stringify(res?.data?.updatedUser));
  toast.success(res?.data?.message)
  set({isUpdatingProfile:false})
}
catch(err){
    console.log(err)
    set({isUpdatingProfile:false})
}
},
logout:()=>{

}

}))