import React from "react";
import ChatheaderSection from "./sections/ChatheaderSection";
import MessagebarSection from "./sections/MessagebarSection";
import UserchatsSection from "./sections/UserchatsSection";
import { useSelector } from "react-redux";
import { ChatIcon } from "../../../constants";
import { Typography } from "@material-tailwind/react";

const ChatContainer = () => {
  const { selectedChatData } = useSelector((state) => state.chats);
  return (
    <>
      {selectedChatData ? (
        <section className="fixed bg-black top-0 h-screen w-full  flex flex-col md:static md:flex-1">
          <ChatheaderSection />
          <UserchatsSection />
          <MessagebarSection />
        </section>
      ) : (
        <div className="flex-center h-screen w-full bg-black gap-3">
          <ChatIcon className="size-14 text-secondary-300" />
          <Typography variant="h2" className="text-secondary-400">
            CHAT-BOX
          </Typography>
        </div>
      )}
    </>
  );
};

export default ChatContainer;


