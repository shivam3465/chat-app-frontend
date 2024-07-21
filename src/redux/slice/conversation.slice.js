import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	conversations: null,
	showModal: false,
	selectedConversation: null,
	isTabActive: false,
	isConversationLoading: false,
};

const conversationSlice = createSlice({
	name: "conversation",
	initialState,
	reducers: {
		setConversations: (state, action) => {
			state.conversations = action.payload;
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
		setConversationLoading: (state, action) => {
			state.isConversationLoading = action.payload;
		},
	},
});

export const {
	setConversations,
	setShowModal,
	setSelectedConversation,
	setTabActive,
	setConversationLoading,
} = conversationSlice.actions;

export const conversationReducer = conversationSlice.reducer;
