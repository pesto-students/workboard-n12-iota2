import React, { useEffect } from "react";
import "./App.css";
import RoutesConfig from "./RoutesConfig";
import {
  // useDispatch,
  useSelector,
} from "react-redux";
// import { getBoards } from "./store/boardActions";
// import { db } from './firebase-config';
// import { addDoc, collection, getDocs, updateDoc } from "firebase/firestore";

function App() {
  // const dispatch = useDispatch();
  // const dataCollectionRef = collection(db, "board");
  // useEffect(async () => {
  //   updateDoc
  //   const postData = await addDoc(dataCollectionRef, {
  //     description: "Lorem Ipsum 3",
  //     id: "story3",
  //     name: "third",
  //     owner: "workboard",
  //     status: "qa",
  //     users: ['test5', 'test6']
  //   });
  //   const data = await getDocs(dataCollectionRef);
  //   console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  // }, [])

  useEffect(() => {
    // const unsub = dispatch(getBoards());
  }, []);

  const getStateBoards = useSelector((state) => state.boards.boards);
  return <RoutesConfig>{console.log(getStateBoards)}</RoutesConfig>;
}

export default App;
