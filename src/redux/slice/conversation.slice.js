import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	conversation: null,
	showModal: false,
	selectedConversation: null,
	isTabActive: false,
};

const conversationSlice = createSlice({
	name: "conversation",
	initialState,
	reducers: {
		setConversation: (state, action) => {
			state.conversation = action.payload;
		},
		setShowModal: (state, action) => {
			state.showModal = action.payload;
		},
		setSelectedConversation: (state, action) => {
			state.selectedConversation = action.payload;
		},
		setTabActive: (state, action) => {
			state.isTabActive = action.payload;
		},
	},
});

export const {
	setConversation,
	setShowModal,
	setSelectedConversation,
	setTabActive,
} = conversationSlice.actions;

export const conversationReducer = conversationSlice.reducer;
