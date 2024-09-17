import { useState } from "react";
import { Box } from "@mui/material";
import "./App.css";
import Home from "./Home/Home";

function App() {
  const [count, setCount] = useState(0);

  return <Home />;
}

export default App;
