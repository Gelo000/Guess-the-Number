document.addEventListener('DOMContentLoaded', function() {
    const guessNumberResult = document.getElementById('guess-number-result');
    const guessAttempts = document.getElementById('guess-attempts');
    const enterGuess = document.getElementById('enter-guess');
    const enterGuessLabel = document.getElementById('enter-guess-label');
    const guessButton = document.getElementById('guess-button');
    const guessHistory = document.getElementById('guess-history');
    const guessHistoryCard = document.getElementById('card-history');
    const historyText = document.getElementById('history-text');
    const noHistoryText = document.getElementById('no-history-text');
    let enterNumber = '';
    let btnName = '';
    let random1 = '';
    let counter = 0;
    let counterHistory = 0;
    let chosenNumber = 0;
    let myRandom1 = 0;
    guessAttempts.textContent = 'Click \'PLAY\' to Start!';
    enterGuess.style.display = 'none';
    enterGuessLabel.style.display = 'none';
    guessHistoryCard.style.display = 'none';

    function appendGuessHistory(guess, indicator) {
      noHistoryText.style.display = 'none';
      counterHistory++; // Increment the counter
      const guessHistoryItem = document.createElement('p');
      const indicatorIcon = document.createElement('i');
      guessHistoryItem.textContent = `${counterHistory}.) Guess: ${guess} (${indicator}) `; // Include the counter value
      if (indicator === 'Correct') {
        guessHistoryItem.style.color = 'green';
        guessHistoryItem.style.fontWeight = 'bold';
        indicatorIcon.classList.add('fas', 'fa-check', 'text-success');
      } else if (indicator === 'Too High') {
        guessHistoryItem.style.color = 'red';
        guessHistoryItem.style.fontWeight = 'normal';
        indicatorIcon.classList.add('fas', 'fa-arrow-up', 'text-danger');
      } else if (indicator === 'Too Low') {
        guessHistoryItem.style.color = 'gray';
        guessHistoryItem.style.fontWeight = 'normal';
        indicatorIcon.classList.add('fas', 'fa-arrow-down', 'text-secondary');
      }
      
      guessHistoryItem.classList.add('history-item'); // Add a class to the history item

      guessHistoryItem.appendChild(indicatorIcon);
      guessHistory.prepend(guessHistoryItem);

      // Remove the class from previous history items
      const previousItems = document.querySelectorAll('.history-item');
      previousItems.forEach(item => item.classList.remove('latest'));
      
      // Add the class to the latest history item
      guessHistoryItem.classList.add('latest');
    }



    guessButton.addEventListener('click', function() {
      enterNumber = enterGuess.value;
      btnName = guessButton.textContent;
      enterNumber = enterGuess.value;

      if (btnName === 'PLAY') {
        enterGuess.style.display = 'block';
        enterGuessLabel.style.display = 'block';
        guessNumberResult.style.display = 'block';
        guessHistoryCard.style.display = 'block';
        noHistoryText.style.display = 'block';
        myRandom1 = Math.floor(Math.random() * 50) + 1;
        guessButton.textContent = 'GUESS!';
        guessNumberResult.textContent = 'Please enter a number';
        guessAttempts.textContent = 'No attempts yet';
        guessHistory.innerHTML = '';
      } else if (enterNumber === '' && btnName === 'GUESS!') {
        alert('Enter a number first');
      } else if (enterNumber !== '' && btnName === 'GUESS!') {
        chosenNumber = parseInt(enterNumber);

        if (chosenNumber > myRandom1 && chosenNumber <= 50) {
          guessNumberResult.textContent = 'Too High. Try Again';
          appendGuessHistory(chosenNumber, 'Too High');
          counter++;
          enterGuess.value = '';
          guessAttempts.textContent = 'Number of Attempt(s): ' + counter;
        } else if (chosenNumber < myRandom1 && chosenNumber > 0) {
          guessNumberResult.textContent = 'Too Low. Try Again';
          appendGuessHistory(chosenNumber, 'Too Low');
          counter++;
          enterGuess.value = '';
          guessAttempts.textContent = 'Number of Attempt(s): ' + counter;
        } else if (chosenNumber > 50 || chosenNumber < 1) {
          guessNumberResult.textContent = 'The Number is Out of Range';
          enterGuess.value = '';
        } else {
          guessNumberResult.textContent = 'You Guessed the Number!';
          appendGuessHistory(chosenNumber, 'Correct');
          counter++;
          guessNumberResult.textContent = 'You Got it in ' + counter + ' attempt(s)';
          guessAttempts.textContent = "Click 'RESTART' to play again";
          guessButton.textContent = 'RESTART';
          enterGuess.disabled = true;
        }
      } else if (btnName === 'RESTART') {
        counter = 0;
        counterHistory = 0; 
        chosenNumber = 0;
        myRandom1 = 0;
        enterNumber = '';
        btnName = '';
        random1 = '';
        enterGuess.value = '';
        enterGuess.style.display = 'none';
        enterGuessLabel.style.display = 'none';
        guessHistoryCard.style.display = 'none';
        guessAttempts.textContent = 'Click \'PLAY\' to Start!';
        guessNumberResult.textContent = '';
        guessButton.textContent = 'PLAY';
        enterGuess.disabled = false;
        guessNumberResult.style.display = 'none';
        enterGuess.style.display = 'none';
        enterGuess.style.display = 'none';
        guessHistory.innerHTML = '';
      }
    });

    enterGuess.addEventListener('input', function() {
      btnName = guessButton.textContent;
      if (btnName === 'GUESS!') {
        guessNumberResult.style.display = 'block';
        enterGuess.style.display = 'block';
        enterGuess.style.display = 'block';
      }
    });
  });