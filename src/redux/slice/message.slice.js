import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	// this will be a map which will store conversation id as key and value will be messages of that conversation
	messageObj: {},
	messageLoading: false,
};

const messagesSlice = createSlice({
	name: "messageBox",
	initialState,
	reducers: {
		setMessageObj: (state, action) => {
			state.messageObj = action.payload;
		},
		setMessageLoading: (state, action) => {
			state.messageLoading = action.payload;
		},
	},
});

export const { setMessageObj, setMessageLoading } = messagesSlice.actions;

export const messagesReducer = messagesSlice.reducer;
