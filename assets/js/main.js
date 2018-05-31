$(document).ready(function () {
    //variable declarations go here

 


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
        hasClicked : false,
        difficulty: 2, //by default this is hard.  There are no tries nor are there hints.  This was done to get a minimally viable program
        questionsObject : [
            { question: "Who made first contact with Earth?",
              answers: ["Vulcans", "Romulans", "Klingons", "The Breen"],
              correct: "Vulcans",
              hints: ["Logic defines them", "Live long and prosper"]  },
            
            { question: "Where do the Maqui live?",
              answers: ["Bajor", "The Badlands", "Cardassia", "Earth"],
              correct: "The Badlands",
              hints: ["A desert wasteland", "Land that nobody wanted"]  },
            
              { question: "What color is Vulcan blood?",
              answers: ["Green", "Red", "Magenta", "Sky Blue"],
              correct: "Green",
              hints: ["Not normal", "Reminds you of a bug"]  },

              { question: "What do the Borg always say?",
              answers: ["Resistance is Futile", "Live Long and Prosper", "To Romulus!", "Cooperation is Key"],
              correct: "Resistance is Futile",
              hints: ["A subtle message", "You should not try it"]  },

            { question: "Which race is NOT a Vulcanoid?",
              answers: ["Garidian", "Vulcan", "Romulan", "Vorta"],
              correct: "Vorta",
              hints: ["Not from the Alpha or Beta Quadrants", "Affiliated with Dominion command positions"]  }
            ],
        resetVariables: function () {
            this.totalWins = 0;
            this.totalLosses = 0;
        },
        mainMenuLoad: function () {
            //$('#game-container').empty();
            this.resetVariables();
        },
        receiveQuestion: function () {
            $('#main-menu').hide();
            $('#result').hide();
            $('#receive-question').show();
            this.loadHintTry();
            this.outputInfo();
        },
        giveAnswer: function () {
            $('#main-menu').hide();
            $('#result').show();
            $('#receive-question').hide();
            
        },
        loadGame: function () {
            $('#main-menu').show();
            $('#receive-question').hide();
            $('#result').hide();
            this.mainMenuLoad();
        },
        loadHintTry: function () {
            
            
            if(this.difficulty === 2){
                
                $('#first-hint').hide();
                $('#second-hint').hide();
                $('#hint-button-1').hide();
                $('#hint-button-2').hide();

            } else if(this.difficulty === 1){
                var htmlString = '<button type="button" class="btn btn-warning" id="hint-button-1">Hint 1</button>';
                $('#first-hint').hide();
                $('#hint-button-1').empty().show().append(htmlString);
                $('#second-hint').hide();
                $('#hint-button-2').empty();
            } else if(this.difficulty === 0){
                var htmlString2 = '<button type="button" class="btn btn-warning" id="hint-button-2">Hint 2</button>';
                $('#second-hint').show();
                $('#hint-button-2').empty().show().append(htmlString2);
            }
        },
        outputInfo: function () {
            var randomize = Math.floor(Math.random() * 5);
            console.log(randomize);
            
            var htmlString = '<h1>' + this.questionsObject[randomize].question + '</h1>';
            
            //HERE IS WHERE THE QUESTIONS SPIT OUT
            $('#question').empty().append(htmlString);
                     
            var AnswerAString = '<button type="button" class="btn btn-lg btn-success" value="' + this.questionsObject[randomize].answers[0] + '">' + this.questionsObject[randomize].answers[0] + '</button>';
            $('#answer-a').empty().append(AnswerAString);
            var AnswerBString = '<button type="button" class="btn btn-lg btn-success value="' + this.questionsObject[randomize].answers[1] + '">' + this.questionsObject[randomize].answers[1] + '</button>';
            $('#answer-b').empty().append(AnswerBString);
            var AnswerCString = '<button type="button" class="btn btn-lg btn-success" value="' + this.questionsObject[randomize].answers[2] + '">' + this.questionsObject[randomize].answers[2] + '</button>';
            $('#answer-c').empty().append(AnswerCString);
            var AnswerDString = '<button type="button" class="btn btn-lg btn-success" value="' + this.questionsObject[randomize].answers[3] + '">' + this.questionsObject[randomize].answers[3] + '</button>';
            $('#answer-d').empty().append(AnswerDString);
        },
        checkMenuClicks: function () {
            if(gameObject.hasClicked === false){
                $('#easy-select').click(function (){
    
                    gameObject.difficulty = 0;
                    console.log(gameObject.difficulty);
                });
                $('#medium-select').click(function (){
    
                    gameObject.difficulty = 1;
                    console.log(gameObject.difficulty);
                });
                $('#hard-select').click(function (){
                    
                    gameObject.difficulty = 2;
                    console.log(gameObject.difficulty);
                });
                $('.diff-select').click(function (){
                    gameObject.hasClicked = true;
                    setTimeout(function () {
                        gameObject.receiveQuestion();
                    }, 2000);
                
                });
            }
        }
    };
        //BY DEFAULT THE MENU IS DISPLAYED
        gameObject.loadGame();
        

        //These are the events & navigation + logic of the title screen.
        //THIS IS FOR THE DELAY AFTER THE BUTTON TO PLAY A SOUND AND ANIMATE A STATUS
        
        //IF THE USER HAS NOT ALREADY CLICKED.  WHEN THEY CLICK THEIR CHOICE IS LOCKED IN.
        gameObject.checkMenuClicks();
         
            
        
        



        //The quesiton screen navigation & events


        $('#menu-button').click(function (){
            gameObject.loadGame();
        });
        
        $('#first-hint').hide();
        $('#second-hint').hide();

        

        
        



        //answer navigation
        $('#answer-keep-going').click(function(){
            gameObject.receiveQuestion();
        });

        $('#answer-menu-backout').click(function(){
            gameObject.loadGame();
        });

        
});