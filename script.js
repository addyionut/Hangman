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

function wrongLetter() {
	letterCounter -= 1;
	document.getElementById("lettersCounter").innerHTML = "You've got " + letterCounter + " tries left!";
	if (letterCounter === 0) {
		return gameOver();
	}
}

const usedLetters = document.querySelector('.usedLetters');
const insertField = document.querySelector('.insertField');
const check = document.querySelector('.check');

function checkLetter() {
	var letterInserted = document.getElementById("letterCheck").value.toLowerCase();
	if (letterInserted.length !== 1 && letterInserted.length !== lg) {
		return document.getElementById("lettersCounter").innerHTML = "Wrong input!";
	}
	if (!(wordToGuess.includes(letterInserted))) {
		 wrongLetter();
	}
	for (let i = 0; i < lg;) {	
		if (wordToGuess.charAt(i) === letterInserted) {
			hiddenWord = replaceCharAt(hiddenWord, i, letterInserted);
			++i;
		}
		else {
			++i;
		}
	}	
	document.getElementById("printWord").innerHTML = hiddenWord;
	document.getElementById("usedLetters").innerHTML += letterInserted + " ";
	if (letterInserted === wordToGuess || hiddenWord === wordToGuess) {
		return win();
	}
}

function fieldsStatus() {
	insertField.disabled = true;
	check.disabled = true;
	document.getElementById("usedLetters").innerHTML = "";
	document.getElementById("lettersCounter").innerHTML = "";
}

function win() {
	fieldsStatus();
	document.getElementById("winMessageGO").innerHTML = "<strong>Congratulations! You guessed it!</strong>";
	document.getElementById("wordToGuess").innerHTML = "";
}

function gameOver() {
	fieldsStatus();
	document.getElementById("winMessageGO").innerHTML = "Game Over";
	document.getElementById("wordToGuess").innerHTML = "The word to guess is:" + " " + "<strong>" + wordToGuess + "</strong>";
}

function resetGame() {
	fieldsStatus();
	insertField.disabled = false;
	check.disabled = false;
	document.getElementById("winMessageGO").innerHTML = "";
	document.getElementById("wordToGuess").innerHTML = "";
	document.getElementById("letterCheck").value = "";
	document.getElementById("printWord").innerHTML = "";
	letterCounter = 7;
	hiddenWord = "";
	printWord();
}
