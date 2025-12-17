['Rock-emoji.png', 'Paper-emoji.png', 'Scissors-emoji.png'].forEach(file => {
  const img = new Image();
  img.src = `images/${file}`;
});

let storedScore = JSON.parse(localStorage.getItem('score')) || {};
let score = {
  wins: storedScore.wins || 0,
  losses: storedScore.losses || 0,
  ties: storedScore.ties || 0
};

updateScoreElement();




function updateScoreElement() {
   document.querySelector('.score')
   .innerHTML = `Wins:${score.wins} Losses:${score.losses} Ties:${score.ties}`

}

function pickComputerMove() {
   let randomNumber= Math.random()
   let computerMove= '';
   if(randomNumber<=1/3){
   computerMove='Rock' ;
   }

   else if(randomNumber>1/3 && randomNumber<=2/3){
   computerMove='Paper';
   } 

   else if(randomNumber>2/3) {
   computerMove='Scissors';
   }

   return computerMove;

}


const playWithRock = () => {playGame('Rock')}
const playWithPaper = () => {playGame('Paper')}
const playWithScissors = () => {playGame('Scissors')}

const resetScore = () => { 
   score.wins = 0
   score.losses = 0
   score.ties = 0
   localStorage.removeItem('score')

   document.querySelector('.move')
         .innerHTML = 'You - Computer'
      
   document.querySelector('.result')
         .innerHTML = '[ Result ]'

   updateScoreElement()
}

const autoPlaying = () => {autoPlay()}
const keyboardPlay = (e) => {

   if (e.key === 'r' || e.key === 'R') { 
      playWithRock()
   }
   
   else if (e.key === 'p' || e.key === 'P') {
      playWithPaper()
   }

   else if (e.key === 's' || e.key === 'S') {
      playWithScissors()
   }

   else if (e.key === 't' || e.key === 'T') {
      resetScore()
   }

   else if (e.key === 'Enter') {
      confirmReset()
   }

   else if (e.key === 'Escape') {
      rejectReset()
   }

   else if (e.key === 'a' || e.key === 'A') {
      autoPlaying()
   }
}


document.querySelector('.js-rock-button')
 .addEventListener('click', playWithRock)

document.querySelector('.js-paper-button')
 .addEventListener('click', playWithPaper)

document.querySelector('.js-scissors-button')
 .addEventListener('click', playWithScissors)

document.querySelector('.js-reset-button')
 .addEventListener('click', resetScore)



document.querySelector('.js-autoPlay-button')
 .addEventListener('click', autoPlaying)

document.body.addEventListener('keydown',keyboardPlay)

 let isAutoPlaying = false;
 let startAutoPlay;

function autoPlay() {

   if (!isAutoPlaying) {
      startAutoPlay = setInterval(() => {
         const playerMove = pickComputerMove();
         playGame(playerMove);
      }, 1000);
      
      document.querySelector('.js-autoPlay-button')
         .innerHTML = 'Stop Play' ;

      isAutoPlaying = true;
      document.querySelector('.js-autoPlay-button').classList.add('stopPlay-button')
   }

   else {
      clearInterval(startAutoPlay);

      document.querySelector('.js-autoPlay-button')
         .innerHTML = 'Auto Play';

      isAutoPlaying = false;
      document.querySelector('.js-autoPlay-button').classList.remove('stopPlay-button')
   }

}



function playGame(playerMove) {

   const computerMove= pickComputerMove() 
   let result = '';

   if (playerMove === 'Rock') {

   if (computerMove === 'Rock') {
   result = 'You Tied⌛'
   }

   else if (computerMove === 'Paper') {
   result = 'You lost💥'
   }

   else if (computerMove === 'Scissors') {
   result = 'You Won🎉'
   }    
   }

   if (playerMove === 'Paper') {


   if (computerMove === 'Rock') {
   result = 'You Won🎉'
   }

   else if (computerMove === 'Paper') {
   result = 'You Tied⌛'
   }

   else if (computerMove === 'Scissors') {
   result = 'You lost💥'
   }     
   }

   if (playerMove === 'Scissors') {


   if (computerMove === 'Rock') {
   result = 'You lost💥'
   }

   else if (computerMove === 'Paper') {
   result = 'You Won🎉'
   }

   else if (computerMove === 'Scissors') {
   result = 'You Tied⌛'
   }
   }

   if (result === 'You Won🎉') {
   score.wins ++
   }
   else if (result === 'You lost💥') {
   score.losses ++
   }
   else if (result === 'You Tied⌛') {
   score.ties ++
   }


   localStorage.setItem('score', JSON.stringify(score))


   document.querySelector('.move')
   .innerHTML = `You <img class="choice-icon" src="images/${playerMove}-emoji.png" alt=""> - <img class="choice-icon" src="images/${computerMove}-emoji.png" alt=""> Computer`

   document.querySelector('.result')
   .innerHTML = result

   updateScoreElement() 


}



