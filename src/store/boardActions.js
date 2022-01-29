import { db } from '../firebase-config';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";

import { boardActions } from './boardSlice';

export const addStoryToBoard = () => {
    return async (dispatch) => {
        const dataCollectionRef = collection(db, "board");
        const postData = async () => {
            const response = await addDoc(dataCollectionRef, {
                description: "Lorem Ipsum 3",
                name: "third",
                owner: "workboard",
                status: "qa",
                users: ['test5', 'test6']
            });

            if(!response) {
                console.log("create error");
            }
        };

        try {
            await postData();
            console.log("success post");
        }
        catch (error) {
            console.log("try catch create error");
        }
    }
}

export const getStoriesForBoard = () => {
    return async (dispatch) => {
        const dataCollectionRef = collection(db, "board");
        const getData = async () => {
            const response = await getDocs(dataCollectionRef);

            if(!response) {
                console.log("read error");
            }

            const data = await response.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            return data;
        };

        try {
            const storiesData =  await getData();
            console.log(storiesData);
            dispatch(
                boardActions.replaceStories({
                    stories: [...storiesData]
                })
            );
        }
        catch (error) {
            console.log("try catch read error");
        }
    }
}

export const updateStoryInBoard = (key, data, updateData) => {
    return async (dispatch) => {
        const dataDocRef = doc(db, "board", key);
        const updateData = async () => {
            const response = await updateDoc(dataDocRef, {
                ...data,
                ...updateData
            });

            if(!response) {
                console.log("update error");
            }
        };

        try {
            await updateData();
            console.log("success update");
        }
        catch (error) {
            console.log("try catch update error");
        }
    }
}

export const deleteStoryFromBoard = (key="WvHhaVyyONJubId87mBQ") => {
    return async (dispatch) => {
        const dataDocRef = doc(db, "board", key);
        const deleteData = async () => {
            const response = await deleteDoc(dataDocRef);
            if(!response) {
                console.log("delete error");
            }
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