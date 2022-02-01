import { db } from '../firebase-config';
import { setDoc, collection, deleteDoc, doc, getDocs, updateDoc, addDoc, query, onSnapshot } from "firebase/firestore";

import { boardActions } from './boardSlice';

const firebaseRootCollectionName = "newSchemaBoards";

//CRUD for boards with real time listening for changes.

export const getBoards = () => dispatch => {
    const dataCollectionBoardsRef = collection(db, firebaseRootCollectionName);
    const unsubscribe = onSnapshot(query(dataCollectionBoardsRef), (querySnapshot) => {
        const source = querySnapshot.metadata.hasPendingWrites ? "Local" : "Server";
        console.log(source);
        const getAllBoards = [];
        querySnapshot.forEach((doc) => {
            getAllBoards.push({ ...doc.data()});
        })
        console.log(getAllBoards);
        dispatch(
            boardActions.setAllBoards({
                boards: [...getAllBoards]
            })
        );
    }, (error) => {
        console.log("Real Time Data Getting has an error.")
    });
    return unsubscribe;
}

export const createBoard = (newBoard) => {
    return async () => {
        const dataCollectionBoardsDocumentBoardRef = doc(db, firebaseRootCollectionName, newBoard.id);
        const postBoard = async () => {
            const response = await setDoc(dataCollectionBoardsDocumentBoardRef, { ...newBoard });
        };

        try {
            await postBoard();
            console.log("success create board");
        }
        catch (error) {
            console.log("try catch create board error");
        }
    }
}

export const updateBoard = (boardId, data) => {
    return async () => {
        const dataBoardRef = doc(db, firebaseRootCollectionName, boardId);
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
            console.log("success update board");
        }
        catch (error) {
            console.log("try catch update board error");
        }
    }
}

export const deleteBoard = (boardId) => {
    return async (dispatch) => {
        const dataBoardRef = doc(db, firebaseRootCollectionName, boardId);
        const deleteData = async () => {
            const response = await deleteDoc(dataBoardRef);
        };
        try {
            await deleteData();
            console.log("success delete");
        }
        catch (error) {
            console.log("try catch delete error");
        }
    }
}

// CUD for stages with real time read at boards level.

export const getBoardStages_Stories = (boardId) => dispatch => {
    const dataDocumentBoardRef = doc(db, firebaseRootCollectionName, boardId);
    const dataCollectionBoardsDocumentBoardCollectionStoriesRef = collection(db, firebaseRootCollectionName, boardId, "stories");
    const unsubscribeBoard = onSnapshot(dataDocumentBoardRef, (doc) => {
        const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        console.log(source);
        const getBoard = doc.data();
        dispatch(
            boardActions.setBoard({
                board: getBoard
            })
        );
    }, (error) => {
        console.log("Real Time Data Getting has an error.")
    });
    const unsubscribeStories = onSnapshot(query(dataCollectionBoardsDocumentBoardCollectionStoriesRef), (querySnapshot) => {
        const source = querySnapshot.metadata.hasPendingWrites ? "Local" : "Server";
        console.log(source);
        const getAllStories = [];
        querySnapshot.forEach((doc) => {
            getAllStories.push({ ...doc.data()});
        })
    }, (error) => {
        console.log("Real Time Data Getting has an error.")
    });

    const returnUnsubscribeRefs = {
        unsubBoard: unsubscribeBoard,
        unsubStories: unsubscribeStories
    };
    
    return returnUnsubscribeRefs;
}
export const createStageInBoard = (updatedStages , key) => {
    return async (dispatch) => {
        console.log(key);
        const dataStoriesBoardRef = doc(db, "boards", key);
        const updateStageInBoard = async () => {
            const response = await updateDoc(dataStoriesBoardRef,
                { stages: [...updatedStages] });

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




























































































///////////////////////     For Future Reference Do not touch



// export const createStageInBoard = (updatedStages , key) => {
//     return async (dispatch) => {
//         console.log(key);
//         const dataStoriesBoardRef = doc(db, "boards", key);
//         const updateStageInBoard = async () => {
//             const response = await updateDoc(dataStoriesBoardRef,
//                 { stages: [...updatedStages] });

//             // if (!response) {
//             //     console.log(response);
//             // }
//         };

//         try {
//             await updateStageInBoard();
//             // dispatch(
//             //     boardActions.updateStateBoard({
//             //         boardId,
//             //         updateData : {...data}
//             //     })
//             // );
//             console.log("success create stage in board");
//         }
//         catch (error) {
//             console.log("try catch create stage in board error");
//         }
//     }
// }