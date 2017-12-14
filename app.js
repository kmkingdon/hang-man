const wordOptions= ["slap", "prince", "helping", "person", "laughter", "musical", "paul"];
const guessedLetters= ["Letters:"];
const wordArray= [];
const wordDisplay= document.getElementById('word-display');
const wordSection= document.getElementsByClassName('word')[0];
const formSection= document.getElementsByClassName('form')[0];
const guessSection= document.getElementsByClassName('guess')[0];
const form= document.getElementById('form');
const error= document.getElementById('error');
const letter= document.getElementById('letter');
const guessDisplay= document.getElementById('guess-display');
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const body= document.querySelector('body');
const startButton= document.querySelector('button');
let warning= document.getElementById('warning');
let wordArraySecret;
let guess;



startButton.addEventListener("click", startGame);

function startGame() {
  body.removeChild(startButton)
  let index= Math.floor(Math.random()*wordOptions.length);
  let word= wordOptions[index];
  wordSection.classList.remove("hidden");
  formSection.classList.remove("hidden");
  guessSection.classList.remove("hidden");
  wordArraySecret= word.split('');
  for (var i = 0; i < word.length; i++) {
    wordArray.push('_');
  }

  let displayWord = wordArray.join(" ");
  wordDisplay.innerHTML= displayWord;
}

letter.addEventListener('input', checkUsedLetters);

function checkUsedLetters(event) {
  for (var i = 0; i < guessedLetters.length; i++) {
    if(event.target.value === guessedLetters[i]) {
      error.innerHTML="You have already used that letter!"
      setTimeout(function(){error.innerHTML= "";}, 2000)
    } else {
      event.preventDefault();
      let submit= document.createElement('input');
      submit.type = "submit";
      submit.value = "Guess";
      submit.id= "submit"
      if(form.childElementCount === 1){
        form.appendChild(submit);
      }
    }
  }
}

form.addEventListener("submit", guessLetter);

function  guessLetter(event) {
  event.preventDefault();
  guess= event.target[0].value;

  if(wordArraySecret.indexOf(guess) >= 0) {
    let index= wordArraySecret.indexOf(guess)
    wordArray[index]= guess;
    let displayWord = wordArray.join(" ");
    wordDisplay.innerHTML= displayWord;
    if(displayWord.includes("_")=== false){
      gameOverWin();
    }
  } else{
    guessedLetters.push(guess);
    let guessLettersDisplay= guessedLetters.join('  ');
    guessDisplay.innerHTML= guessLettersDisplay;
    draw();
  }
}

function draw() {
  let guessLength= guessedLetters.length;
  switch(guessLength) {

    case 2:
      ctx.beginPath();
      ctx.arc(127, 100, 15, 0, Math.PI*2);
      ctx.fillStyle = "black"
      ctx.fill();
      ctx.closePath();
      break;

    case 3:
      ctx.beginPath();
      ctx.rect(125, 115, 5, 50);
      ctx.fillStyle = "black"
      ctx.fill();
      ctx.closePath();
      break;

    case 4:
      ctx.rotate(35*Math.PI/180)
      ctx.beginPath();
      ctx.rect(180, 0, 5, 40);
      ctx.fillStyle = "black"
      ctx.fill();
      ctx.closePath();
      break;

    case 5:
      ctx.rotate(-67*Math.PI/180)
      ctx.beginPath();
      ctx.rect(33, 145, 5, 40);
      ctx.fillStyle = "black"
      ctx.fill();
      ctx.closePath();
      break;

    case 6:
      ctx.rotate(0*Math.PI/180)
      ctx.beginPath();
      ctx.rect(21, 202, 5, 40);
      ctx.fillStyle = "black"
      ctx.fill();
      ctx.closePath();
      break;

    case 7:
      ctx.rotate(50*Math.PI/180)
      ctx.beginPath();
      ctx.rect(167, 110, 5, 40);
      ctx.fillStyle = "black"
      ctx.fill();
      ctx.closePath();
      break;

    case 8:
      ctx.rotate(0*Math.PI/180)
      ctx.beginPath();
      ctx.arc(135, 68, 5, 0, Math.PI*2);
      ctx.fillStyle = "black"
      ctx.fill();
      ctx.closePath();
      break;

    case 9:
      ctx.beginPath();
      ctx.arc(175, 53, 5, 0, Math.PI*2);
      ctx.fillStyle = "black"
      ctx.fill();
      ctx.closePath();
      break;

    case 10:
      ctx.beginPath();
      ctx.arc(167, 150, 5, 0, Math.PI*2);
      ctx.fillStyle = "black"
      ctx.fill();
      ctx.closePath();
      break;

    case 11:
      ctx.beginPath();
      ctx.arc(203, 138, 5, 0, Math.PI*2);
      ctx.fillStyle = "black"
      ctx.fill();
      ctx.closePath();
      warning.innerHTML="Last Guess!"
      setTimeout(function(){warning.innerHTML= "";}, 3000)
      break;

    case 12:
      gameOver()

    default:
      break;
  }
}

function gameOver() {
  warning.innerHTML="You Lost!!"
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  var img=document.getElementById("lost");
  ctx.drawImage(img,0,0,300,300);
  setTimeout(function(){warning.innerHTML= "";}, 3000)
  let restart= document.createElement('button');
  restart.innerHTML= "Play Again";
  restart.id= "play-again";
  restart.addEventListener('click', reload);
  body.appendChild(restart);
}

function gameOverWin() {
  warning.innerHTML="You Won!!";
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  var img=document.getElementById("win");
  ctx.drawImage(img,0,0,300,300);
  setTimeout(function(){warning.innerHTML= "";}, 2000)
  let restart= document.createElement('button');
  restart.innerHTML= "Play Again";
  restart.id= "play-again";
  restart.addEventListener('click', reload);
  body.appendChild(restart);
}

function reload() {
  location.reload();
}
