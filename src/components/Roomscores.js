import React, {useEffect,useState} from 'react'
import supabase from "./config/supabaseClient"
import { animated, useSpring } from "react-spring";
import styles from "../styles/game-over.module.scss";
import Score from "./Score";


export default function Roomscores(props) {
    const {createdRoom} = props;
    const animProps = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: { duration: 500 },
      });
    const [scoreDict, setScoreDict] = useState({})
    useEffect(()=>{
        const fetchScores = async()=>{
            const {data,error}=await supabase.from('gameRoom').select('*').eq('id',createdRoom);
            if(data){
                setScoreDict(data[0].scores);
            }
            if(error){
                console.log(error)
            }
        }
        fetchScores();
    })
    
  return (
    <div>
        {
            Object.keys(scoreDict).map((key,index)=>(
                <animated.div style={animProps} className={styles.gameOver}>
                <div className={styles.scoresWrapper}>
                    <div className={styles.score}>
                    <Score score={key} title="Name" />
                    </div>
                    <div className={styles.score}>
                    <Score score={scoreDict[key]} title="Score" />
                    </div>
                </div>
                </animated.div>
            ))
        }
    </div>
  )
}
