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
        lives: correct ? state.lives : state.lives - 1,
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
  );
}