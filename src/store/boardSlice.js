import { createSlice } from "@reduxjs/toolkit";
// import { db } from '../firebase-config';
// import { addDoc, collection, getDocs, updateDoc } from "firebase/firestore";

const boardSlice = createSlice({
  name: "boards",
  initialState: {},
  reducers: {
    // createBoard (state, action) {
    //   state.boards = [...state.boards, {...action.payload.board}]
    // },
    setBoards(state, action) {
      state.boards = [...action.payload.boards];
    },
    // updateStateBoard (state, action) {
    //   const allUpdatedBoards = state.boards.map((board) => {
    //     if(board.id === action.payload.boardId)
    //       return {...board, ...action.payload.updateData}
    //     return board;
    //   });
    //   state.boards = [...allUpdatedBoards]
    // },
    // deleteStateBoard (state, action) {
    //   const deleteBoardIndex = state.boards.findIndex((board) => board.id === action.payload.boardId);
    //   const allRemainingBoards = state.boards.slice();
    //   allRemainingBoards.splice( deleteBoardIndex, 1);
    //   state.boards = [...allRemainingBoards]
    // },
    // addStoryInTheBoard (state, action) {
    //   const copyAllBoards = state.boards.slice();
    //   const boardIndex = state.boards.findIndex((board) => board.id === action.payload.boardId);
    //   const copyBoard = state.boards[boardIndex].slice();
    //   copyAllBoards.splice(boardIndex,1);
    //   copyBoard.stories = [...copyBoard.stories, action.payload.story ];
    //   state.boards = [...copyAllBoards, ...copyBoard]
    // },
    // addStoryToBoard(state, action) {
    //   state.boards.stories = [...state.boards.stories,action.payload.story]
    // }
  },
});

export const boardActions = boardSlice.actions;

export default boardSlice;
