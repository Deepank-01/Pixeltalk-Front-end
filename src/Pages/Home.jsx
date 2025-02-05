// import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
// import NoChatSelected from "../components/NoChatSelected";
// import ChatContainer from "../components/ChatContainer";
import { useChatStore } from "../store/useChatStore";
import NoChatSelected from "../Components/NoChatSelected";
import ChatContainer from "../Components/ChatContainer";
import { motion } from "framer-motion";
const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <motion.div
      initial={{ opacity: 0, scale:0.9 }}
     animate={{ opacity: 1, scale: 1 }}
     transition={{ duration: 0.5, ease:"easeInOut"}}
     className="h-screen bg-base-200 mt-4">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default HomePage;