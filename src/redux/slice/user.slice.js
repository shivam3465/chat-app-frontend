import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoggedIn: false,
	user: {},
	loading: true,
	notifications: []
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setIsLoggedIn: (state, action) => {
			state.isLoggedIn = action.payload;
		},
		setUser: (state, action) => {
			state.user = action.payload;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setNotifications: (state, action) => {
			state.notifications = action.payload;
		}

	},
});

export const { setIsLoggedIn, setUser, setLoading, setNotifications } = userSlice.actions;

export const userReducer = userSlice.reducer;
