import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBoards } from "./store/boardActions";
import "./App.css";
import RoutesConfig from "./RoutesConfig";

function App() {
  const dispatch = useDispatch();
  
  // useEffect(() => {
  //   const unsub = dispatch(getBoards());      //execute unsub to disconnect from firebase live updates
  // }, []);
  
  return <RoutesConfig></RoutesConfig>;
}

export default App;
