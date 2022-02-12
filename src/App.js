/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./App.css";
import RoutesConfig from "./RoutesConfig";

function App() {
  // useEffect(() => {
  //   const unsub = dispatch(getBoards());      //execute unsub to disconnect from firebase live updates
  // }, []);

  return <RoutesConfig></RoutesConfig>;
}

export default App;
