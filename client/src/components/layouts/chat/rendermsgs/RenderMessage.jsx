import moment from "moment";
import { useGetMsgsMutation } from "../../../../redux/endpoints/userauth";
import { useEffect, useMemo } from "react";
import {
  addMessageToSelectedChat,
  clearSelectedChatMessages,
} from "../../../../redux/state/chatState";
import { useDispatch } from "react-redux";
import { CheckImageType } from "../../../../utils/checkimageType";
import { DownLoadIcon, FileIcon } from "../../../../constants";
import { downLoadFile } from "../../../../utils/downLoadFile";

const baseUrl = import.meta.env.VITE_SERVER_URL;

const RenderMessage = ({
  scrollScreenRef,
  selectedChatType,
  selectedChatData,
  selectedChatMessages,
}) => {
  const [getMsgs] = useGetMsgsMutation();

  const dispatch = useDispatch();

  const contactSelcted = useMemo(
    () => ({
      id: selectedChatData._id || "",
      fullname: selectedChatData.fullname || "",
    }),
    []
  );

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (selectedChatType === "contact") {
          const response = await getMsgs({ id: contactSelcted.id }).unwrap();
          if (response.status === "success") {
            dispatch(addMessageToSelectedChat(response.data));
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();
    return () => {
      clearSelectedChatMessages();
    };
  }, [selectedChatType, selectedChatData]);

  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessages.map((message,i) => {
      const messageDate = moment(message.timestamps).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      return (
        <div key={i} >
          {showDate && (
            <div className="text-center text-secondary-300  my-3">
              {moment(message.timestamps).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && renderDMMessages(message)}
        </div>
      );
    });
  };

  const handleDownloadFile = async (fileUrlfromserver) => {
    console.log(
      "🚀 ~ handleDownloadFile ~ fileUrlfromserver:",
      fileUrlfromserver
    );
    await downLoadFile(fileUrlfromserver);
  };

  const renderDMMessages = (message) => {
    const isSender = message.sender === selectedChatData._id;
    return (
      <div
        className={` flex items-center ${
          isSender ? "justify-start" : "justify-end"
        } my-2 `}
      >
        {isSender && (
          <div
            style={{
              backgroundColor: isSender
                ? selectedChatData.avatarColor
                : "#D3D3D3",
              color: "black",
            }}
            className="flex-shrink-0 w-12 h-12 text-xl uppercase font-semibold flex items-center justify-center rounded-full mr-2"
          >
            {contactSelcted.fullname.charAt(0)}
          </div>
        )}
        {message.messageType === "text" && (
          <div
            className={`max-w-[75%] rounded-3xl text-black py-2 px-4 relative ${
              isSender
                ? "bg-customGreen-300 text-black"
                : "bg-secondary-200 text-black"
            }`}
          >
            <span className="block">{message.content}</span>
            <span className="text-xs text-black mt-1 block text-right">
              {moment(message.timestamps).format("LT")}
            </span>
          </div>
        )}
        {message.messageType === "files" && (
          <div
            className={`max-w-[75%] rounded-3xl text-black py-3 px-4 relative ${
              isSender
                ? "bg-customGreen-300 text-black"
                : "bg-secondary-200 text-black"
            }`}
          >
            <span className="block">
              {CheckImageType(message.fileUrl) ? (
                <img
                  className="size-44 rounded-2xl"
                  src={`${baseUrl}/${message.fileUrl}`}
                  alt=""
                />
              ) : (
                <div className="flex-center gap-2">
                  <span className="text-black text-3xl">
                    <FileIcon className="text-black text-3xl" />
                  </span>
                  <span className="text-black text-lg">
                    {message.fileUrl.split("/").pop()}
                  </span>
                  <span className="text-black text-3xl">
                    <DownLoadIcon
                    className="cursor-pointer"
                      onClick={() =>
                        handleDownloadFile(`${baseUrl}/${message.fileUrl}`)
                      }
                    />
                  </span>
                </div>
              )}
            </span>
            <span className="text-xs font-semibold text-black mt-1 block text-right">
              {moment(message.timestamps).format("LT")}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="scrollbar-hidden w-full relative overflow-y-auto md:w-[66vw] lg:w-[70vw] mx-auto text-white p-4">
      {renderMessages()}
      <div ref={scrollScreenRef} />
    </div>
  );
};

export default RenderMessage;
