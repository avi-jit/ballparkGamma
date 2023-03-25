import React from "react";
import styles from "../styles/score.module.scss";

function Score(props) {
  const { score, title } = props;

  let backgroundColor = "#ffffff";

  if (score >= 20) {
    backgroundColor = "#FFC940";
  } else if (score >= 10) {
    backgroundColor = "#A7B6C2";
  } else if (score >= 1) {
    backgroundColor = "#C99765";
  }

  return (
    <div className={styles.score} style={{ backgroundColor }}>
      <div className={styles.title}>{title}</div>
      <div className={styles.value}>{score}</div>
    </div>
  );
}

export default Score;




