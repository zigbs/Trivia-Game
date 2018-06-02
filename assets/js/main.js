$(document).ready(function () {

    var gameObject = {
        name: "Trivia Game",
        creator: "Tyler Dylan Brown",
        dogName: 'Pubbs',
        totalWins: 0,
        totalLosses: 0,
        winRate: 0,
        lossRate: 0,
        hintsLeft: 0, //This is by default for hard mode
        triesLeft: 0, //This is also by default for hard mode
        totalHints: 0,  //This is the tally for the # of hints that they use throughtout the game
        totalTries: 0,  //This is the tally for the # of total tries that the user uses in a round of play
        answerClicked: false,
        levelTimer: 0,
        menu: true,
        lastAnswerTruth: false,
        lastAnswerValue: " ",
        hasClicked: false,
        lastQuestion: " ",
        lastAnswer: " ",
        difficulty: 2, //by default this is hard.  There are no tries nor are there hints.  This was done to get a minimally viable program
        questionsObject: [
            {
                question: "Who made first contact with Earth?",
                answers: ["Vulcans", "Romulans", "Klingons", "The Breen"],
                correct: "Vulcans",
                hints: ["Logic defines them", "Live long and prosper"],
            },

            {
                question: "Where are the Maqui homelands?",
                answers: ["Bajor", "The Badlands", "Cardassia", "Earth"],
                correct: "The Badlands",
                hints: ["A desert wasteland", "Land that nobody wanted near Cardassia"],
            },

            {
                question: "What color is Vulcan blood?",
                answers: ["Green", "Red", "Magenta", "Sky Blue"],
                correct: "Green",
                hints: ["Not Human-like at all", "Reminds you of a bug"],
            },

            {
                question: "What do the Borg always say?",
                answers: ["Resistance is Futile", "Live Long and Prosper", "To Romulus!", "Cooperation is Key"],
                correct: "Resistance is Futile",
                hints: ["A subtle message", "You should not try it"],
            },

            {
                question: "Which quadrant are the Founders from?",
                answers: ["Alpha", "Beta", "Delta", "Gamma"],
                correct: "Gamma",
                hints: ["Not from the Alpha or Beta Quadrants", "Nowhere near the USS Voyager"],
            },

            {
                question: "What style government do the Breen use?",
                answers: ["Confederation", "High Council", "Senate", "Federation"],
                correct: "Confederation",
                hints: ["Canada has this style of government", "This is NOT a throw-back to the American South"],
            },

            {
                question: "Where are the Ferengi from?",
                answers: ["Q'o'nos", "Remus", "Romulus", "Feringinar"],
                correct: "Feringinar",
                hints: ["They are perpetually neutral", "They're known for their lobes and trade"],
            }
        ],
        setupBackground: function () {
            var randomBG = Math.floor((Math.random() * 9) + 1);
            console.log(randomBG + ' this is the random background #');
            var backgroundString = "assets/bg/0" + randomBG + ".jpg";
            console.log(backgroundString);
            $('body').css("background-image", "url(" + backgroundString + ")");
        },
        resetVariables: function () {
            this.totalWins = 0;
            this.totalLosses = 0;
            this.triesLeft = 0;
            this.levelTimer = 20;
            this.answerClicked = false;
        },
        mainMenuLoad: function () {
            this.resetVariables();
        },
        loadGame: function () {
            $('#main-menu').show();
            $('#receive-question').hide();
            $('#result').hide();
            gameObject.setupBackground();
            this.mainMenuLoad();
            //INSERT MENU HERE
            var menuString1 = '<div class="container" id="main-menu"><div class="container" id="title-container"><div class="row" id="title-row"><div class="col-md-3"></div><div class="col-md-6 title-class"><h1 class="trivia-title">Trivia Application!</h1></div><div class="col-md-3"></div></div>';
            var menuString2 = '<div class="row" id="difficulty-select"><div class="col-md-3"></div><div class="col-md-6"><div class="row diff-select" id="easy-select"><button type="button" class="btn btn-lg diff-button btn-success"><h1>Easy: 2 hints, 2 tries</h1></button></div><br><div class="row diff-select" id="medium-select"><button type="button" class="btn btn-lg diff-button btn-warning"><h1>Medium: 1 hint, 1 try</h1></button></div><br><div class="row diff-select" id="hard-select"><button type="button" class="btn btn-lg diff-button btn-danger"><h0>Hard</h0></button></div><br></div><div class="col-md-3"></div></div>';
            var menuString3 = '<div class="row" id="portfolio-tiles"></div><div class="col-md-2"></div><div class="col-md-2"><a href="https://www.linkedin.com" target="_new"><img id="linkedin-button" class="portfolio-btn"  src="assets/img/in.png" height="75" width="75"></a></div><div class="col-md-2"><a href="https://www.github.com/zigbs" target="_new"><img id="github-button" class="portfolio-btn" src="assets/img/github.png" height="75" width="75"></a></div><div class="col-md-2"><a href="https://wwww.slideshare.net" target="_new"><img class="portfolio-btn"  id="slideshare-button" src="assets/img/share.png" height="75" width="75"></a></div><div class="col-md-2"><a href="mailto:zigbs.zigbs@gmail.com"><img class="portfolio-btn"  id="email-button" src="assets/img/email.png" height="75" width="75"></a></div><div class="col-md-2"></div></div></div>';
            $('#game-container').empty().append(menuString1).append(menuString2).append(menuString3);
        },
        loadHintTry: function () {
            if (this.difficulty === 2) {
                $('#hint-button-1').empty();
                $('#hint-button-2').empty();
            }
            if (this.difficulty === 1) {
                var htmlString = '<button type="button" class="btn hint-button btn-warning" id="hint-button-1">Hint 1</button>';
                $('#hint-button-1').empty().append(htmlString);
                $('#hint-button-2').empty();
            }
            if (this.difficulty === 0) {
                var htmlString = '<button type="button" class="btn hint-button btn-lg btn-warning" id="hint-button-1">Hint 1</button>';
                var htmlString2 = '<button type="button" class="btn hint-button btn-lg btn-warning" id="hint-button-2">Hint 2</button>';
                $('#hint-button-1').empty().append(htmlString);
                $('#hint-button-2').empty().append(htmlString2);
            }
        },
        updateWinsLosses: function () {
            var winsString = gameObject.totalWins;
            var lossString = gameObject.totalLosses;
            $('#questions-completed').empty().append(winsString + ' Total Wins');
            $('#questions-failed').empty().append(lossString + ' Total Losses');
            $('#correct-questions').empty().append(winsString + ' Total Wins');
            $('#incorrect-questions').empty().append(lossString + ' Total Losses');
        },
        outputInfo: function () {
            var questionArray = gameObject.questionsObject.length;
            console.log(questionArray + ' Is the length of question Array ');
            var randomize = Math.floor(Math.random() * questionArray);
            console.log(randomize + " is the random value selected");
            gameObject.updateWinsLosses();

            var levelTimer = Math.round(((20000 / (gameObject.difficulty + 1)) / 1000));
            console.log('LEVEL TIMER' + gameObject.levelTimer + " Seconds");
            //INITIAL TIMER SETUP

            //We call this function so we can begin subtracting from it. 

            /*if (levelTimer > 0 && gameObject.answerClicked === false) {
                console.log(levelTimer + " level Timer test");
                setTimeout(function () {
                    console.log("Inside the Timeout");
                    for (var j = levelTimer; j > 0; j--) {
                        levelTimer--;
                        console.log(levelTimer + " seconds are left in the round")
                        var timerString = "<h3>" + levelTimer + " seconds left</h3>";
                        $('#level-timer').empty().append(timerString);
                    }
                }, 1000);

            } */

            $('#level-timer').empty().append(levelTimer + " Seconds");

            var count = levelTimer;

            var counter = setInterval(timer, 1000); //1000 will  run it every 1 second

            function timer() {
                count -= 1;
                if (count <= 0) {
                    clearInterval(counter);
                        $('#level-timer').empty().append("time is up!");
                        if(gameObject.answerClicked !== true){
                            gameObject.totalLosses++;
                            gameObject.giveAnswer(false, " ", " ", "I can't believe you didn't even guess.");
                            gameObject.updateWinsLosses();
                        }
                    //counter ended, do something here
                    return;
                }
                var varStringTransfer = "<h4>" + count + "</h4>";
                $('#level-timer').empty().append(varStringTransfer + " Seconds");
                
            }


            var htmlString = '<h1>' + this.questionsObject[randomize].question + '</h1>';
            var hintsRemString = gameObject.hintsLeft;
            $('#hints-remaining').empty().append('There are ' + hintsRemString + ' hints left.');
            //HERE IS WHERE THE QUESTIONS SPIT OUT
            $('#question').empty().append(htmlString);
            //IF THE MENU BUTTON IS CLICKED -> MAIN MENU
            $('#menu-button').click(function () {
                gameObject.loadGame();
            });
            //OUTPUT ALL 4 ANSWERS TO THE USER
            var AnswerAString = '<button type="button" class="btn btnans btn-lg btn-success" value="' + this.questionsObject[randomize].answers[0] + '"><h1>' + this.questionsObject[randomize].answers[0] + '</h1></button>';
            $('#answer-a').empty().append(AnswerAString);
            var AnswerBString = '<button type="button" class="btn btnans btn-lg btn-success" value="' + this.questionsObject[randomize].answers[1] + '"><h1>' + this.questionsObject[randomize].answers[1] + '</h1></button>';
            $('#answer-b').empty().append(AnswerBString);
            var AnswerCString = '<button type="button" class="btn btnans btn-lg btn-success" value="' + this.questionsObject[randomize].answers[2] + '"><h1>' + this.questionsObject[randomize].answers[2] + '</h1></button>';
            $('#answer-c').empty().append(AnswerCString);
            var AnswerDString = '<button type="button" class="btn btnans btn-lg btn-success" value="' + this.questionsObject[randomize].answers[3] + '"><h1>' + this.questionsObject[randomize].answers[3] + '</h1></button>';
            $('#answer-d').empty().append(AnswerDString);
            //THIS CLEARS EVERYTHING OUT SO THAT WE HAVE CLEAN HINTS
            $('#first-hint').empty();
            $('#second-hint').empty();
            var Hint1String = "HINT #1  " + gameObject.questionsObject[randomize].hints[0];
            console.log(Hint1String);
            $('#first-hint').hide().append(Hint1String);
            var Hint2String = "HINT #2  " + gameObject.questionsObject[randomize].hints[1];
            $('#second-hint').hide().append(Hint2String);
            console.log(Hint2String);
            //HINT BUTTON 1 ON CLICK EVENT
            $('#hint-button-1').click(function () {
                if (gameObject.hintsLeft > 0) {
                    $('#first-hint').show();
                    gameObject.updateHints();
                }
            });
            //HINT BUTTON 2 ON CLICK EVENT
            $('#hint-button-2').click(function () {
                if (gameObject.hintsLeft > 0) {
                    $('#second-hint').show();
                    gameObject.updateHints();
                }
            });

            //IF ONE OF THE ANSWER BUTTONS HAS BEEN CLICKED
            $('.btnans').click(function () {
                var getAnswerValue = undefined;
                var getAnswerValue = $(this).attr("value");

                gameObject.answerClicked = true;
                console.log(getAnswerValue);
                var correctAnswer = gameObject.questionsObject[randomize].correct;
                console.log(correctAnswer);
                var lastQuestion = gameObject.questionsObject[randomize].question;
                console.log(lastQuestion);
                //IF THE ANSWER CLICKED IS TRUE
                if (getAnswerValue === correctAnswer) {
                    setTimeout(function () {
                        gameObject.totalWins++;
                        gameObject.giveAnswer(true, lastQuestion, correctAnswer, getAnswerValue);
                        gameObject.updateWinsLosses();
                    }, 500);
                    //IF THE ANSWER CLICKED IS FALSE    
                } else if (getAnswerValue !== correctAnswer) {
                    setTimeout(function () {
                        gameObject.totalLosses++;
                        gameObject.giveAnswer(false, lastQuestion, correctAnswer, getAnswerValue);
                        gameObject.updateWinsLosses();
                    }, 500);
                } else { //nothing follows                    
                }
            });
        },
        checkMenuClicks: function () {
            $('#easy-select').click(function () {
                gameObject.difficulty = 0;
                console.log(gameObject.difficulty);
                gameObject.hintsLeft = 2;
            });
            $('#medium-select').click(function () {
                gameObject.difficulty = 1;
                console.log(gameObject.difficulty);
                gameObject.hintsLeft = 1;
            });
            $('#hard-select').click(function () {
                gameObject.difficulty = 2;
                console.log(gameObject.difficulty);
                gameObject.hintsLeft = 0;
            });
            $('.diff-select').click(function () {
                gameObject.hasClicked = true;
                setTimeout(function () {
                    gameObject.receiveQuestion();
                }, 2000);
            });
        },
        receiveQuestion: function () {
            $('#main-menu').hide();
            $('#result').hide();
            $('#receive-question').show();
            gameObject.answerClicked = false;
            //INSERT QUESTION
            var receiveHTML1 = '<div class="container" id="receive-question"><div class="row" id="top-nav-bar" style="background: #DDDDDD;"><div class="row" id="top-nav-row"><div class="col-sm-4" id="questions-completed"># Questions Completed</div><div class="col-sm-4" id="menu-button"><button type="button" class="btn btn-md btn-primary">Menu</button></div><div class="col-sm-4" id="hints-remaining"># Hints Remaining</div></div><div class="row" id="bottom-nav-row"><div class="col-sm-4" id="questions-failed"># Questions Failed</div><div class="col-sm-4" id="level-timer">TIMER</div><div class="col-sm-4" id="tries-left"># Tries Left</div></div></div>';
            var receiveHTML2 = '<div class="row" id="question-row" style="min-height:10%"><div class="col-sm-4"></div><div class="col-lg-4" id="question"></div><div class="col-sm-4"></div></div><div class="row" id="hints-row"><div class="row" id="hint-num-1"><div class="col-md-4"></div><div class="col-md-4"><div class="row" id="hint-button-1"></div><div class="row" id="first-hint"></div><br></div><div class="col-md-4"></div></div><div class="row" id="hint-num-2"><div class="col-md-4"></div><div class="col-md-4"><div class="row" id="hint-button-2"><button type="button" class="btn btn-warning" id="hint-button-2">Hint 2</button></div><div class="row" id="second-hint"></div><br></div><div class="col-md-4"></div></div>';
            var receiveHTML3 = '</div><div class="row" id="user-input"><div class="row" class="answer-button"><div class="col-sm-2"></div><div class="col-sm-4" class="answer-button" id="answer-a"></div><div class="col-sm-4" class="answer-button" id="answer-c"></div><div class="col-sm-2"></div></div><div class="row"><div class="col-sm-2"></div><div class="col-sm-4" class="answer-button" id="answer-b"></div><div class="col-sm-4" class="answer-button" id="answer-d"></div><div class="col-sm-2"></div></div></div></div>';
            $('#game-container').empty().append(receiveHTML1).append(receiveHTML2).append(receiveHTML3);
            this.loadHintTry();
            this.outputInfo();
        },
        updateHints: function () {
            gameObject.hintsLeft -= 1;
            console.log(gameObject.hintsLeft);
            gameObject.totalHints++;
            console.log("You user have used a total of" + gameObject.totalHints + "hints");
            var hintsRemString1 = gameObject.hintsLeft;
            $('#hints-remaining').empty().append('There are ' + hintsRemString1 + ' hints left.');
        },
        giveAnswer: function (questionTruth, question, answer, userpick) {
            $('#main-menu').hide();
            $('#result').show();
            $('#receive-question').hide();

            //INSERT ANSWER SCREEN
            var giveAnswerHTML1 = '<div class="container" id="result"><div class="row" id="result-row"><div class="col-sm-3"></div><div class="col-lg-6" id="the-result"></div><div class="col-sm-3"></div></div><div class="row" id="answer-result"><div class="col-sm-3"></div><div class="col-lg-6" id="the-answer">The Answer</div><div class="col-sm-3"></div></div>';
            var giveAnswerHTML2 = '<div class="row" id="user-stats"><div class="row" id="user-stats-row-1"><div class="col-sm-3"></div><div class="col-sm-3 info-class" id="incorrect-questions"># Incorrect</div><div id="question-rate" class="col-sm-3 info-class">Question Rate</div><div class="col-sm-3"></div></div><div class="row" id="user-stats-row-2"><div class="col-sm-3"></div><div class="col-sm-3 info-class" id="correct-questions"># Correct</div><div class="col-sm-3 info-class" id="answer-rate">Answer Rate</div><div class="col-sm-3"></div></div></div>';
            var giveAnswerHTML3 = '<div class="row" id="user-feedback"><div class="col-sm-3"></div><div class="col-sm-3"><button type="button" class="btn btn-md btn-warning btn-lg btn-nav btn-menu" id="answer-menu-backout">Menu</button></div><div class="col-sm-3"><button type="button" class="btn btn-md btn-success btn-next btn-nav btn-lg" id="answer-keep-going">Keep Going!</button></div><div class="col-sm-3"></div></div></div>';
            $('#game-container').empty().append(giveAnswerHTML1).append(giveAnswerHTML2).append(giveAnswerHTML3)
            console.log(question + ": is the question at play");
            console.log(questionTruth + "...Was the question right?")
            var theAnswerString = '<h2>' + question + '</h2>';
            var theAnswerString2 = '<h2>The answer was: <strong>' + answer + '</strong></h2>';
            var theAnswerString3 = '<h3>You picked: ' + userpick + '</h2>';
            $('#the-answer').empty().append(theAnswerString).append(theAnswerString2).append(theAnswerString3);
            if (questionTruth === true) {
                console.log(gameObject.lastAnswerTruth + ' : answer to the previous question');
                var answerString = '<h1>The Question was correct!</h1>';
                $('#the-result').empty().append(answerString);
                $('#the-result').css("background-color", "lightgreen");
            } else if (questionTruth === false) {
                console.log(gameObject.lastAnswerTruth + ' : answer to the previous question');
                var answerString2 = '<h1>The Question was WRONG!</h1>';
                $('#the-result').empty().append(answerString2);
                $('#the-result').css("background-color", "red");
            }
            $('#answer-keep-going').click(function () {
                gameObject.receiveQuestion();
            });
            $('#answer-menu-backout').click(function () {
                gameObject.loadGame();
            });
        }

    };
    //BY DEFAULT THE MENU IS DISPLAYED
    gameObject.loadGame();
    gameObject.checkMenuClicks();

});