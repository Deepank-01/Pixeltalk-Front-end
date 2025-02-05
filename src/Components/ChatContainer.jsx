// import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

// import ChatHeader from "./ChatHeader";
// import MessageInput from "./MessageInput";
// import MessageSkeleton from "./skeletons/MessageSkeleton";
// import { useAuthStore } from "../store/useAuthStore";
// import { formatMessageTime } from "../lib/utils";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/authstore";
import ChatHeader from "./ChatHeader";
import MessageSkeleton from "./Skeletons/MessageSkeletion";
import MessageInput from "./MessageInput";
import { formatMessageTime } from "../Lib/utils";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);
  useEffect(() => {  // this useEffect when there is any message to auto matically side down the chats 
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }
  console.log(messages.length)

  return (
    <>
    {messages.length==0 ? (<div

     className="flex flex-col flex-1 overflow-auto">
      <ChatHeader/>
      {/* motion for start a conversion  */}
      <motion.div
      className="flex-1 flex flex-col items-center justify-center text-center space-y-4"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Animated Chat Icon */}
        <motion.div
          className="p-4 rounded-full shadow-lg"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        >
          <MessageCircle className="w-10 h-10" />
        </motion.div>

      {/* Animated Text */}
      <motion.p
        className="text-xl font-semibold text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Start a Conversation
      </motion.p>
    </motion.div>

      <MessageInput/>
    </div>)
    :
    (<motion.div
     initial={{ opacity: 0, scale:0.9 }}
     animate={{ opacity: 1, scale: 1 }}
     transition={{ duration: 0.5, ease:"linear"  }}
     className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="md:size-10 size-5 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </motion.div>)}
    
    </>
    
  );
};
export default ChatContainer;