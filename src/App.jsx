import { Route, Routes } from "react-router"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import SignUpPage from "./Pages/Singin"
import { useAuthStore } from "./store/authstore"
import { useEffect, useState } from "react"
import { Toaster } from "react-hot-toast"
import ProfilePage from "./Pages/ProfilePage"
import { useThemestore } from "./store/useThemestore"
import Set_theme from "./Pages/Set_theme"
import Loader from "./Components/Loader"

function App() {
const {authUser,updateAuthUser,check_Connection} =useAuthStore();
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
  // check_Connection();
  // Listen for storage changes (in case token updates from another tab)
  window.addEventListener("storage", checkAuth);
  check_Connection()

  return () => {
    window.removeEventListener("storage", checkAuth);
  };
}, [updateAuthUser]);

// useEffect(()=>{
//   setTheme()
// })


const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  // Simulate a loading delay (e.g., 3 seconds)
  const timer = setTimeout(() => {
    setIsLoading(false); // Hide loader after delay
  }, 2000);

  // Cleanup timer
  return () => clearTimeout(timer);
}, []);

  return (
    <>
    {
      isLoading?(<Loader/>)
        :(
          <div  className=" h-[100vh] overflow-y-auto  " data-theme={theme}>
          <div className="mb-2">
          <Navbar/>
          </div>
          
          {/* <div>Message</div> */}
          <Routes>
           <Route path="/" element={authUser?<Home/>:<Login/>}></Route>
           <Route path="/login" element={<Login/>}/>
           <Route path="/signup" element ={<SignUpPage/>}/>
           <Route path="/Profile" element={authUser?<ProfilePage/>:<Login/>}></Route>
           <Route path="/setting/theme" element={<Set_theme/>}/>
          </Routes>
           <Toaster/>
          </div>
      )
    
      
    }
    
    </>
  )
}

export default App
