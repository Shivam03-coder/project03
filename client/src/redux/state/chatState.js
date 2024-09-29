import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessages: [],
};

export const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setSelectedChatData: (state, action) => {
      state.selectedChatData = action.payload;
    },
    closeSelectedChat: (state) => {
      state.selectedChatData = null;
      state.selectedChatType = undefined;
      state.selectedChatMessages = [];
    },
    setSelectedChatType: (state, action) => {
      state.selectedChatType = action.payload;
    },
    setSelectedChatMessages: (state, action) => {
        const msg = action.payload;
        const receiverId =
          state.selectedChatType === "channels" ? msg.receiver : msg.receiver._id;
        const senderId =
          state.selectedChatType === "channels" ? msg.sender : msg.sender._id;
        state.selectedChatMessages.push({
          ...msg,
          receiver: receiverId,
          sender: senderId,
        });
      },
    addMessageToSelectedChat: (state, action) => {
      const messages = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];

      state.selectedChatMessages.push(...messages);
    },
    clearSelectedChatMessages: (state) => {
      state.selectedChatMessages = [];
    },
  },
});

export const {
  setSelectedChatData,
  setSelectedChatType,
  closeSelectedChat,
  setSelectedChatMessages,
  addMessageToSelectedChat,
  clearSelectedChatMessages,
} = chatSlice.actions;

export default chatSlice.reducer;
