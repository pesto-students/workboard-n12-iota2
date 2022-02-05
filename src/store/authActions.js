import { db, auth } from '../firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth';
import { authActions } from './authSlice';
import { setDoc, updateDoc, doc, getDoc } from 'firebase/firestore';
import { message } from 'antd';

const firebaseRootCollectionName = "profiles";

//CRUD for profile.

export const signupAction = (email, password) => {
    return async (dispatch) => {
        const createUser = async () => {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            return response;
        };

        try {
            const userCreated = await createUser();
            sendEmailVerification(auth.currentUser).then(() => console.log("mail sent"));
            const dataDocumentProfileRef = doc(db, firebaseRootCollectionName, userCreated.user.uid);
            const profile = {
                id: userCreated.user.uid,
                email: userCreated.user.email,
                displayName: userCreated.user.displayName,
                designation: "",
                organization: "",
                emailVerified: false
            };
            await setDoc(dataDocumentProfileRef, { ...profile }, { merge: true });
            dispatch(
                authActions.signup({
                    ...profile
                })
            );
            console.log("success async create user");
        }
        catch (error) {
            console.log(error);
            console.log("try catch async create user error");
        }
    }
}

export const loginAction = (email, password) => {
    return async (dispatch) => {
        const loginUser = async () => {
            await signInWithEmailAndPassword(auth, email, password);
        };

        try {
            await loginUser();
            console.log("success async login user");
        }
        catch (error) {
            console.log("try catch async login user error");
        }
    }
}

export const logoutAction = () => {
    return async (dispatch) => {
        const logoutUser = async () => {
            const response = await signOut(auth);
        };

        try {
            await logoutUser();
            dispatch(
                authActions.logout()
            );
            console.log("success async login user");
        }
        catch (error) {
            console.log("try catch async login user error");
        }
    }
}

export const forgotPassword = (email) => {
    return async (dispatch) => {
        const forgotPass = async () => {
            await sendPasswordResetEmail(auth, email);
        };

        try {
            await forgotPass();
            console.log("success async forgot pass user");
        }
        catch (error) {
            console.log("try catch async forgot pass user error");
        }
    }
}

export const setProfile = (profile) => {
    return async (dispatch) => {
        const dataDocumentProfileRef = doc(db, firebaseRootCollectionName, profile.id);
        const postProfile = async () => {
            const response = await setDoc(dataDocumentProfileRef, { ...profile }, { merge: true });
        }
        try {
            await postProfile();
            console.log("success create profile");
        }
        catch (error) {
            console.log("try catch create profile error");
        }
    }
}

export const getProfile = (id) => {
    return async (dispatch) => {
        const dataDocumentProfileRef = doc(db, firebaseRootCollectionName, id);
        const getProfile = async () => {
            const response = await getDoc(dataDocumentProfileRef);
            return response;
        }
        try {
            const response = await getProfile();
            if (response.exists()) {
                authActions.signup({
                    ...response.data()
                })
                console.log("success get profile");
                console.log(response.data());
                return response;
            }
            else {
                message.error("User Does not exists")
            }
        }
        catch (error) {
            console.log("try catch get profile error");
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
