"use client"

import { useState } from "react";
import "./page.css";

export default function Home(){
  const [is, setIs] = useState(false);
  return (
    <div className="Container">
      <h2>A muié mais linda do mundo:</h2>
      
    { !is && <>
      <button onClick={() => setIs(!is)}>Cliqe AQUI descobrir</button>
    </>}
      {is && (<><h1>Caroline Limoni </h1>
      <h4>❤️</h4></>)}
      
    </div>
  )
}