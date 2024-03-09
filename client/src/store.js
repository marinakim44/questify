import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import questionReducer from "./slices/questionSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    question: questionReducer,
  },
});
