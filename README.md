# trivia-game
A fast paced trivia game 

## Assignment Description

### Objectives
* Use setTimeout(), clearTimeout, and setInterval() and jQuery to create a dynamic Trivia game

### Frameworks used
* Bootstrap
* Jquery

### Option Two: Advanced Assignment (Timed Questions)

* You'll create a trivia game that shows only one question until the player answers it or their time runs out.

* If the player selects the correct answer, show a screen congratulating them for choosing the right option. After a few seconds, display the next question -- do this without user input.

* The scenario is similar for wrong answers and time-outs.

  * If the player runs out of time, tell the player that time's up and display the correct answer. Wait a few seconds, then show the next question.
  * If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. Wait a few seconds, then show the next question.

* On the final screen, show the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page).

## Approach
At the start of the game a welcome message and button is displayed, when the user clicks the button the first question is loaded. Then while there are still values in the Questions array, loadQuestion and timer will be executed. Once there are no more questions remaining the user's results will be displayed and a button will appear to try again.

### Functions

<details>

<summary>initializeGame()</summary>

* Displays a welcome message
* Start Button
    * executes loadQuestion() on click

</details>
    
<details>
<summary>loadQuestion()</summary>

* Empties game div
* Captures current question 
    * Use array.pop() 
    * Store return value in var q
* Create timer element
    * Add classes
    * Add content
    * Append to game
* Create question element
    * Add classes
    * Add content
    * Append to game
* Create answer element
    * Add classes
    * Add content
    * Append to game
* Create final answer button
    * Add classes
    * Add content
    * Append to game       
</details>

<details>
<summary>timer()</summary>

* set counter to 0
* setInterval: 1sec
    * counter+    
* setTimeout: 10sec
    * empty game div
    * if (!answer)
        * display message "too bad, next question"
        * else display if answer is correct or not
    * setTimeout: 3 sec
        * empty div
</details>

<details>
<summary>checkAnswer()</summary>

* Final answer .on('click')
    * capture selected answer
    * empty game div
* if (question is correct)
    * Display correct message 
        * increment correct
    * else display incorrect message
        * increment incorrect
</details>

<details>
<summary>endGame()</summary>

* if (q.length === 0)
    * game over
    * display number of correct answers
    * display number of incorrect answers
    * display % correct

</details>


