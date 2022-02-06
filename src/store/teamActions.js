import { auth, db } from "../firebase-config";
import {
  setDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  addDoc,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";

import { teamActions } from "./teamSlice";

const firebaseRootCollectionName = "profiles";

export const getTeamMembers = () => (dispatch) => {
  const dataCollectionProfilesRef = collection(db, firebaseRootCollectionName);
  const unsubscribe = onSnapshot(
    query(dataCollectionProfilesRef),
    (querySnapshot) => {
      const getTeamEmails = [];
      querySnapshot.forEach((doc) => {
        getTeamEmails.push(doc.data().email);
      });
      // console.log(getTeamEmails);
      dispatch(
        teamActions.setTeamMmbers({
          members: [...getTeamEmails],
        })
      );
    },
    (error) => {
      console.log("Real Time Data Getting has an error.");
    }
  );
  return unsubscribe;
};
