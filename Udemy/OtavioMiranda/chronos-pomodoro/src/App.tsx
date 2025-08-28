
import "./styles/theme.css";
import "./styles/global.css";
import { Home } from "./pages/Home";
import { useState } from "react";

export default function App(){
  const [state, setState ] = useState(0);

  return <Home />;
}