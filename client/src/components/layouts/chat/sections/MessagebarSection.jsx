import { Button } from "@material-tailwind/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  AttachmentIcon,
  EmojiPickerIcon,
  SendMsgIcon,
} from "../../../../constants";
import EmojiPicker from "emoji-picker-react";
import { useSelector } from "react-redux";
import { useUploadFileMutation } from "../../../../redux/endpoints/userauth";

const MessagebarSection = () => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { selectedChatType, selectedChatData } = useSelector(
    (state) => state.chats
  );
  const { socket } = useSelector((state) => state.socket);
  const userInfo = useSelector((state) => state.userinfo.userdata);
  const emojiref = useRef();
  const fileRef = useRef();
  const [uploadFile] = useUploadFileMutation();

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleEmojiPicker = useCallback((emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  }, []);

  const handleSendMessage = () => {
    if (selectedChatType === "contact") {
      socket.emit("sendMessage", {
        sender: userInfo._id,
        receiver: selectedChatData._id,
        content: message,
        messageType: "text",
        fileUrl: undefined,
      });
    }
    setMessage("");
  };

  const toggleEmojiPicker = useCallback(() => {
    setShowEmojiPicker((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (emojiref.current && !emojiref.current.contains(e.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleinputfile = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleAttachedfile = async (e) => {
    try {
      const selectedFile = e.target.files[0];
      if (!selectedFile) {
        console.error("No file selected");
        return;
      }
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await uploadFile(formData).unwrap();

      if (response.status === "success" && response.filepath !== "") {
        if (selectedChatType === "contact") {
          socket.emit("sendMessage", {
            sender: userInfo._id,
            receiver: selectedChatData._id,
            content: undefined,
            messageType: "files",
            fileUrl: response.filepath,
          });
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
<section className="h-[14vh] flex items-center justify-center text-white pr-3 py-3 md:py-0">
  <div className="flex-1 flex items-center px-4 py-2 mb-y md:mb-0 rounded-2xl bg-primary-800 mx-2 sm:mx-4">
    <AttachmentIcon
      onClick={handleinputfile}
      className="size-6 sm:size-8 text-customOrange-500"
    />
    <input
      onChange={handleAttachedfile}
      ref={fileRef}
      className="hidden"
      type="file"
    />
    <input
      placeholder="Enter your message..."
      className="flex-1 outline-none p-2 sm:p-4 bg-transparent font-Inter text-sm sm:text-lg"
      value={message}
      onChange={handleChange}
    />
    <div className="relative">
      <EmojiPickerIcon
        onClick={toggleEmojiPicker}
        className="size-6 sm:size-8 text-customYellow-300 cursor-pointer"
      />
      {showEmojiPicker && (
        <div ref={emojiref} className="absolute bottom-20 right-0">
          <EmojiPicker
            className="!scrollbar-hidden"
            onEmojiClick={handleEmojiPicker}
            theme="dark"
            autoFocusSearch={false}
          />
        </div>
      )}
    </div>
  </div>
  <Button onClick={handleSendMessage} className="px-2 sm:px-3 flex items-center justify-center">
    <SendMsgIcon className="size-6 sm:size-8 text-secondary-300" />
  </Button>
</section>

  );
};

export default MessagebarSection;
