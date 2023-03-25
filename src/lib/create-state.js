//import { GameState } from "../types/game";
//import { Item } from "../types/item";

import { preloadImage,getRandomItem } from "./items";

export default async function createState(deck) {
  //update("harsh");
  //crete();
  const played = [{ ...getRandomItem(deck, []), played: { correct: true } }];
  const next = getRandomItem(deck, played);
  const nextButOne = getRandomItem(deck, [...played, next]);
  const imageCache = [preloadImage(next.image), preloadImage(nextButOne.image)];
  //update();
  return {
    badlyPlaced: null,
    deck,
    imageCache,
    lives: 3,
    next,
    nextButOne,
    played,
  };
}






