//object questions contains all the questions for the app
////question contains string
////choices is an array of answer choices
////answer is the index of the correct answer
const questions = [
    {
        question: 'Find a 10-digit number where the first digit is how many zeros in the number, the second digit is how many 1s in the number etc. until the tenth digit which is how many 9s in the number.',
        choices: ['6210001000', '4570006300', '0087032210', '0001652010'],
        answer: 0
    },
    {
        question: 'How can I get the answer 24 by only using the numbers 8,8,3,3. You can use add, subtract, multiply, divide, and parentheses.',
        choices: ['3/(8-(8/3))', '8/(3+(8/3))', '8/(3-(8/3))', '3/(8-(8*3))'],
        answer: 2
    },
    {
        question: 'What number should replace the question mark to a definite rule?<br><br>147,159,174,186, ?',
        choices: ['563', '201', '103', '428'],
        answer: 1
    },
    {
        question: 'If a car had increased its average speed for a 210 mile journey by 5 mph, the journey would have been completed in one hour less. What was the original speed of the car for the journey?',
        choices: ['10mph', '30 mph.', '17mph', '50mph'],
        answer: 1
    },
    {
        question: 'If I had one more sister I would have twice as many sisters as brothers. If I had one more brother I would have the same number of each. How many brothers and sisters have I?',
        choices: ['two sisters and three brothers.', 'four sisters and six brothers.', 'two sisters and six brothers.', 'Three sisters and two brothers.'],
        answer: 3
    }
];

const game = $('#game');
var unanswered = [];
var q = undefined;
var answered = 0;
var correct = 0;
var incorrect = 0;
var completed = false;
var answer = undefined;


function reset () {
    questions.forEach((q) => {
        unanswered.push(q);
    });
    q = undefined;
    answered = 0;
    correct = 0;
    incorrect = 0;
    completed = false;
    answer = undefined;
}

//displays beginning game message 
//adds a button that starts the game
function initializeGame () {
    reset();
    var prompt = $('<div>');
    var message = $('<h3>');
    var button = $('<button>');

    game
        .addClass('d-flex justify-content-center');
    prompt
        .addClass('rounded')
    message
        .addClass('p-4 graphite')
        .html('Welcome to my super hard trivial game!');
    button
        .attr('id', 'start')
        .addClass('btn btn-primary m-4 float-right')
        .text('Click me to start');

    prompt
        .append(message)
        .append(button);
    game
        .append(prompt);
    
    $('#start').on('click', () => {
        loadQuestion(timer());
        submitAnswer();
    });
}

//Creates html for each question
//appends question to #game 
//timer is a callback funtion run after loadQuestion is called
function loadQuestion (timer) {
    var timer = $('<div>');
    var question =$('<div>');
    var choices = $('<div>');
    var submit = $('<button>');
    var wrapper = $('<div>');
    var timeout, interval;

    game
        .empty()
        .addClass('flex-column');
    q = unanswered.pop();

    timer   
        .addClass('display-4 text-center mb-2')
        .attr('id', 'timer')
        .html('00:30');
    question
        .addClass('text-center m-2')
        .html(`<h3>${q.question}</h3>`);
    choices
        .addClass('centered')
    //each radio should be nested within a <label> containing the text
    //followed by the <input> 
    //followed by an empty <span> with the class of .radio
        .html(`
            <form>
                <label class="wrapper"><input type="radio" name="choice" value="0"> ${q.choices[0]}  
                </label><br>
                <label class="wrapper"><input type="radio" name="choice" value="0"> ${q.choices[1]}
                </label><br>
                <label class="wrapper"><input type="radio" name="choice" value="0"> ${q.choices[2]}   
                </label><br>
                <label class="wrapper"><input type="radio" name="choice" value="0"> ${q.choices[3]}   
                </label>
            </form>
            `);

    submit
        .attr('id', 'submit')
        .addClass('btn btn-lg m-4 sweep-to-right')
        .css('width', '200px')
        .text('Final Answer?');

    wrapper
        .addClass('d-flex justify-content-center m-4')
        .append(submit);

    game
        .append(timer)
        .append(question)
        .append(choices)
        .append(wrapper);     
}

//creates a timer and a counter
//counter displays the seconds remaining in #game
//timer runs checkAnswer after 10 seconds
//timer function should be used as a callback of loadQuestion
function timer () {
    var counter = 30;
    console.log('executing timer function');
    
    interval = setInterval(() => {    
        if(counter === 0){
            clearInterval(interval);
        }
        counter--;
        //fix the timer for 30 seconds
        if (counter >= 10){
            $('#timer').html('00:' + counter);
        } else{
            $('#timer').html('00:0' + counter); 
        }
    }, 1000);

    timeout = setTimeout(() => {
        return checkAnswer();
    }, 30000);  
 }

 //when the submit button is clicked
 ////interval is cleared
 ////timeout is cleared
 ////check answer is called
 //this function must be called after loadQuestion to work
 function submitAnswer() {
    $('#submit').on('click', () => {
        clearInterval(interval);
        clearTimeout(timeout);
        checkAnswer();
    }); 
}
//captures the value from radio input and parses answer to integer
//empties #game div 
//creates alert div to display the result of user input
//appends to #game div
//setTimeout clears #game div in 2 seconds
////evaluates if the game is over
//////displays gameover screen if true
//////runs loadQuestion and submitAnswer if false
function checkAnswer() {
    answer = $('input[name=choice]:checked').val();
    if (answer !== undefined){
        answer = parseInt(answer);
    }
        
    console.log(`user answer: ${answer}, correct answer: ${q.answer}`);

    var result = $('<h2>');
    var correctAnswer = $('<div>');
    var score = $('<div>');
    var container = $('<div>');
    $('#game').empty();

    container   
        .css('margin', '50px');
    
    correctAnswer
        .addClass('text-center p-4')
        .append('<h3> The correct answer is...</h3>')
        .append(`<p> ${q.choices[q.answer]}</p>`);

    if (answer === undefined) {
        incorrect++;
        result
            .html('Incorrect...Too slow!')
        game
            .append(result)
            .append(correctAnswer);
    }else if(answer === q.answer){
        correct++;
        answered++;
        result
            .html('That was correct...lucky guess!')
        game
            .append(result)
            .append(correctAnswer);

    }else if(answer !== q.answer){
        incorrect++;
        answered++;
        result
            .html('HA! Incorrect...I guess you don\'t know everything after all!')
        game
            .append(result)
            .append(correctAnswer);
    }
    console.log(unanswered);
    console.log('questions remaining: ', unanswered.length);
    
    setTimeout(() => {
        if(unanswered.length === 0){
            game.empty();
            results();
        }else{
            loadQuestion(timer());
            submitAnswer();
        }
    }, 2000);
}

//calculates results and appends at gameover
//display answered
//display correct
//display incorrect
//display percentage
function results() {
    var header = $('<h1>');
    var percent = (correct/5) * 100;
    var results = $('<div>');
    var wrapper = $('<div>');
    var resetButton = $('<button>');
    var container = $('<div>');

    container   
        .css('margin', '50px');

    header  
        .addClass('text-center')
        .text('Game Over!');

    results
        .append(`<p>Questions answered: ${answered}</p>`)            
        .append(`<p>Correct: ${correct}</p>`)
        .append(`<p>Incorect: ${incorrect}</p>`)           
        .append(`<p>Score: ${percent}%</p>`);


    resetButton        
        .text('Play Again')
        .addClass('btn btn-primary btn-lg float-right');

    resetButton.on('click', function(){
        game.empty();
        reset();
        initializeGame();
    });

    container
        .append(header)
        .append(results)
        .append(resetButton);

    game
        .addClass('centered')
        .append(container);

}

 initializeGame();







