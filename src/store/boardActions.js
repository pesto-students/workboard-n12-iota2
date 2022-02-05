import { auth, db } from '../firebase-config';
import { setDoc, collection, deleteDoc, doc, getDocs, updateDoc, addDoc, query, onSnapshot, where } from "firebase/firestore";

import { boardActions } from "./boardSlice";

const firebaseRootCollectionName = "newSchemaBoards";

//CRUD for boards with real time listening for changes.

export const getBoards = () => dispatch => {
    const dataCollectionBoardsRef = collection(db, firebaseRootCollectionName);
    // const userEmail = auth.currentUser.email;
    const unsubscribe = onSnapshot(query(dataCollectionBoardsRef, where("members", "array-contains", "jidacif112@mxclip.com")), (querySnapshot) => {
        // const source = querySnapshot.metadata.hasPendingWrites ? "Local" : "Server";
        // console.log(source);
        const getAllBoards = [];
        querySnapshot.forEach((doc) => {
            getAllBoards.push({ ...doc.data() });
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

export const updateBoard = (board) => {
    return async () => {
        const dataBoardRef = doc(db, firebaseRootCollectionName, board.id);
        const updateData = async () => {
            const response = await updateDoc(dataBoardRef, {
                ...board
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
};

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
        const getAllStoriesOfBoard = [];
        querySnapshot.forEach((doc) => {
            if (Object.entries(doc.data()).length !== 0) {        //this condition checks whether the doc.data() is empty object or not
                getAllStoriesOfBoard.push({ ...doc.data() });
            }
        })
        console.log(getAllStoriesOfBoard);
        dispatch(
            boardActions.setStoriesForBoard({
                boardId: boardId,
                stories: getAllStoriesOfBoard
            })
        );
    }, (error) => {
        console.log("Real Time Data Getting has an error.")
    });

    const returnUnsubscribeRefs = {
        unsubBoard: unsubscribeBoard,
        unsubStories: unsubscribeStories
    };

    return returnUnsubscribeRefs;
}
export const createNewStageInBoard = (boardId, newStages) => {
    return async (dispatch) => {
        const dataStagesBoardRef = doc(db, firebaseRootCollectionName, boardId);
        const updateStagesInBoard = async () => {
            const response = await updateDoc(dataStagesBoardRef,
                { stages: [...newStages] });
        };

        try {
            await updateStagesInBoard();
            console.log("success create stage in board");
        }
        catch (error) {
            console.log("try catch create stage in board error");
        }
    }
}

export const updateStageInBoard = (boardId, newStages) => {
    return async (dispatch) => {
        const dataStagesBoardRef = doc(db, firebaseRootCollectionName, boardId);
        const updateStageInBoard = async () => {
            const response = await updateDoc(dataStagesBoardRef,
                { stages: [...newStages] });
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

export const deleteStageInBoard = (boardId, newStages) => {
    return async (dispatch) => {
        const dataStagesBoardRef = doc(db, firebaseRootCollectionName, boardId);
        const deleteStageInBoard = async () => {
            const response = await updateDoc(dataStagesBoardRef,
                { stages: [...newStages] });
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
export const getStoryInBoard = (boardId, storyId) => dispatch => {
    const dataDocumentStoryRef = doc(db, firebaseRootCollectionName, boardId, "stories", storyId);
    // const dataDescriptionStoryRef = doc(db, firebaseRootCollectionName, boardId, "stories", storyId, "description", descriptionId);

    const unsubscribeStory = onSnapshot(dataDocumentStoryRef, (doc) => {
        const getStory = doc.data();
        console.log(getStory);
        // dispatch(
        //     boardActions.setStory({
        //         story: getStory
        //     })
        // );
    }, (error) => {
        console.log("Real Time Data Getting has an error.")
    });
    // const unsubscribeDescription = onSnapshot(query(dataDescriptionStoryRef), (querySnapshot) => {
    //     const getDescriptionOfStory = "";
    //     querySnapshot.forEach((doc) => {
    //         if (Object.entries(doc.data()).length !== 0) {        //this condition checks whether the doc.data() is empty object or not
    //             getAllStoriesOfBoard.push({ ...doc.data() });
    //         }
    //     })
    //     console.log(getAllStoriesOfBoard);
    //     dispatch(
    //         boardActions.setStoriesForBoard({
    //             boardId: boardId,
    //             stories: getAllStoriesOfBoard
    //         })
    //     );
    // }, (error) => {
    //     console.log("Real Time Data Getting has an error.")
    // });

    // const returnUnsubscribeRefs = {
    //     unsubBoard: unsubscribeBoard,
    //     unsubStories: unsubscribeStories
    // };

    const returnUnsubscribeRefs = {
        unsubStory: unsubscribeStory
    };

    return returnUnsubscribeRefs;
}
export const createStoryInBoard = (boardId, newStory) => {
    return async (dispatch) => {
        const dataStoryBoardRef = doc(db, firebaseRootCollectionName, boardId, 'stories', newStory.id);
        const createStoryInBoard = async () => {
            const response = await setDoc(dataStoryBoardRef,
                { ...newStory });

            console.log(response);
        };
        try {
            await createStoryInBoard();
            console.log("success update board");
        }
        catch (error) {
            console.log("try catch update board error");
            console.log(error);
        }
    }
}

export const updateStoryInBoard = (boardId, updatedStory) => {
    return async (dispatch) => {
        console.log(updatedStory);
        const dataStoryBoardRef = doc(db, firebaseRootCollectionName, boardId, 'stories', updatedStory.id);
        const updateStoryTheBoard = async () => {
            const response = await updateDoc(dataStoryBoardRef,
                { ...updatedStory });
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
            console.log(error);
        }
    }
}

export const deleteStoryFromBoard = (boardId, storyId) => {
    return async (dispatch) => {
        const dataStoryBoardRef = doc(db, firebaseRootCollectionName, boardId, 'stories', storyId);
        const deleteStoryFromTheBoard = async () => {
            const response = await deleteDoc(dataStoryBoardRef);
        };

        try {
            await deleteStoryFromTheBoard();
            console.log("success update board");
        }
        catch (error) {
            console.log("try catch update board error");
        }
    }
};




























































































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
