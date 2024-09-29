import React from "react";
import EmptychatSection from "./sections/EmptychatSection";
import ContactListSection from "./sections/ContactListSection";
import ChatContainer from "./ChatContainer";
import { useSelector } from "react-redux";

const MainChatContent = () => {
  const { selectedChatData } = useSelector((state) => state.chats);
  return (
    <main className="w-full h-full flex justify-between">
        <ContactListSection />
      {selectedChatData ? <ChatContainer /> : <EmptychatSection />}
    </main>
  );
};

export default MainChatContent;
