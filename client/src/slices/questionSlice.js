import { createSlice } from "@reduxjs/toolkit";

export const questionSlice = createSlice({
  name: "question",
  initialState: {
    value: [],
  },
  reducers: {
    getQuestions: (state) => {
      return state.value;
    },
    setQuestions: (state, action) => {
      state.value = action.payload;
    },
    addQuestion: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { getQuestions, setQuestions, addQuestion } =
  questionSlice.actions;

export default questionSlice.reducer;
