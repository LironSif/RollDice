// varibale................................

// const newGamePlayer = {
//     current:0,
//     score:0
// }
// // check with harosh and hadash conflict
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
 let aiON = 0
 let target = 0 ;

// if(target === players[`player${players.activePlayer}`]) {
//  alert(players[`player${players.activePlayer}`] + 'wON')



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
let messageElement = document.querySelector('#rotate-message');
let checkbox = document.querySelector("input[type=checkbox]");
let aiName = document.querySelector('.ai')


// listeners...............................................................................


// ...................Smart-Phone-Rotate....................EventListener..................
window.addEventListener('resize', checkOrientation);


// ...................Game-Start............................EventListener..................
startBtn.addEventListener("click", function(){  
    target = targetNum.value;

    if (!target || target <= 0 || !Number.isInteger(+target)) {
    
        alert("Please enter a positive integer for the winning score.");
        targetNum.focus();
        return;
        }
        startingDiv.style.display = 'none';
        PlayerHighlight();
});

// ...................Init-Game............................EventListener..................
intNewGame.addEventListener("click", reloadPage);



// ...................roll-The-Dice........................EventListener..................
rollTheDice.addEventListener("click", function(){ 

    const [rand1, rand2] = rnNum(); 
    changeImageSrc(rand1, rand2);
    let activePlayer = players[`player${players.activePlayer}`];
    activePlayer.current += rand1 + rand2;

    if( players.activePlayer === 1){
        if(rand1 + rand2 === 12) {
            alert('Player 1: Double six rolled! you lost your current score.')
            p1currentScore.innerText = 0;
            activePlayer.current =0;
            players.activePlayer = 2
            // experiment...WORKING GOOD
            aiPlayer ()
            // experiment...WORKING GOOD
            PlayerHighlight()

        }else {
            p1currentScore.innerText = activePlayer.current
            }


            let tot1 = activePlayer.current + activePlayer.score
              // experiment..............2
            if(target === tot1) {
                alert(`Player 1 hit the target score of ${target}. Congratulations, you won!`);
                reloadPage()
               }
               // experiment ...........2
            if (tot1 > target) {
                alert(`Player 1 lost with a score of ${tot1}, exceeding the target score of ${target}. Please start a new game.`);
            }

    }else if( players.activePlayer === 2){
        if(rand1 + rand2 === 12) {
            activePlayer.current = 0
            alert('Player 2: Double six rolled! you lost your current score.')
            p2currentScore.innerText = 0;
            activePlayer.current =0;
            players.activePlayer = 1
            PlayerHighlight()

         }else {
            p2currentScore.innerText = activePlayer.current
            }
            let tot2 = activePlayer.current + activePlayer.score
             // experiment..............2
             if(target === tot2) {
                alert(`Player 2 hit the target score of ${target}. Congratulations, you won!`);
                reloadPage()
               }
               // experiment ...........2
        if (tot2 > target) {
            alert(`Player 2 lost with a score of ${tot2}, exceeding the target score of ${target}. Please start a new game.`);


        }        
         }
     }
  );


// ...................Change-Player......Hold-btn...............EventListener..................
changPlayer.addEventListener("click", changePlayer);


// functions.................................................................................

// ...................Game-int.................................Func..........................
function reloadPage() {
    location.reload();
}


// ...................Random-Number-Genrator...................Func..........................
const rnNum = () => {
    rand1 = Math.ceil(Math.random()*6)
    rand2 = Math.ceil(Math.random()*6)
    return [rand1, rand2];
    }


// ...................Image-Genrator...........................Func..........................
const changeImageSrc = (rand1, rand2) => {
    const diceNum1 = `/images/dice-${rand1}.png`;
    dice1.setAttribute("src", diceNum1);
    const diceNum2 = `/images/dice-${rand2}.png`;
    dice2.setAttribute("src", diceNum2);
    }

// ...................Change-Player............................Func..........................
function changePlayer() {
    let activePlayer = players[`player${players.activePlayer}`];

    if (players.activePlayer === 1) {
        activePlayer.score += activePlayer.current;
        p1TotalScore.innerText = activePlayer.score;
        p1currentScore.innerText = 0;
        players[`player${players.activePlayer}`].current = 0;
        players.activePlayer = 2;
        aiPlayer  ()
        PlayerHighlight();

    } else if (players.activePlayer === 2) {
        activePlayer.score += activePlayer.current;
        p2TotalScore.innerText = activePlayer.score;
        p2currentScore.innerText = 0;
        players[`player${players.activePlayer}`].current = 0;
        players.activePlayer = 1;
        PlayerHighlight();
    }
}


// ...................Player-Highlight-...................Func................................
const PlayerHighlight = () => {

    if (players.activePlayer === 1) {
        player1Div.classList.add('current-player');
        player2Div.classList.remove('current-player');
    } else {
        player1Div.classList.remove('current-player');
        player2Div.classList.add('current-player');
    }
}


// ...................Check-Orientation-...................Func...............................
function checkOrientation() {

    if (window.matchMedia("(orientation: portrait)").matches && window.matchMedia("(max-width: 48em)").matches) {
        messageElement.style.display = 'block';
    } else {
        messageElement.style.display = 'none';
    }
}
checkOrientation();

// ...................Ai....................................Func...............................

const aiPlayer = () => {
    if(aiON === 1 && players.activePlayer === 2) {
        let x = Math.ceil(Math.random()*3);

        function playRound(t) {
            if (t <= x) {
                console.log(`playing ${t} round..`);
                const [rand1, rand2] = rnNum(); 

                if(rand1 + rand2 === 12){
                    alert('Notice: the AI scored 12. Our team is aware of a scope issue and is working to fix it. Please restart the game in the meantime. Thank you.');
                    changPlayer ()
                }
               
                setTimeout(() => {changeImageSrc(rand1, rand2); }, 1400);
                setTimeout(() => {
                   
                    console.log(`Ai got ${rand1 + rand2}..`);
                    console.log('thinking..');
                    
                    players.player2.current += rand1 + rand2;
                    p2currentScore.innerText = players.player2.current ;
                    playRound(t + 1);  
                }, 1400);

            } else {

                console.log('ai finish his round')
                let tot = players.player2.current + players.player2.score
                if ( tot > target) {
                    alert(`Congratulations, you win! AI score: ${tot}, Target score: ${target}. Click 'OK' to start a new game.`);
                    reloadPage();
                } else {
                    console.log("Changing player..");
                    setTimeout(() => {changePlayer(); }, 1400);
                    
                }
            }
        }
        playRound(1);  

    }
};


// ...................Check-box....................................Func...............................
        checkbox.addEventListener('change', function() {
            
        if (this.checked) {
            aiON = 1
            aiName.innerText = "Ai"
            aiPlayer ()
            console.log("Ai is checked..");
        } else {
            aiON = 0
            aiName.innerText = "Player2"
            players.player2.current = 0;
            console.log("Ai is not checked..");
        }
        });
