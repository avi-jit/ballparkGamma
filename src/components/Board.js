import React, { useState, useMemo, useLayoutEffect } from "react";
import { DragDropContext} from "react-beautiful-dnd";
import useAutoMoveSensor from "../lib/useAutoMoveSensor";
//import { GameState } from "../types/game";
import { checkCorrect, preloadImage, getRandomItem } from "../lib/items";
import NextItemList from "./next-item-list";
import PlayedItemList from "./played-item-list";
import styles from "../styles/board.module.scss";
import Hearts from "./Hearts";
import GameOver from "./Game-over";
import supabase from "./config/supabaseClient";
import LobbyStats from "./LobbyStats";

export default function Board(props) {
  const { highscore, resetGame, state, setState, updateHighscore, createdRoom, name} = props;

  const [isDragging, setIsDragging] = useState(false);
  const [right, setRight] = useState(0);
  
  async function onDragStart() {
    setIsDragging(true);
    navigator.vibrate(20);
  }
  async function setUserScore(dict,createdRoom){
    console.log("working","ye kaam krrha");
    const{data,error} = await supabase.from("gameRoom").update({"scores":dict}).eq("id",createdRoom).select();
      console.log(data,error);
  }
  async function setSupabaseScore(name,score,createdRoom){
    // eslint-disable-next-line
    const{data,error} = await supabase.from("gameRoom").select('*').eq('id',createdRoom);
    console.log(data[0]);
    console.log(data[0].scores);
    const dict = data[0].scores;
    if(!dict){
      var newDict = {};
      newDict[name] = score;
      setUserScore(newDict,createdRoom);
    }
    else{
      dict[name] = score;
      setUserScore(dict,createdRoom);
    }

  }
  async function onDragEnd(result) {
    setIsDragging(false);

    const { source, destination } = result;

    if (
      !destination ||
      state.next === null ||
      (source.droppableId === "next" && destination.droppableId === "next")
    ) {
      return;
    }

    const item = { ...state.next };

    if (source.droppableId === "next" && destination.droppableId === "played") {
      const newDeck = [...state.deck];
      const newPlayed = [...state.played];
      const { correct, delta } = checkCorrect(
        newPlayed,
        item,
        destination.index
      );
      if(correct){
        setRight(setRight+1);
      }
      if(!correct){
        setRight(0);
      }
      console.log(localStorage.getItem('isSoundOn'));
      if(localStorage.getItem('isSoundOn')===null||localStorage.getItem('isSoundOn')==="true"){
        console.log(localStorage.getItem('isSoundOn'))
        if(correct){
          var audio = new Audio("audio/wrong-answer-129254.mp3");
          audio.play();
        }
        if(!correct){
          var audio1 = new Audio("audio/wrong-answer-126515.mp3");
          audio1.play();
        }
      }
      newPlayed.splice(destination.index, 0, {
        ...state.next,
        played: { correct },
      });

      const newNext = state.nextButOne;
      const newNextButOne = getRandomItem(
        newDeck,
        newNext ? [...newPlayed, newNext] : newPlayed
      );
      const newImageCache = [preloadImage(newNextButOne.image)];

      setState({
        ...state,
        deck: newDeck,
        imageCache: newImageCache,
        next: newNext,
        nextButOne: newNextButOne,
        played: newPlayed,
        lives: correct?(right===3?state.lives+1:state.lives):state.lives-1,
        badlyPlaced: correct
          ? null
          : {
              index: destination.index,
              rendered: false,
              delta,
            },
      });
    } else if (
      source.droppableId === "played" &&
      destination.droppableId === "played"
    ) {
      const newPlayed = [...state.played];
      const [item] = newPlayed.splice(source.index, 1);
      newPlayed.splice(destination.index, 0, item);

      setState({
        ...state,
        played: newPlayed,
        badlyPlaced: null,
      });
    }
    if(state.lives===0){
      if(localStorage.getItem('isSoundOn')===null||localStorage.getItem('isSoundOn')==="true"){
        
          console.log("defeat");
          if(score<5){
            var audio2 = new Audio("audio/sfx-defeat6.mp3");
            audio2.play();
          }
          else if(score<10){
            var audio3= new Audio("audio/level-win-6416.mp3");
            audio3.play();
          }
          else if(score>=10){
            var audio4= new Audio("audio/crowd-cheer-ii-6263.mp3");
            audio4.play();
          }
          
        
      }
      if(createdRoom){
        setSupabaseScore(name,score,createdRoom);
      }
    }
  }

  // Ensure that newly placed items are rendered as draggables before trying to
  // move them to the right place if needed.
  useLayoutEffect(() => {
    if (
      state.badlyPlaced &&
      state.badlyPlaced.index !== null &&
      !state.badlyPlaced.rendered
    ) {
      setState({
        ...state,
        badlyPlaced: { ...state.badlyPlaced, rendered: true },
      });
    }
  }, [setState, state]);

  const score = useMemo(() => {
    return state.played.filter((item) => item.played.correct).length - 1;
  }, [state.played]);

  useLayoutEffect(() => {
    if (score > highscore) {
      updateHighscore(score);
    }
  }, [score, highscore, updateHighscore]);
  return (
    <>
    <DragDropContext
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      sensors={[useAutoMoveSensor.bind(null, state)]}
    >
      <div className={styles.wrapper}>
        
        <div id="bottom" className={styles.bottom}>
         
          <PlayedItemList
            badlyPlacedIndex={
              state.badlyPlaced === null ? null : state.badlyPlaced.index
            }
            isDragging={isDragging}
            items={state.played}
          />
        </div>
        <div className={styles.top}>
          <Hearts lives={state.lives} />
          {state.lives > 0 ? (
            <>
              <NextItemList next={state.next} />
              <button className="btn btn-secondary rounded-pill" onClick={()=>{window.location.reload()}}>Reset Cards</button>
            </>
          ) : (
            <>{
              createdRoom?(
                <>
                <LobbyStats
                highscore={highscore}
                resetGame={resetGame}
                score={score}/>
                </>
              ):
              (
                <>
                <GameOver
                highscore={highscore}
                resetGame={resetGame}
                score={score}/>
                </>
              )
            }
            </>
          )}
        </div>
      </div>
    </DragDropContext>
    </>
  );
}