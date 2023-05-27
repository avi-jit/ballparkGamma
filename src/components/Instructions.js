import React from "react";

import styles from "../styles/instructions.module.scss";
import Button from "./Button";




export default function Instructions(props) {
  const { highscore, start, typ } = props;
  console.log(typ)
  
  return (
    <div className={styles.instructions}>
      <div className={styles.wrapper}>
        <div style={{backgroundColor:"white", borderRadius:"15px", textAlign:"left", width:"100%"}}>
          
            <h4 style={{marginTop:"5px", paddingTop:"10px", paddingBottom:"10px", fontWeight:"bold"}}>Place the cards on the numberline in the correct order.</h4>
        </div>
        
        
        {highscore !== 0 && (
          <div className={styles.highscoreWrapper}>
            
          </div>
        )}
        <Button onClick={start} text={typ} />
        <div className={styles.about}>
          <div style={{display:"none"}}>
            All data sourced from{" "}
            <a
              href="https://www.wikidata.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wikidata
            </a>{" "}
            and{" "}
            <a
              href="https://www.wikipedia.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wikipedia
            </a>
            .
          </div>
          <div style={{display:"none"}}>
            Have feedback? Please report it on{" "}
            <a
              href="https://github.com/harsh1245-bit/numeracy-facts/issues/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            .
          </div>
          
        </div>
      </div>
    </div>
  );
}