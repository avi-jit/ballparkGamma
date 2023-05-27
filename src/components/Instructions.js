import React from "react";

import styles from "../styles/instructions.module.scss";
import Button from "./Button";




export default function Instructions(props) {
  const {  start, typ } = props;
  console.log(typ)
  
  return (
    <div className={styles.instructions}>
      <div  style={{padding: "0 15px",textAlign: "center"}}>
        <div style={{backgroundColor:"white", borderRadius:"15px", textAlign:"left", width:"100%"}}>
          
            <h4 style={{marginTop:"5px", paddingTop:"10px", paddingBottom:"10px", fontWeight:"bold"}}>Place the cards on the numberline in the correct order.</h4>
        </div>
        
        
        
        <Button onClick={start} text={typ} />
        
      </div>
    </div>
  );
}