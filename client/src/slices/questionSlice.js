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
    updateQuestion: (state, action) => {
      const index = state.value.findIndex(
        (question) => question._id === action.payload._id
      );
      state.value[index] = action.payload;
    },
  },
});

export const { getQuestions, setQuestions, addQuestion, updateQuestion } =
  questionSlice.actions;

export default questionSlice.reducer;
