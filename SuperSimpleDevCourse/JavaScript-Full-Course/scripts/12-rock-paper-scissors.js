let isAutoPlaying=false;
let intervalId;
const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0

};
updateScoreElement();

function resetGame(){
    score.wins=0;
    score.losses=0;
    score.ties=0;
    document.querySelector('.js-result').innerHTML = '';
    document.querySelector('.js-moves').innerHTML = '';
    localStorage.removeItem('score')
}


function autoPlay(){
    if(!isAutoPlaying){
        intervalId= setInterval(()=>{
            const playerMove = pickComputerMove();
            playGame(playerMove);
        },1000);
        isAutoPlaying=true;
        document.querySelector('.auto-play-button').innerText='Stop'

    }else {
        clearInterval(intervalId);
        document.querySelector('.auto-play-button').innerText='Auto Play'
        isAutoPlaying=false;
    }
  
}
document.querySelector('.js-rock-button').addEventListener('click',()=>{
    playGame('rock')
})

document.querySelector('.js-paper-button').addEventListener('click',()=>{
    playGame('paper')
})

document.querySelector('.js-scissors-button').addEventListener('click',()=>{
    playGame('scissors')
})

document.querySelector('.js-reset-score-button').addEventListener('click',()=>{
    resetGame();
    updateScoreElement();
})
document.querySelector('.js-auto-play-button').addEventListener('click',()=>{
    autoPlay();
})

document.body.addEventListener('keydown',(event)=>{
    const {key}=event;
    if(key==='r'){
        playGame('rock')
    }else
    if(key=="p"){
        playGame('paper')
    }else
    if(key=="s"){
        playGame('scissors')
    }
        
});
function playGame(yourMove) {

    let result = '';
    const computerMove = pickComputerMove();

    if (yourMove === computerMove) {
        result = 'Tie.';
        score.ties += 1
    } else
        if ((computerMove === 'rock' && yourMove === "scissors") ||
            (computerMove === 'scissors' && yourMove == 'paper') ||
            (computerMove == "paper" && yourMove === 'rock')) {
            result = 'You lose.';
            score.losses += 1;
        }
        else if ((computerMove === 'scissors' && yourMove === 'rock') ||
            (computerMove === 'paper' && yourMove == 'scissors') ||
            (computerMove == "rock" && yourMove === 'paper')) {
            result = 'You win.';
            score.wins += 1;
        }


    localStorage.setItem('score', JSON.stringify(score));
    updateScoreElement();
    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves')
        .innerHTML = `You <img src = 'images/${yourMove}-emoji.png' class='move-icon' ><img src='images/${computerMove}-emoji.png' class='move-icon'> Computer`;

}

function updateScoreElement() {
   
   const scoreElement= document.querySelector('.js-score')
   
   scoreElement.innerHTML = `Wins: ${score.wins} 
        Loses: ${score.losses}
        Ties: ${score.ties}`;
}

function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = '';
    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
    }
    else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';
    }
    else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'scissors';
    }

    return computerMove;

}
