import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import RenderMessage from "../rendermsgs/RenderMessage";

const UserchatsSection = () => {
  const scrollScreenRef = useRef();
  const { selectedChatType, selectedChatData, selectedChatMessages } =
    useSelector((state) => state.chats);

  useEffect(() => {
    if (scrollScreenRef.current) {
      scrollScreenRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  return (
    <section
      className="w-full overflow-y-auto relative flex-1"
      style={{
        scrollbarWidth: 'none', 
        msOverflowStyle: 'none', 
      }}
    >
      <RenderMessage
        scrollScreenRef={scrollScreenRef}
        selectedChatType={selectedChatType}
        selectedChatData={selectedChatData}
        selectedChatMessages={selectedChatMessages}
      />
    </section>
  );
};

export default UserchatsSection;
