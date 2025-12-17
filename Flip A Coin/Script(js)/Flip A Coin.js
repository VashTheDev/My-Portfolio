['heads.png', 'tails.png'].forEach(file => {
  const img = new Image();
  img.src = `images/${file}`;
});

let score = JSON.parse(localStorage.getItem('score')) || {wins: 0, losses: 0}

document.querySelector('.js-score')
    .innerHTML = `Wins:${score.wins} Losses:${score.losses}`

function flipCoin() {

  const randomNumber = Math.random();
  let result = '';
  
  if (randomNumber <= 0.5) {
    result = "Heads";
  }

  else {
    result = "Tails";
  }

  return result;

}


let isAutoPlaying = false;
let startAutoPlaying; 


function autoPlay() {

  if (!isAutoPlaying) {
    startAutoPlaying = setInterval(() => {
      const choice = flipCoin();
      finalResult(choice)
    },1000)
    
    isAutoPlaying = true
    document.querySelector('.js-autoPlay-button')
      .innerHTML = 'Stop Play'

    document.querySelector('.js-autoPlay-button').classList.add('stopPlay-button')
  }

  else{
    clearInterval(startAutoPlaying);
    isAutoPlaying = false;
    document.querySelector('.js-autoPlay-button')
      .innerHTML = 'Auto play'

    document.querySelector('.js-autoPlay-button').classList.remove('stopPlay-button')
  } 

}


function finalResult(choice) {

  const result = flipCoin()

  let displayResult = ``;

  if (choice === 'flip') {

    if (result === "Heads")
      displayResult = 
      `<img src="images/heads.png">
      <p>It's ${result}!</p>`
    
    else{
        displayResult = 
      `<img src="images/tails.png">
      <p>It's ${result}!</p>`
    }

  } 


  else if (choice === 'Heads') {

    if (result === "Heads") {
      displayResult = 
      `<img src="images/heads.png">
      <p>It's ${result}! You chose Heads,You Won🎉</p>`
    }
    else {
      displayResult = 
      `<img src="images/tails.png">
      <p>It's ${result}! You chose Heads,You lost💥</p>`
    }

  }
  

  else if (choice === 'Tails') {

    if (result === "Heads") {
      displayResult = 
      `<img src="images/heads.png">
      <p>It's ${result}! You chose Tails,You lost💥</p>`
    }
    else {
      displayResult = 
      `<img src="images/tails.png">
      <p>It's ${result}! You chose Tails,You Won🎉</p>`
    }

  }


  if(displayResult === 
      `<img src="images/heads.png">
      <p>It's ${result}! You chose Heads,You Won🎉</p>` 
      ||
        displayResult === 
      `<img src="images/tails.png">
      <p>It's ${result}! You chose Tails,You Won🎉</p>`) 

  {score.wins ++}

  if(displayResult === 
      `<img src="images/tails.png">
      <p>It's ${result}! You chose Heads,You lost💥</p>`
      || 
      displayResult ===
      `<img src="images/heads.png">
      <p>It's ${result}! You chose Tails,You lost💥</p>`)
      
  {score.losses ++}


  document.querySelector('.js-result')
    .innerHTML = displayResult
  
  document.querySelector('.js-score')
    .innerHTML = `Wins:${score.wins} Losses:${score.losses}`

  localStorage.setItem('score', JSON.stringify(score))


}



const flip = () => {
  finalResult('flip')
} 
const heads = () => {
  finalResult('Heads')
} 
const tails = () => {
  finalResult('Tails')
} 
const reset = () => {
  score = {wins: 0, losses: 0}

  document.querySelector('.js-score')
    .innerHTML = `Wins:${score.wins} Losses:${score.losses}`

  localStorage.setItem('score', JSON.stringify(score))

}


const flipButton = document.querySelector('.js-flip-button')

const headsButton = document.querySelector('.js-heads-button')

const tailsButton = document.querySelector('.js-tails-button')

const autoPlayButton = document.querySelector('.js-autoPlay-button')

const resetButton = document.querySelector('.js-reset-button')


flipButton.addEventListener('click',flip)
headsButton.addEventListener('click',heads)
tailsButton.addEventListener('click',tails)
autoPlayButton.addEventListener('click',autoPlay)
resetButton.addEventListener('click',reset)




