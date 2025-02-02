import { create } from "zustand";
import axiosInstance from "../Lib/AxiosInstance";
import toast from "react-hot-toast";
export const useChatStore=create((set,get)=>({
users:[],
messages: [],
selectedUser: null,
isUsersLoading: false,
isMessagesLoading: true,
getUsers:async()=>{
    try{
        set({isUsersLoading:true})
         //api calling
         const res=await axiosInstance.get("/message/user")
         if(res?.data?.success==false){
           toast.error(res?.data?.message)
           set({isUsersLoading:false})
         }
         set({users:res?.data?.filteredUsers})
         set({isUsersLoading:false})
         
    }
    catch(err){
        set({isUsersLoading:false})
        console.log("Error in getting the user ", err.message)
        toast.error("Error in the api call ")
    }
},
getMessages:async()=>{
    try{
        set({isMessagesLoading:true})
        const{selectedUser}=get()
        set({isMessagesLoading:true})
        const res=await axiosInstance.get(`/message/get/${selectedUser._id}`)
        set({messages:res?.data})
        set({isMessagesLoading:false})
    }
    catch(err){
          console.log("Error in loading the chats ",err)
          toast.error(err.response.data.message);
          set({isMessagesLoading:false})
    }
},
sendMessage:async(message)=>{
try{
    const{selectedUser,messages}=get()
    console.log(selectedUser)
    const res=await axiosInstance.post(`/message/send/${selectedUser._id}`,message,{
        headers: {
            'Content-Type': 'multipart/form-data'
          },
    }) 
    if(res?.data?.success==false){
   toast.error("Error occur at the server side")
    }
    set({messages:[...messages,res?.data?.message]})
}
catch(err){
    console.log("Error in loading the chats ",err)
          toast.error(err.response.data.message);
        //   set({isMessagesLoading:false})
}
},
subscribeToMessages:()=>{},
unsubscribeFromMessages:()=>{},
setSelectedUser: (selectedUser) => set({ selectedUser}),

}))