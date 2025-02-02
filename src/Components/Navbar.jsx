// import { Link } from "react-router-dom";
import { Link } from "react-router";
// import { useAuthStore } from "../store/useAuthStore";
import { Home, LogOut, MessageSquare, Settings, User } from "lucide-react";
import { useAuthStore } from "../store/authstore";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className=" mb-2  bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-20  mt-1">
        <div className="flex items-center justify-between h-full md:gap-24">
          <div className="flex items-center gap-8 mt-2">
            <Link to="/" className="flex items-center gap-8 hover:opacity-80 transition-all">
              <div className="md:w-20 md:h-16 size-5 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className=" w-[100%] h-[100%]  text-primary" />
              </div>
              <h1 className="text-lg md:text-5xl font-bold">Friend-Zone</h1>
            </Link>
          </div>

          <div className="flex items-center  gap-2 md:gap-5">
            {authUser && (
              <>
                <Link to={"/Profile"} className={`btn  btn-xs md:btn-sm gap-2`}>
                  <User className="md:size-5 size-3"  />
                  <span className="hidden sm:inline ">Profile</span>
                </Link>
                 <Link  to ={"/"} className=" btn btn-xs md:btn-sm gap-3">
                  <Home className="md:size-5 size-3"/>
                  <span className="hidden sm:inline">Home</span>
                 </Link>
              
              </>
            )}
            <Link
              to={"/setting/theme"}
              className={`
              btn btn-xs md:btn-sm gap-2 transition-colors
              
              `}
            >
              <Settings className="md:size-5 size-3" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
            {authUser && (
              <button className="btn glass" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;