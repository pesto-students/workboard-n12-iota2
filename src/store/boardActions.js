import { db } from '../firebase-config';
import { setDoc, collection, deleteDoc, doc, getDocs, updateDoc, addDoc, query, onSnapshot } from "firebase/firestore";

import { boardActions } from './boardSlice';

//CUD for stories with real time read at boards level.
export const createStoryInBoard = (story, boardInfo = {
    id: "NloePyCF1BViiCqr6Gap",
    stories: [{
        name: "Story *",
        desc: "Description *",
        stageId: "0"
    }]
}) => {
    return async (dispatch) => {
        const dataStoriesBoardRef = doc(db, "boards", boardInfo.id);
        const updateStoryInBoard = async () => {
            const response = await updateDoc(dataStoriesBoardRef,
                { stories: [...boardInfo.stories, story] });

            // if (!response) {
            //     console.log(response);
            // }
        };

        try {
            await updateStoryInBoard();
            // dispatch(
            //     boardActions.updateStateBoard({
            //         boardId,
            //         updateData : {...data}
            //     })
            // );
            console.log("success update board");
        }
        catch (error) {
            console.log("try catch update board error");
        }
    }
}

export const updateStoryInBoard = (boardInfo = {
    id: "NloePyCF1BViiCqr6Gap",
    stories: [{
        name: "Story *",
        desc: "Description *",
        stageId: "0"
    },
    {
        name: "Story 0",
        desc: "Description 0",
        stageId: "0"
    }]
}, data = {
    storyIndex: 1,
    updatedStory: {
        name: "Story $",
        desc: "Description $",
        stageId: "3"
    }
}) => {
    return async (dispatch) => {
        const dataStoriesBoardRef = doc(db, "boards", boardInfo.id);
        const updateStoryTheBoard = async () => {
            boardInfo.stories[data.storyIndex] = { ...boardInfo.stories[data.storyIndex], ...data.updatedStory }
            const response = await updateDoc(dataStoriesBoardRef,
                { stories: [...boardInfo.stories] });

            // if (!response) {
            //     console.log(response);
            // }
        };

        try {
            await updateStoryTheBoard();
            // dispatch(
            //     boardActions.updateStateBoard({
            //         boardId,
            //         updateData : {...data}
            //     })
            // );
            console.log("success update board");
        }
        catch (error) {
            console.log("try catch update board error");
        }
    }
}

export const deleteStoryFromBoard = (boardInfo = {
    id: "NloePyCF1BViiCqr6Gap",
    stories: [{
        name: "Story *",
        desc: "Description *",
        stageId: "0"
    },
    {
        name: "Story 0",
        desc: "Description 0",
        stageId: "0"
    }]
}, data = {
    storyIndex: 1
}) => {
    return async (dispatch) => {
        const dataStoriesBoardRef = doc(db, "boards", boardInfo.id);
        const deleteStoryFromTheBoard = async () => {
            boardInfo.stories.splice(data.storyIndex, 1);
            const response = await updateDoc(dataStoriesBoardRef,
                { stories: [...boardInfo.stories] });

            // if (!response) {
            //     console.log(response);
            // }
        };

        try {
            await deleteStoryFromTheBoard();
            // dispatch(
            //     boardActions.updateStateBoard({
            //         boardId,
            //         updateData : {...data}
            //     })
            // );
            console.log("success update board");
        }
        catch (error) {
            console.log("try catch update board error");
        }
    }
}

//CRUD for boards with real time listening for changes.
export const createBoard = (newBoard = {
    members: ['slave *', 'servent *'],
    name: "Board *",
    owner: "master *"
}) => {
    return async (dispatch) => {
        const dataCollectionBoardRef = collection(db, 'boards');
        const postBoard = async () => {
            const response = await addDoc(dataCollectionBoardRef, { ...newBoard });

            if (!response) {
                console.log("create board error");
            }
        };

        try {
            // dispatch(
            //     boardActions.createBoard({
            //         board: { ...newBoard }
            //     })
            // );
            await postBoard();
            console.log("success post board");
        }
        catch (error) {
            console.log("try catch create board error");
        }
    }
}

export const getBoards = () => dispatch => {
    const dataCollectionBoardRef = collection(db, "boards");
    const unsubscribe = onSnapshot(query(dataCollectionBoardRef), (querySnapshot) => {
        const source = querySnapshot.metadata.hasPendingWrites ? "Local" : "Server";
        console.log(source);
        const getAllBoards = [];
        querySnapshot.forEach((doc) => {
            getAllBoards.push({ ...doc.data(), id: doc.id });
        })
        dispatch(
            boardActions.setBoards({
                boards: [...getAllBoards]
            })
        );
    }, (error) => {
        console.log("Real Time Data Getting has an error.")
    });
    return unsubscribe;
}

export const updateBoard = (boardId, data) => {
    return async (dispatch) => {
        const dataBoardRef = doc(db, "boards", boardId);
        const updateData = async () => {
            const response = await updateDoc(dataBoardRef, {
                ...data
            });

            if (!response) {
                console.log("update board error");
            }
        };

        try {
            await updateData();
            // dispatch(
            //     boardActions.updateStateBoard({
            //         boardId,
            //         updateData : {...data}
            //     })
            // );
            console.log("success update board");
        }
        catch (error) {
            console.log("try catch update board error");
        }
    }
}

export const deleteBoard = (boardId) => {
    return async (dispatch) => {
        const dataBoardRef = doc(db, "boards", boardId);
        const deleteData = async () => {
            const response = await deleteDoc(dataBoardRef);
            if (!response) {
                console.log("delete error");
            }
        };

        try {
            await deleteData();
            // dispatch(
            //     boardActions.deleteStateBoard({
            //         boardId
            //     })
            // );
            console.log("success delete");
        }
        catch (error) {
            console.log("try catch delete error");
        }
    }
}

// CUD for stages with real time read at boards level.
export const createStageInBoard = (data, boardInfo = {
    id: "NloePyCF1BViiCqr6Gap",
    stages: [
        { name: "To Do", id: "0" },
        { name: "In Progress", id: "1" },
        { name: "QA", id: "2" },
        { name: "ITG", id: "3" },
        { name: "Prod", id: "4" }
    ]
}) => {
    return async (dispatch) => {
        const dataStoriesBoardRef = doc(db, "boards", boardInfo.id);
        const updateStageInBoard = async () => {
            const response = await updateDoc(dataStoriesBoardRef,
                { stages: [...boardInfo.stages, data] });

            // if (!response) {
            //     console.log(response);
            // }
        };

        try {
            await updateStageInBoard();
            // dispatch(
            //     boardActions.updateStateBoard({
            //         boardId,
            //         updateData : {...data}
            //     })
            // );
            console.log("success create stage in board");
        }
        catch (error) {
            console.log("try catch create stage in board error");
        }
    }
}

export const updateStageInBoard = (boardInfo = {
    id: "NloePyCF1BViiCqr6Gap",
    stages: [
        { name: "To Do", id: "0" },
        { name: "In Progress", id: "1" },
        { name: "QA", id: "2" },
        { name: "ITG", id: "3" },
        { name: "Prod", id: "4" }
    ]
}, data = {
    updateStage: {
        name: "To Do *",
        id: "0 *"
    }
}) => {
    return async (dispatch) => {
        const dataStoriesBoardRef = doc(db, "boards", boardInfo.id);
        const updateStageInBoard = async () => {
            const updateStageIndex = boardInfo.stages.findIndex((stage) => stage.id === data.updateStage.id);
            boardInfo.stages[updateStageIndex] = data.updateStage;
            const response = await updateDoc(dataStoriesBoardRef,
                { stages: [...boardInfo.stages] });

            // if (!response) {
            //     console.log(response);
            // }
        };

        try {
            await updateStageInBoard();
            // dispatch(
            //     boardActions.updateStateBoard({
            //         boardId,
            //         updateData : {...data}
            //     })
            // );
            console.log("success update stage in board");
        }
        catch (error) {
            console.log("try catch update stage in board error");
        }
    }
}

export const deleteStageInBoard = (boardInfo = {
    id: "NloePyCF1BViiCqr6Gap",
    stages: [
        { name: "To Do", id: "0" },
        { name: "In Progress", id: "1" },
        { name: "QA", id: "2" },
        { name: "ITG", id: "3" },
        { name: "Prod", id: "4" }
    ]
}, data = {
    deleteStageId: "0"
}) => {
    return async (dispatch) => {
        const dataStoriesBoardRef = doc(db, "boards", boardInfo.id);
        const deleteStageInBoard = async () => {
            const deleteStageIndex = boardInfo.stages.findIndex((stage) => stage.id === data.deleteStageId);
            boardInfo.stages.splice(deleteStageIndex, 1);
            const response = await updateDoc(dataStoriesBoardRef,
                { stages: [...boardInfo.stages] });

            // if (!response) {
            //     console.log(response);
            // }
        };

        try {
            await deleteStageInBoard();
            // dispatch(
            //     boardActions.updateStateBoard({
            //         boardId,
            //         updateData : {...data}
            //     })
            // );
            console.log("success delete stage in board");
        }
        catch (error) {
            console.log("try catch delete stage in board error");
        }
    }
}