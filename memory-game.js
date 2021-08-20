"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}


let compareCards = []
/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    var card = document.createElement("div");
    card.className = color
    gameBoard.appendChild(card); 
    
    
    card.addEventListener("click", function(event){
      event.preventDefault()
      flipCard(event.target)
      handleCardClick(event.target)
      console.log(compareCards)
      
      
      if (handleCardClick(event.target) == true){
        event.target.id = "match"
        //event.target.innerText = "match!"
        let matchedCard1 = document.getElementById(compareCards[0])
        matchedCard1.id = "match"
        matchedCard1.style.backgroundColor = color
        //matchedCard1.innerText = "match!"
        //flipCardSimple(matchedCard1)
        compareCards.pop()
        compareCards.pop()
      }
      else{
        unFlipCard(event.target)
      }
      
    })
    
    
    
  }
}


function flipCard(card) {
  if (card.id != "match"){
    card.style.backgroundColor = card.className
    card.id = card.className
    compareCards.push(card.className)
    console.log(compareCards)
  }
}

/** Flip a card face-down. */

function unFlipCard(card) {

  setTimeout(function(){
    if (card.id != "match"){
      card.style.backgroundColor = "white"
    };
    },2000);

  
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(card) {
  if (compareCards.length == 2){
    if (compareCards[0] == compareCards[1]){
      
      return true
    }
    else{
      compareCards.pop()
      compareCards.pop()
      return false
    }
  }
  else{
    return ("click another card")
  }
}

