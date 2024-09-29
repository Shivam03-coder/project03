import React, { memo, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addMessageToSelectedChat,
  setSelectedChatData,
  setSelectedChatType,
  clearSelectedChatMessages,
} from "../../../../redux/state/chatState";
import { useGetMsgsMutation } from "../../../../redux/endpoints/userauth";

const LastmsgContactSection = ({ contactList, selectedChatData }) => {
  const dispatch = useDispatch();
  const [getMsgs] = useGetMsgsMutation();
  const [activeContactId, setActiveContactId] = useState(null); // Track the active contact

  const handleSelectedUser = useCallback(
    async (contact) => {
      if (contact) {
        try {
          dispatch(clearSelectedChatMessages());
          dispatch(setSelectedChatData(contact));
          dispatch(setSelectedChatType("contact"));
          setActiveContactId(contact._id);

          const response = await getMsgs({ id: contact._id }).unwrap();
          if (response.status === "success") {
            dispatch(addMessageToSelectedChat(response.data));
          }
        } catch (error) {
          console.log("Error fetching messages: ", error);
        }
      }
    },
    [dispatch, getMsgs]
  );

  const isActive = (contact) => contact._id === activeContactId;

  return (
    <section className="flex py-6 flex-col px-9 space-y-4 overflow-y-auto max-h-[500px] scrollbar-hide">
      {contactList?.map((contact,i) => (
        <div
          onClick={() => handleSelectedUser(contact)}
          key={i}
          className={`flex cursor-pointer items-center ${
            isActive(contact) ? "bg-secondary-400" : ""
          } p-2 rounded-2xl transition-all gap-3`}
        >
          <div
            style={{ backgroundColor: contact.avatarColor }}
            className="flex-shrink-0 w-12 h-12 text-xl text-black uppercase font-semibold flex items-center justify-center rounded-full mr-2"
          >
            {contact.fullname.charAt(0)}
          </div>
          <span className="font-semibold uppercase font-Inter">
            {contact.fullname}
          </span>
        </div>
      ))}
    </section>
  );
};

export default memo(LastmsgContactSection);
