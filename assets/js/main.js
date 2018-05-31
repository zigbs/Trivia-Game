$(document).ready(function () {

    //object declarations go here
    var gameObject = {
        name: "Trivia Game",
        totalWins: 0,
        totalLosses: 0,
        winRate: 0,
        lossRate: 0,
        hintsLeft: 0, //This is by default for hard mode
        triesLeft: 0, //This is also by default for hard mode
        totalHints: 0,  //This is the tally for the # of hints that they use throughtout the game
        totalTries: 0,  //This is the tally for the # of total tries that the user uses in a round of play
        menu: true,
        lastAnswerTruth: false,
        lastAnswerValue: " ",
        hasClicked: false,
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
                question: "Which race is NOT a Vulcanoid?",
                answers: ["Garidian", "Vulcan", "Romulan", "Vorta"],
                correct: "Vorta",
                hints: ["Not from the Alpha or Beta Quadrants", "Affiliated with Dominion command positions"],
            }
        ],
        resetVariables: function () {
            this.totalWins = 0;
            this.totalLosses = 0;
            this.triesLeft = 0;
        },
        mainMenuLoad: function () {
            this.resetVariables();
        },
        loadGame: function () {
            $('#main-menu').show();
            $('#receive-question').hide();
            $('#result').hide();
            this.mainMenuLoad();
        },
        loadHintTry: function () {
            if (this.difficulty === 2) {
                $('#hint-button-1').empty();
                $('#hint-button-2').empty();
            }
            if (this.difficulty === 1) {
                var htmlString = '<button type="button" class="btn btn-warning" id="hint-button-1">Hint 1</button>';
                $('#hint-button-1').empty().append(htmlString);
                $('#hint-button-2').empty();
            }
            if (this.difficulty === 0) {
                var htmlString = '<button type="button" class="btn btn-warning" id="hint-button-1">Hint 1</button>';
                var htmlString2 = '<button type="button" class="btn btn-warning" id="hint-button-2">Hint 2</button>';
                $('#hint-button-1').empty().append(htmlString);
                $('#hint-button-2').empty().append(htmlString2);
            }
        },
        outputInfo: function () {
            var questionArray = gameObject.questionsObject.length;
            console.log(questionArray + ' Is the length of question Array ');
            var randomize = Math.floor(Math.random() * questionArray);
            console.log(randomize + " is the random value selected");
            console.log(this.questionsObject[randomize].hints[0]);

            

            


            var htmlString = '<h1>' + this.questionsObject[randomize].question + '</h1>';
            var hintsRemString = gameObject.hintsLeft;
            $('#hints-remaining').empty().append('There are ' + hintsRemString +' hints left.');

            //HERE IS WHERE THE QUESTIONS SPIT OUT
            $('#question').empty().append(htmlString);
            //IF THE MENU BUTTON IS CLICKED -> MAIN MENU
            $('#menu-button').click(function () {
                gameObject.loadGame();
            });
            //OUTPUT ALL 4 ANSWERS TO THE USER
            var AnswerAString = '<button type="button" class="btn btnans btn-lg btn-success" value="' + this.questionsObject[randomize].answers[0] + '">' + this.questionsObject[randomize].answers[0] + '</button>';
            $('#answer-a').empty().append(AnswerAString);
            var AnswerBString = '<button type="button" class="btn btnans btn-lg btn-success" value="' + this.questionsObject[randomize].answers[1] + '">' + this.questionsObject[randomize].answers[1] + '</button>';
            $('#answer-b').empty().append(AnswerBString);
            var AnswerCString = '<button type="button" class="btn btnans btn-lg btn-success" value="' + this.questionsObject[randomize].answers[2] + '">' + this.questionsObject[randomize].answers[2] + '</button>';
            $('#answer-c').empty().append(AnswerCString);
            var AnswerDString = '<button type="button" class="btn btnans btn-lg btn-success" value="' + this.questionsObject[randomize].answers[3] + '">' + this.questionsObject[randomize].answers[3] + '</button>';
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
                if (gameObject.hintsLeft > 0){
                $('#first-hint').show();
                    gameObject.updateHints();
                }
            });
            //HINT BUTTON 2 ON CLICK EVENT
            $('#hint-button-2').click(function () {
                if (gameObject.hintsLeft > 0){
                $('#second-hint').show();
                    gameObject.updateHints();
            }
            });

            //IF ONE OF THE ANSWER BUTTONS HAS BEEN CLICKED
            $('.btnans').click( function () {
                var getAnswerValue = $(this).attr("value");
                console.log(getAnswerValue);
                
                var correctAnswer = gameObject.questionsObject[randomize].correct;
                console.log(correctAnswer);
                var lastQuestion = gameObject.questionsObject[randomize].question;
                
                //IF THE ANSWER CLICKED IS TRUE
                if(getAnswerValue === correctAnswer) {
                    setTimeout(function () {
                        gameObject.giveAnswer(true, lastQuestion, correctAnswer, getAnswerValue);
                    }, 500);
                //IF THE ANSWER CLICKED IS FALSE    
                } else if(getAnswerValue !== correctAnswer) {                   
                    setTimeout(function () {
                        gameObject.giveAnswer(false, lastQuestion, correctAnswer, getAnswerValue);
                    }, 500);
                }
                else {
                    setTimeout(function () {
                    gameObject.giveAnswer(false, lastQuestion, correctAnswer, getAnswerValue);
                }, 6000); 
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
            this.loadHintTry();
            this.outputInfo();
        },
        updateHints: function () {
            gameObject.hintsLeft -= 1;
            console.log(gameObject.hintsLeft);
            gameObject.totalHints++;
            console.log("You user have used a total of" + gameObject.totalHints + "hints");
            var hintsRemString1 = gameObject.hintsLeft;
            $('#hints-remaining').empty().append('There are ' + hintsRemString1 +' hints left.');
        },
        giveAnswer: function (questionTruth, question, answer, userpick) {
            $('#main-menu').hide();
            $('#result').show();
            $('#receive-question').hide();

            console.log(question + ": is the question at play");
            console.log(questionTruth + "...Was the question right?")
            var theAnswerString = '<h2>' + question + '</h2>';
            var theAnswerString2 = '<h2>The answer was: ' + answer + '</h2>';
            var theAnswerString3 = '<h3>You picked: ' + userpick + '</h2>';
            $('#the-answer').empty().append(theAnswerString).append(theAnswerString2).append(theAnswerString3);


            if(questionTruth === true){
                console.log(gameObject.lastAnswerTruth + ' : answer to the previous question');
                var answerString = '<h1>The Question was correct!</h1>';
                $('#the-result').empty().append(answerString);

            } else if(questionTruth === false){
                console.log(gameObject.lastAnswerTruth + ' : answer to the previous question');
                var answerString2 = '<h1>The Question was WRONG!</h1>';
                $('#the-result').empty().append(answerString2);
                
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