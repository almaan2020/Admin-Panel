import { createSlice } from "@reduxjs/toolkit";

const initialState = { text: '' };

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (message, action) => {
      message.text = action.payload;
    },
    clearMessage: (message) => {
      message.text = ''
    },
  },
});

export const { setMessage, clearMessage } = messageSlice.actions;
export default messageSlice.reducer;