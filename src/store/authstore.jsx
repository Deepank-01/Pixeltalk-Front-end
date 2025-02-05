import { create } from "zustand";
import axiosInstance from "../Lib/AxiosInstance";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
const BASE_URL=import.meta.env.VITE_BASE_URL
export const useAuthStore=create((set,get)=>({
authUser:localStorage.getItem("User")? JSON.parse(localStorage.getItem("User")) : null,
isSigningUp: false,
isLoggingIn: false,
isUpdatingProfile: false,
// isCheckingAuth: true,
onlineUsers: [],
socket: null,

// functions
check_Connection:  () => {
    //   const res = await axiosInstance.get("/auth/check");

    //   set({ authUser: res.data });
    const{authUser}=get()
    if(!authUser) return
      get().ConnectSocket();
    
  },
updateAuthUser: (user) => set({ authUser: user }),
signup:async(data)=>{
    try{
        const{ConnectSocket}=get()
        const res=await axiosInstance.post("/auth/Singin",data)
        console.log("The resposne from the backedn is ", res)
        if(res?.data?.success==false) {
            toast.error(res?.data?.message)
            return 
        }
      
        // JSON.parse(localStorage.setItem("User",res?.data?.User))
        localStorage.setItem("User", JSON.stringify(res?.data?.User));
        set({authUser:JSON.parse(localStorage.getItem("User"))})
        setTimeout(() => {
            console.log("Set_Ttimout inside")
            console.log(BASE_URL)
        ConnectSocket();
        
         }, 100); // Small delay to ensure state updates first
        toast.success("SignUp Success")
        
    }
    catch(err){
        console.log(err.message)
    }
},

login:async(data)=>{
    try{
         set({isLoggingIn:true})
         const{ConnectSocket}=get()
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
        console.log("Outside of the call from connect")
        set({isLoggingIn:false})
          // Ensure ConnectSocket is called AFTER Zustand updates authUser
         setTimeout(() => {
            console.log("Set_Ttimout inside")
            console.log(BASE_URL)
        ConnectSocket();
        
         }, 100); // Small delay to ensure state updates first
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
// const{authUser}=get()
const{DisconnectSocket}=get()
set({authUser:null})
localStorage.removeItem("User")
DisconnectSocket()
console.log("Dosconncected")

},
ConnectSocket:()=>{
    const{authUser}=get()
    console.log("this the socket connction request")
  if(!authUser || get().socket?.connected) return 

  // connection with io socket
  console.log(authUser._id)
  const Socket_connection = io(BASE_URL, {
    query: {
      userId: authUser._id,
    },
  });
  Socket_connection.connect();
  set({socket:Socket_connection})
  console.log(Socket_connection)
  // todo online user
  get().socket.on("getOnlineUsers", (userIds) => {
    set({ onlineUsers: userIds });
  });
},
DisconnectSocket:()=>{
    if (get().socket?.connected) get().socket.disconnect();
}

}))