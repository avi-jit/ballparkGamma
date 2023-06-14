//import { Item, PlayedItem } from "../types/item";
import { createWikimediaImage } from "./image";

export function getRandomItem(deck, played) {
  
  //const periods = [[-100000, 1000],[1000, 1800],[1800, 2020], ];
  //const [fromanswer, toanswer] =periods[Math.floor(Math.random() * periods.length)];
  //const avoidPeople = Math.random() > 0.5;
  const Item ={
    created_at: null,
    suffix: null,
    id: 0,
    country:"Game ended",
    question: "No more questions",
    year: "this filter, Please refresh",
    code:"none",
    url: null,
    answer: "bye",
  }
  
  console.log(deck,"deck");
  const candidates = deck.filter((candidate) => {
    if (tooClose(candidate, played)) {
      return false;
    }
    return true;
  });

  

  if (candidates.length > 0) {
    const quest = candidates[Math.floor(Math.random() * candidates.length)] 
    console.log("ye chala")
    return quest;
  }
  //const quest = deck[Math.floor(Math.random() * deck.length)];
  console.log("ye wala chala");
  //updateQuestion("harsh");
  return Item;
}

function tooClose(item, played) {

  return played.some((p) => item.id===p.id);
}

export function checkCorrect(played, item, index) {
  
  const sorted = [...played, item].sort((a, b) => a.answer - b.answer);
  console.log("sorted", sorted);
  const correctIndex = sorted.findIndex((i) => {
    
    return i.id === item.id;
  });
  /*console.log(index,correctIndex);
  if(index===correctIndex){
    return{ correct: true, delta:0};
  }
  console.log("played",played);
  if(correctIndex!==0){
    if(item.answer===played[index].answer){
      return{ correct: true, delta:0};
    }
  }*/
  //console.log("core",played[correctIndex-1]);
  //console.log(played);
  if (index !== correctIndex) {
    if(index!==sorted.length-1 && played[index].answer===item.answer){
      return { correct: true, delta: 0 ,correctness: 1};
    }
    if(index===0){
        return { correct: false, delta: correctIndex - index ,correctness: (item.answer-0)/item.answer};
    }
    if(played[index-1].answer<=item.answer){
        
        //console.log(item.answer,played[index-1].answer);
        return { correct: false, delta: correctIndex - index ,correctness: 1-((item.answer-played[index-1].answer)/item.answer)};
    }
    if(played[index-1].answer>item.answer){
        //console.log(item.answer,played[index-1].answer);
        return { correct: false, delta: correctIndex - index ,correctness: 1-((played[index-1].answer-item.answer)/played[index-1].answer)};
    }
    
  }

  return { correct: true, delta: 0 ,correctness: 1};
}

export function preloadImage(url) {
  const img = new Image();
  img.src = createWikimediaImage(url);
  return img;
}
