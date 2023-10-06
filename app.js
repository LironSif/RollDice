// varibale................................


gameOn = true

const newGamePlayer = {
    current:0,
    score:0
}
// check with harosh and hadash conflict
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
let player1Div = document.querySelector('.player-1');
let player2Div = document.querySelector('.player-2');


// listeners...............................................................................


// ...................Smart-Phone-Rotate....................EventListener..................
function checkOrientation() {
    let messageElement = document.getElementById('rotate-message');

    if (window.matchMedia("(orientation: portrait)").matches && window.matchMedia("(max-width: 48em)").matches) {
        messageElement.style.display = 'block';
    } else {
        messageElement.style.display = 'none';
    }
}
checkOrientation();
window.addEventListener('resize', checkOrientation);



// ...................Game-Start............................EventListener..................
startBtn.addEventListener("click", function(){  
    target = targetNum.value
    startingDiv.style.display = 'none';
    PlayerHighlight()

});


// ...................Init-Game............................EventListener..................
intNewGame.addEventListener("click", function(){ 
    location.reload();
});



// ...................roll-The-Dice........................EventListener..................
rollTheDice.addEventListener("click", function(){ 

    const [rand1, rand2] = rnNum(); 
    changeImageSrc(rand1, rand2);
    let activePlayer = players[`player${players.activePlayer}`];
    activePlayer.current += rand1 + rand2;

    if( players.activePlayer === 1){
        if(rand1 + rand2 === 12) {
        alert('Double six rolled!')
        p1currentScore.innerText = 0;
        players.activePlayer = 2
        PlayerHighlight()
        }else {
        p1currentScore.innerText = activePlayer.current
        }
    if(activePlayer.current + activePlayer.score > target) {
        alert('Player 1 lost. Please start a new game.');



    }
    }else if( players.activePlayer === 2){
        if(rand1 + rand2 === 12) {
        activePlayer.current = 0
        alert('Double six rolled!')
        p2currentScore.innerText = 0;
        players.activePlayer = 1
        PlayerHighlight()
        }else {
        p2currentScore.innerText = activePlayer.current
         }
    if(activePlayer.current + activePlayer.score > target) {
      
        alert('Player 2 lost. Please start a new game.');


    }
   }
  });


// ...................Change-Player........................EventListener..................
changPlayer.addEventListener("click", function(){

    let activePlayer = players[`player${players.activePlayer}`];
    if(players.activePlayer === 1){
        activePlayer.score += activePlayer.current;
        p1TotalScore.innerText = activePlayer.score;
        p1currentScore.innerText = 0;
        players[`player${players.activePlayer}`].current =0
        players.activePlayer = 2
        PlayerHighlight()

    } else if(players.activePlayer === 2){
        activePlayer.score = activePlayer.current;
        p2TotalScore.innerText = activePlayer.score;
        p2currentScore.innerText = 0;
        players[`player${players.activePlayer}`].current =0
        players.activePlayer = 1
        PlayerHighlight()
    }
});



// functions..............................................................................

const activePlayer = () => {}


// ...................Random-Number-Genrator...................Func.......................
const rnNum = () => {
    rand1 = Math.ceil(Math.random()*6)
    rand2 = Math.ceil(Math.random()*6)
    return [rand1, rand2];
    }


// ...................Image-Genrator...........................Func......................
const changeImageSrc = (rand1, rand2) => {
    const diceNum1 = `/images/dice-${rand1}.png`;
    dice1.setAttribute("src", diceNum1);
    const diceNum2 = `/images/dice-${rand2}.png`;
        dice2.setAttribute("src", diceNum2);
    }

// const curruntScore = () => {}

const PlayerHighlight = () => {

    if (players.activePlayer === 1) {
        player1Div.classList.add('current-player');
        player2Div.classList.remove('current-player');
    } else {
        player1Div.classList.remove('current-player');
        player2Div.classList.add('current-player');
    }
}


