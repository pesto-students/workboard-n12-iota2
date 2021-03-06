import { createSlice } from "@reduxjs/toolkit";

const boardSlice = createSlice({
  name: "boards",
  initialState: {
    boards: [],
  },
  reducers: {
    // createBoard (state, action) {
    //   state.boards = [...state.boards, {...action.payload.board}]
    // },
    setAllBoards(state, action) {
      state.boards = [...action.payload.boards];
    },
    setBoard(state, action) {
      const boardIndex = state.boards.findIndex(
        (board) => board.id === action.payload.board.id
      );
      const copyAllBoards = state.boards.slice();
      if (boardIndex !== -1) {
        const copyStories = copyAllBoards[boardIndex].stories;
        copyAllBoards[boardIndex] = action.payload.board;
        copyAllBoards[boardIndex].stories = copyStories;
      } else {
        copyAllBoards.push(action.payload.board);
      }
      state.boards = [...copyAllBoards];
    },
    setStoriesForBoard(state, action) {
      const boardIndex = state.boards.findIndex(
        (board) => board.id === action.payload.boardId
      );
      const copyAllBoards = state.boards.slice();
      copyAllBoards[boardIndex].stories = [...action.payload.stories];
      state.boards = [...copyAllBoards];
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
