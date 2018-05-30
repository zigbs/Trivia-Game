$(document).ready(function () {
    //variable declarations go here

 


    //object declarations go here
    var gameObject = {
        name: "Trivia Game",
        totalWins: 0,
        totalLosses: 0,
        questionsObject = [
            { question: "What is the thing we all like to do-dahd?",
              answers: ["answer A", "Answer B", "Answer C", "Answer D"],
              correct: "Answer D",
              hints: ["Hint # 1 is this", "Hint #2 is this"]  },
            
            { question: "What is the thing we all like to two-dahd?",
              answers: ["answer A", "Answer B", "Answer C", "Answer D"],
              correct: "Answer B",
              hints: ["Hint # 1 is this", "Hint #2 is this"]  },
            
            { question: "What is the thing we all like to three-dahd?",
              answers: ["answer A", "Answer B", "Answer C", "Answer D"],
              correct: "Answer C",
              hints: ["Hint # 1 is this", "Hint #2 is this"]  }
            ],
        mainMenuLoad: function () {
            //$('#game-container').empty();
            //other function which zeroizes the variables
            $('#game-container').append('<div class="container" id="main-menu">');
            $('#game-container').append('<div class="container" id="title-container">');
            $('#game-container').append('<div class="row" id="title-row">');
            $('#game-container').append('<div class="col-md-3"></div><div class="col-md-6"><h1>Trivia Application!</h1></div><div class="col-md-3"></div></div>');
            $('#game-container').append('<div class="row" id="difficulty-select">');
            $('#game-container').append('<div class="col-md-3"></div><div class="col-md-6"><div class="row diff-select" id="easy-select" style="background: green;">Easy</div><br><div class="row diff-select" id="medium-select" style="background: yellow;">Medium</div><br><div class="row diff-select" id="hard-select" style="background: red;">Hard</div><br></div><div class="col-md-3"></div></div>');
            $('#game-container').append('<div class="row" id="portfolio-tiles">');
            $('#game-container').append('</div><div class="col-md-2"></div><div class="col-md-2">IN</div><div class="col-md-2">github</div><div class="col-md-2">slides</div><div class="col-md-2">projects</div><div class="col-md-2"></div></div>');
            $('#game-container').append('</div>'); // closing div tag
            return;
        },
        receiveQuestion: function () {
            //$('#game-container').empty();
            $('#game-container').append('<div class="container" id="receive-question">'); //container setup
            $('#game-container').append('<div class="row" id="top-nav-bar" style="background: #DDDDDD;">');
            $('#game-container').append('<div class="row" id="top-nav-row">');
            $('#game-container').append('<div class="col-sm-4" id="questions-completed"># Questions Completed</div><div class="col-sm-4" id=""></div><div class="col-sm-4" id="hints-remaining"># Hints Remaining</div></div><div class="row" id="bottom-nav-row"><div class="col-sm-4" id="questions-failed"># Questions Failed</div><div class="col-sm-4"></div><div class="col-sm-4" id="tries-left"># Tries Left</div></div></div>');
            $('#game-container').append('<div class="row" id="question-row" style="min-height:10%">');
            $('#game-container').append('<div class="col-sm-4"></div><div class="col-lg-4" id="question"><h1>What is the basic Romulan of the vortex?</h1></div><div class="col-sm-4"></div></div>');
            $('#game-container').append('<div class="row" id="hints-row">');
            $('#game-container').append('<div class="row" id="hint-num-1">');
            $('#game-container').append('<div class="col-md-4"></div><div class="col-md-4" id="first-hint">This is your first very huge big hint that I dont even think you should have.<br></div><div class="col-md-4"></div></div><div class="row" id="hint-num-2"><div class="col-md-4"></div><div class="col-md-4" id="second-hint">This is such a huge hint that we are basically giving the question away to you, you piece of trash.<br></div><div class="col-md-4"></div></div></div>');
            $('#game-container').append('<div class="row" id="user-input">');
            $('#game-container').append('<div class="row" class="answer-button">');
            $('#game-container').append('<div class="col-sm-2"></div><div class="col-sm-4" id="answer-a"><button type="button" class="btn btn-lg btn-success">Answer A</button></div><div class="col-sm-4" id="answer-c"><button type="button" class="btn btn-lg btn-success">Answer C</button></div><div class="col-sm-2"></div></div>');
            $('#game-container').append('<div class="row" class="answer-button">');
            $('#game-container').append('<div class="col-sm-2"></div><div class="col-sm-4" id="answer-b"><button type="button" class="btn btn-lg btn-success">Answer B</button></div><div class="col-sm-4" id="answer-d"><button type="button" class="btn btn-lg btn-success">Answer D</button></div><div class="col-sm-2"></div></div></div>');
            $('#game-container').append('</div>');  // closing div tag
            //output questions, answers, etc to the console
            //input -> wrong or right, lack of time -> wrong
            //difficulty levels: tries & hints
            return;
        },
        giveAnswer: function () {
            //$('#game-container').empty();
            $('#game-container').append('<div class="container" id="result">'); //container setup
            $('#game-container').append('<div class="row" id="result-row">');
            $('#game-container').append('<div class="col-sm-3"></div><div class="col-lg-6" id="the-result"><h1>The Question was correct!</h1></div><div class="col-sm-3"></div></div>');
            $('#game-container').append('<div class="row" id="answer-result">');
            $('#game-container').append('<div class="col-sm-3"></div><div class="col-lg-6" id="the-answer" style="background: lightgreen;">The Answer</div><div class="col-sm-3"></div></div>');
            $('#game-container').append('<div class="row" id="user-stats">');
            $('#game-container').append('<div class="row" id="user-stats-row-1">');
            $('#game-container').append('<div class="col-sm-3"></div><div class="col-sm-3"># Incorrect</div><div id="question-rate" class="col-sm-3">Question Rate</div><div class="col-sm-3"></div></div><div class="row" id="user-stats-row-2"><div class="col-sm-3"></div><div class="col-sm-3"># Correct</div><div class="col-sm-3">Answer Rate</div><div class="col-sm-3"></div></div></div>');
            $('#game-container').append('<div class="row" id="user-feedback">');
            $('#game-container').append('<div class="col-sm-3"></div><div class="col-sm-3"><button type="button" class="btn btn-md btn-warning">Menu</button></div><div class="col-sm-3"><button type="button" class="btn btn-md btn-success">Keep Going!</button></div><div class="col-sm-3"></div></div>');
            $('#game-container').append('</div>');  //closing div tag
                //output the correct answer
                //output
                //listen for clicks on next or menu, if next -> quesoitns, if menu ->
            return;
        }
    }


     //if then else if case switch logic
    //game loading type functions
    gameObject.receiveQuestion();


    //$('#game-container').append('');

});