import { Route, Routes } from "react-router"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import SignUpPage from "./Pages/Singin"
import { useAuthStore } from "./store/authstore"
import { useEffect } from "react"
import { Toaster } from "react-hot-toast"
import ProfilePage from "./Pages/ProfilePage"
import { useThemestore } from "./store/useThemestore"
import Set_theme from "./Pages/Set_theme"


function App() {
const {authUser,updateAuthUser} =useAuthStore();
const{theme,setTheme}=useThemestore()
// to update the aouht value on the local host change 
console.log("This is the value of the theme",theme)
useEffect(() => {
  const checkAuth = () => {
    const storedToken = localStorage.getItem("User");
    if (storedToken) {
      updateAuthUser(JSON.parse(storedToken)); // Update Zustand state
    } else {
      updateAuthUser(null); // Remove user if token is deleted
    }
  };

  // Run once on mount
  checkAuth();

  // Listen for storage changes (in case token updates from another tab)
  window.addEventListener("storage", checkAuth);

  return () => {
    window.removeEventListener("storage", checkAuth);
  };
}, [updateAuthUser]);

// useEffect(()=>{
//   setTheme()
// })

  return (
   <div  className=" h-[100vh] overflow-y-auto  " data-theme={theme}>
   <Navbar/>
   {/* <div>Message</div> */}
   <Routes>
    <Route path="/" element={authUser?<Home/>:<Login/>}></Route>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element ={<SignUpPage/>}/>
    <Route path="/Profile" element={authUser?<ProfilePage/>:<Login/>}></Route>
    <Route path="/setting/theme" element={authUser ?<Set_theme/>:<Login/>}/>
   </Routes>
    <Toaster/>
   </div>
  )
}

export default App
