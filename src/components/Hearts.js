import { useSpring, animated } from "react-spring";
import React from "react";
import styles from "../styles/hearts.modules.scss";

function Heart(props) {
  const { have } = props;
  const { opacity } = useSpring({
    opacity: have ? 1 : 0.4,
    config: { duration: 300 },
  });
  const { scale } = useSpring({
    scale: have ? 1 : 0.8,
    config: { mass: 1, tension: 200, friction: 20, duration: 300 },
    delay: 200,
  });

  return (
    <animated.img
      className={styles.heart}
      style={{ opacity, scale, height:"50px", margin: "10px" }}
      src="/images/heart.svg"
    />
  );
}

export default function Hearts(props) {
  const { lives } = props;

  return (
    <div className={styles.hearts} style={{height: "50px",
        margin: "10px"}}>
      <Heart have={lives >= 1} />
      <Heart have={lives >= 2} />
      <Heart have={lives >= 3} />
    </div>
  );
}
