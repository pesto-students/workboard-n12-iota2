import { createSlice } from '@reduxjs/toolkit';
import { db } from '../firebase-config';
import { addDoc, collection, getDocs, updateDoc } from "firebase/firestore";

const boardSlice = createSlice({
  name: 'board',
  initialState: {
    boards: {
      name: "test-board",
      stories: [
      ]
    }
  },
  reducers: {
    replaceStories (state, action) {
      state.boards.stories = [...action.payload.stories]
    },
    addItemToBoard(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    }
  },
});

export const boardActions = boardSlice.actions;

export default boardSlice;