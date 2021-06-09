var hiddenWord = '';
var letterCounter = 7;
var wordToGuess = randomWord();
var lg = wordToGuess.length;

function randomWord() {
	var words = ["agreement", "antidisestablishmentarianism", "approach", "attention", "business", "challenge", "computer", "decision", "development", "example", "generation", "hard", "image", "incomprehensibilities", "issue", "letter", "message", "money", "network", "page", "phone", "professional", "relationship", "room", "small", "statement", "strategy", "successful", "technology", "tree", "window", "yes"];
 	var randomWord =  Math.floor(Math.random() * words.length);
 	return words[randomWord];
	}

function start() {
	document.getElementById("letterCheck").style.visibility = "visible";
	document.getElementById("check").style.visibility = "visible";
}

function printWord() {
	wordToGuess = randomWord();
	lg = wordToGuess.length;
	for (let i = 0; i < lg; ++i) {
		hiddenWord += "_";	
	}
	document.getElementById("printWord").innerHTML = hiddenWord;
	console.log(wordToGuess);
}

function replaceCharAt(str,index,chr) {
    return str.substring(0,index) + chr + str.substring(index+1);
}

const usedLetters = document.querySelector('.usedLetters');
const insertField = document.querySelector('.insertField');
const check = document.querySelector('.check');

function checkLetter() {
	document.getElementById("startNewGame").style.visibility = "visible";
	document.getElementById("start").style.visibility = "hidden";
	var letterInserted = letterCheck.value.toLowerCase();
	if (letterInserted.length === 1 || letterInserted.length === lg) {
		if (letterInserted === wordToGuess) {
			win();
		}
		else {
			document.getElementById("usedLetters").innerHTML += letterInserted + " ";
			for (let i = 0; i < lg;) {	
				if (wordToGuess.charAt(i) === letterInserted) {
					hiddenWord = replaceCharAt(hiddenWord, i, letterInserted);
					++i;
				}
				else {
					++i;
				}
			}
			if (!(wordToGuess.includes(letterInserted))) {
				letterCounter -= 1;
			}	
			document.getElementById("lettersCounter").innerHTML = "You've got " + letterCounter + " tries left!";
			if (letterCounter === 0) {
				gameOver();
			}
			document.getElementById("printWord").innerHTML = hiddenWord;
			if (hiddenWord === wordToGuess) {
				win();
			}
		}
	}
	else {
		letterCounter -= 1;
		document.getElementById("lettersCounter").innerHTML = "You've got " + letterCounter + " tries left!";
	}
}
function win() {
	document.getElementById("startNewGame").style.visibility = "visible";
	document.getElementById("start").style.visibility = "hidden";
	document.getElementById("usedLetters").innerHTML = "";
	document.getElementById("win||gameOver").innerHTML = "Congratulations! You guessed it!";
	document.getElementById("wordToGuess").innerHTML = "";
	document.getElementById("lettersCounter").innerHTML = "";
	insertField.disabled = true;
	check.disabled = true;
}

function gameOver() {
	document.getElementById("startNewGame").style.visibility = "visible";
	document.getElementById("start").style.visibility = "hidden";
	insertField.disabled = true;
	check.disabled = true;
	document.getElementById("usedLetters").innerHTML = "";
	document.getElementById("win||gameOver").innerHTML = "Game Over";
	document.getElementById("wordToGuess").innerHTML = "The word to guess was:" + " " + "<strong>" + wordToGuess + "</strong>";
	document.getElementById("lettersCounter").innerHTML = "";
}

function resetGame() {
	insertField.disabled = false;
	check.disabled = false;
	document.getElementById("win||gameOver").innerHTML = "";
	document.getElementById("wordToGuess").innerHTML = "";
	document.getElementById("lettersCounter").innerHTML = "";
	document.getElementById("usedLetters").innerHTML = "";
	document.getElementById("letterCheck").value = "";
	document.getElementById("printWord").innerHTML = "";
	letterCounter = 7;
	hiddenWord = "";
	printWord();
}
