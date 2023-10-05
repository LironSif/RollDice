// varibale................................


gameOn = true

const newGamePlayer = {
    current:0,
    score:0
}

const players = {
    player1: {
        current:0,
        score:0
    },
    player2: {
        current:0,
        score:0
    },
    activePlayer:1
}

 let target = 0 ;

// selectors................................

let startBtn = document.querySelector ('.start-btn')
let startingDiv = document.querySelector ('.starting')
let targetNum = document.querySelector ('.target-btn')
let intNewGame = document.querySelector ('.new-game')
let rollTheDice = document.querySelector ('.roll-dice')
let changPlayer = document.querySelector ('.hold')
let dice1 = document.querySelector ('.dice-1')
let dice2 = document.querySelector ('.dice-2')
let p1currentScore = document.querySelector ('.p1current')
let p2currentScore = document.querySelector ('.p2current')
let p1TotalScore = document.querySelector ('.p1Total')
let p2TotalScore = document.querySelector ('.p2Total')

// listeners...............................

// ...................Smart Phone Rotate..........................................
function checkOrientation() {
    var messageElement = document.getElementById('rotate-message');
    if (window.matchMedia("(orientation: portrait)").matches && window.matchMedia("(max-width: 48em)").matches) {
        // Portrait orientation and screen width <= 768px
        messageElement.style.display = 'block';
    } else {
        // Landscape orientation or screen width > 768px
        messageElement.style.display = 'none';
    }
}

// Call the function initially
checkOrientation();

// Listen for orientation changes
window.addEventListener('resize', checkOrientation);



// ...................starting..........................................
startBtn.addEventListener("click", function(){  
    target = targetNum.value
    startingDiv.style.display = 'none';
    console.log(target)

});


// ...................intNewGame..........................................
intNewGame.addEventListener("click", function(){  s});



// ...................rollTheDice..........................................
rollTheDice.addEventListener("click", function(){ 

    const [rand1, rand2] = rnNum(); 
    changeImageSrc(rand1, rand2);
    let activePlayer = players[`player${players.activePlayer}`];
    activePlayer.current += rand1 + rand2;

    if( players.activePlayer === 1){
    p1currentScore.innerText = activePlayer.current
    console.log(activePlayer.score)
    if(activePlayer.current + activePlayer.score > target) {
    alert ("You lose bro")
    }
    }else if( players.activePlayer === 2){
    p2currentScore.innerText = activePlayer.current
    if(activePlayer.current + activePlayer.score > target) {
    alert ("You lose bro")
    }
   }
  });


// ...................changPlayer..........................................
changPlayer.addEventListener("click", function(){

    let activePlayer = players[`player${players.activePlayer}`];
    if(players.activePlayer === 1){
        activePlayer.score += activePlayer.current;
        p1TotalScore.innerText = activePlayer.score
        p1currentScore.innerText = 0;
        players.activePlayer = 2
    } else if(players.activePlayer === 2){
        activePlayer.score = activePlayer.current;
        p2TotalScore.innerText = activePlayer.score
        p2currentScore.innerText = 0;
        players.activePlayer = 1
    }
});



// functions...............................


const newGame = () => {}

const activePlayer = () => {}


const rnNum = () => {
    rand1 = Math.ceil(Math.random()*6)
    rand2 = Math.ceil(Math.random()*6)
    return [rand1, rand2];
    }


const changeImageSrc = (rand1, rand2) => {
    const diceNum1 = `/images/dice-${rand1}.png`;
    dice1.setAttribute("src", diceNum1);
    const diceNum2 = `/images/dice-${rand2}.png`;
        dice2.setAttribute("src", diceNum2);
    }

const curruntScore = () => {}

// const activePlayer = () => {}

