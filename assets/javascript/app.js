//object questions contains all the questions for the app
////question contains string
////choices is an array of answer choices
////answer is the index of the correct answer
var questions = [
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

var q = undefined;
var answered = 0;
var correct = 0;
var incorrect = 0;
var completed = false;
var answer = undefined;
var game = $('#game');

//displays beginning game message 
//adds a button that starts the game
function initializeGame () {
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
    q = questions.pop();

    timer   
        .addClass('display-4 text-center mb-4')
        .attr('id', 'timer')
        .html('00:10');
    question
        .addClass('text-center m-4')
        .html(`<h3>${q.question}</h3>`);
    choices
        .addClass('text-center')
        .html(`
            <form>
            <input type="radio" name="choice" value="0"><span class="radio-text">${q.choices[0]}</span><br>
            <input type="radio" name="choice" value="1"><span class="radio-text">${q.choices[1]}</span><br>
            <input type="radio" name="choice" value="2"><span class="radio-text">${q.choices[2]}</span><br>
            <input type="radio" name="choice" value="3"><span class="radio-text">${q.choices[3]}</span><br>
            </form>
            `);
    submit
        .attr('id', 'submit')
        .addClass('btn btn-lg btn-primary m-4')
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
        $('#timer').html('00:0' + counter);
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

    var alert = $('<div>');
    var result = $('<h2>');
    var correctAnswer = $('<div>');
    var score = $('<div>');

    $('#game').empty();
    alert.addClass('alert');
    
    
    correctAnswer
        .addClass('text-center p-4')
        .append('<h3> The correct answer is...</h3>')
        .append(`<p> ${q.choices[q.answer]}</p>`);

    if (answer === undefined) {
        incorrect++;
        result
            .html('Incorrect...Too slow!')
        alert
            .append(result)
            .append(correctAnswer);
    }else if(answer === q.answer){
        correct++;
        answered++;
        result
            .html('That was correct...lucky guess!')
        alert
            .append(result)
            .append(correctAnswer);

    }else if(answer !== q.answer){
        incorrect++;
        answered++;
        result
            .html('HA! Incorrect...I guess you don\'t know everything after all!')
        alert
            .append(result)
            .append(correctAnswer);
    }
    game.append(alert);
    console.log(questions);
    console.log('questions remaining: ', questions.length);
    
    setTimeout(() => {
        if(questions.length === 0){
            alert.empty();
            alert.append('<h1>Game Over!</h1>');
            results();
        }else{
            loadQuestion(timer());
            submitAnswer();
        }
    }, 2000);

    //calculates results and appends at gameover
    //display answered
    //display correct
    //display incorrect
    //display percentage
    function results() {
        var percent = (correct/5) * 100;
        var answeredDiv = $('<div>');
        var correctDiv = $('<div>');
        var incorrectDiv = $('<div>');
        var percentDiv = $('<div>');

        answeredDiv
            .append(answered);
        correctDiv
            .append(correct);

        incorrectDiv
            .append(incorrect);

        percentDiv
            .append(percent + '%');

        alert
            .append(answeredDiv)
            .append(correctDiv)
            .append(incorrectDiv)
            .append(percentDiv);

    }
}

 initializeGame();







