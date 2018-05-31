$(document).ready(function () {
    //variable declarations go here

 


    //object declarations go here
    var gameObject = {
        name: "Trivia Game",
        totalWins: 0,
        totalLosses: 0,
        menu: true,
        difficulty: 2, //by default this is hard.  There are no tries nor are there hints.  This was done to get a minimally viable program
        questionsObject : [
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
        }
    };
        //BY DEFAULT THE MENU IS DISPLAYED
        gameObject.loadGame();
        

        //These are the events & navigation + logic of the title screen.
        //THIS IS FOR THE DELAY AFTER THE BUTTON TO PLAY A SOUND AND ANIMATE A STATUS
        var hasClicked = false;

        if(hasClicked === false){
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
                hasClicked = true;
                setTimeout(function () {
                    gameObject.receiveQuestion();
                }, 2000);
            
            });
        }
         
            
            
        



        //The quesiton screen navigation & events


        $('#menu-button').click(function (){
            gameObject.loadGame();
        });
        


        //answer navigation
        $('#answer-keep-going').click(function(){
            gameObject.receiveQuestion();
        });

        $('#answer-menu-backout').click(function(){
            gameObject.loadGame();
        });

        
});