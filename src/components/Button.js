import React from "react";

import styles from "../styles/button.module.scss";


export default function Button(props) {
  const { minimal = false, onClick, text } = props;

  return (
    <button
      onClick={onClick}
      className= {`${styles.button} ${minimal ? styles.minimal : ''}`}
    >
      {text}
    </button>
  );
}