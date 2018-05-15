//object questions contains all the questions for the app
////question contains string
////choices is an array of answer choices
////answer is the index of the correct answer
var questions = [
    {
        question: 'Question 1',
        choices: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'],
        answer: 0
    },
    {
        question: 'Question 2',
        choices: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'],
        answer: 1
    },
    {
        question: 'Question 3',
        choices: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'],
        answer: 2
    },
    {
        question: 'Question 4',
        choices: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'],
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
    
    $('#start').on('click', loadQuestion);
}

function loadQuestion () {
    var timer = $('<div>');
    var question =$('<div>');
    var choices = $('<div>');
    var submit = $('<button>');
    var wrapper = $('<div>');

    game
        .empty()
        .addClass('flex-column');
    q = questions.pop();

    
    timer   
        .addClass('display-4 text-center mb-4')
        .html('00:00');
    question
        .addClass('text-center m-4')
        .html(`<h3>${q.question}</h3>`);
    choices
        .addClass('text-center')
        .html(`
            <input type="radio" name="choice0" value:"0"><span class="choice-text">${q.choices[0]}</span><br>
            <input type="radio" name="choice1" value:"0"><span class="choice-text">${q.choices[1]}</span><br>
            <input type="radio" name="choice2" value:"0"><span class="choice-text">${q.choices[2]}</span><br>
            <input type="radio" name="choice3" value:"0"><span class="choice-text">${q.choices[3]}</span><br>
        `);
    submit
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

initializeGame();



