$(document).ready(function () {
    //variable declarations go here

 


    //object declarations go here
    var gameObject = {
        name: "Trivia Game",
        totalWins: 0,
        totalLosses: 0,
        menu: true,
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
        resetVariables: function () {
            this.totalWins = 0;
            this.totalLosses = 0;
        },
        mainMenuLoad: function () {
            $('#game-container').empty();
            resetVariables();
            

        },
        receiveQuestion: function () {
            
            
        },
        giveAnswer: function () {
            
            
        }
    };

    if (gameObject.menu === true) {
        $('#receive-result').hide();
        $('#result').hide();
        $('#main-menu').show();
    }
   
  




});