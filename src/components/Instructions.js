import React from "react";

import styles from "../styles/instructions.module.scss";
import Button from "./Button";
import Score from "./Score";



export default function Instructions(props) {
  const { highscore, start } = props;

  return (
    <div className={styles.instructions}>
      <div className={styles.wrapper}>
        <h2>Place the cards on the numberline in the correct order.</h2>
        
        {highscore !== 0 && (
          <div className={styles.highscoreWrapper}>
            <Score score={highscore} title="Best streak" />
          </div>
        )}
        <Button onClick={start} text="Start game" />
        <div className={styles.about}>
          <div>
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
          <div>
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