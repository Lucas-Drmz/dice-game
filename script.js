//Get DOM button elements to interact with them
const newGameButton = document.querySelector('#newGame')
const rollDiceButton = document.querySelector('#rollDiceButton')
const holdButton = document.querySelector('#hold')

//Creates audio elements
const newGameSound = new Audio('./Audio/star-wars-theme-song.mp3')
const player1VictorySound = new Audio('./Audio/force.mp3')
const player2VictorySound = new Audio('./Audio/vader-breathing.mp3')
  
//To manage players turns
let p1Turn = true

class Player {
  constructor(name, globalScore = 0, roundScore = 0) {
    this.name = name,
    this.globalScore = globalScore,
    this.roundScore = roundScore
  }
}

function newGame() {
  //Get DOM elements that will need updating
  const p1Name = document.querySelector('#p1Name')
  const p2Name = document.querySelector('#p2Name')
  const p1GlobalScore = document.querySelector('#p1GlobalScore')
  const p2GlobalScore = document.querySelector('#p2GlobalScore')
  const p1RoundScore = document.querySelector('#p1RoundScore')
  const p2RoundScore = document.querySelector('#p2RoundScore')
  const playerTurn = document.querySelector('#playerTurn')

  //Get players names
  const getP1Name = prompt('Joueur 1, quel est ton nom ?')
  const getP2Name = prompt('Joueur 2, quel est ton nom ?')

  //Create players
  const player1 = new Player(getP1Name)
  const player2 = new Player(getP2Name)
  
  //Update DOM elements with players data
  p1Name.innerHTML = player1.name
  p2Name.innerHTML = player2.name
  p1GlobalScore.innerHTML = player1.globalScore
  p2GlobalScore.innerHTML = player2.globalScore
  p1RoundScore.innerHTML = player1.roundScore
  p2RoundScore.innerHTML = player2.roundScore

  //plays game theme as the new game starts
  newGameSound.play()

  //randomly pick who will play first
  function whoPlaysFirst() {
    //generate random number between 1 and 2
    const random = Math.ceil(Math.random()*2)
    if(random === 2) {
      p1Turn = false
      playerTurn.innerHTML = `${player2.name}, à toi de jouer !`
    } else {
    playerTurn.innerHTML = `${player1.name}, à toi de jouer !`
    return p1Turn
    }
  }

  whoPlaysFirst()

  function rollDice() {
    const dice = document.querySelector('#dice')
    const diceFace = dice.querySelector('#face')
    
    //generate random number between 1 and 6
    const random = Math.ceil(Math.random() * 6)
    
    //update the html to diplay the result on the dice
    switch(random) {
      case 1 :
        diceFace.innerHTML = `
        <span class="dot"></span>`
        break
      case 2 :
        diceFace.innerHTML = `
        <span class="dot"></span>
        <span class="dot"></span>
        `
        break
      case 3 :
        diceFace.innerHTML = `
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        `
        break
      case 4 :
        diceFace.innerHTML = `
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        `
        break
      case 5 :
        diceFace.innerHTML = `
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        `
        break
      case 6 :
        diceFace.innerHTML = `
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        `
        break
    }

    //Update round scores with the result of the dice
    if(p1Turn) {
      if(random === 1) {
        player1.roundScore = 0
        p1Turn = false
        playerTurn.innerHTML = `${player2.name}, à toi de jouer !`
      } else {
        player1.roundScore += random
      }
      p1RoundScore.innerHTML = player1.roundScore
    } else {
        if(random === 1) {
          player2.roundScore = 0
          p1Turn = true
          playerTurn.innerHTML = `${player1.name}, à toi de jouer !`
        } else {
          player2.roundScore += random
        }
        p2RoundScore.innerHTML = player2.roundScore
    }
  }

  function holdScore() {
    if(p1Turn) {
      //update player1 score and corresponding DOM elements
      player1.globalScore += player1.roundScore
      player1.roundScore = 0
      p1GlobalScore.innerHTML = player1.globalScore
      p1RoundScore.innerHTML = player1.roundScore

      //check if player has won
      if(player1.globalScore >= 100) {
        //plays player 1 victory sound
        player1VictorySound.play()
        alert(`${player1.name} a gagné !`)
        //disables buttons as the game is over
        rollDiceButton.disabled = true
        holdButton.disabled = true
      } 
      
      p1Turn = false
      playerTurn.innerHTML = `${player2.name}, à toi de jouer !`
    } else {
        //update player1 score and corresponding DOM elements
        player2.globalScore += player2.roundScore
        player2.roundScore = 0
        p2GlobalScore.innerHTML = player2.globalScore
        p2RoundScore.innerHTML = player2.roundScore

        //check if player has won
        if(player2.globalScore >= 100) {
          //plays player 2 victory sound
          player2VictorySound.play()
          alert(`${player2.name} a gagné !`)
          //disables buttons as the game is over
          rollDiceButton.disabled = true
          holdButton.disabled = true
        } 
        
        p1Turn = true
        playerTurn.innerHTML = `${player1.name}, à toi de jouer !`
    }
  }

  rollDiceButton.addEventListener('click', rollDice)
  holdButton.addEventListener('click', holdScore)

}

newGameButton.addEventListener('click', newGame)