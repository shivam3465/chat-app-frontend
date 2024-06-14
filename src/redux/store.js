import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slice/user.slice";
import { conversationReducer } from "./slice/conversation.slice";
import { messagesReducer } from "./slice/message.slice";


const store =configureStore({
    reducer: {        
        user: userReducer,
        conversation: conversationReducer,
        messages: messagesReducer
    }
})
export default store;