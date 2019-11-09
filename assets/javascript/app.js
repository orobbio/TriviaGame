$(document).ready(function () {
    var answerSelect;
    var startGame = false;
    var listWord = [];
    var betweenRounds = true;
    var optionsLayout = false;
    var intervalId;
    var correct;
    var tempDiv = $("<div>");
    var round = 0;
    var wins = 0;
    var loses = 0;
    var time;
    var gif;
    var trivia = {
        0: {
            q: 'What Year is the Start of the Movie set in?',
            a: ['2025', '2002', '1985'],
            c: '2045',
            gif: "<img src='./assets/images/slide.gif'>"
        },
        1: {
            q: 'What is the Name of the Video Game Invented by James Halliday?',
            a: ['Drugs', 'Avatar', 'Battletoads'],
            c: 'OASIS',
            gif: "<img src='./assets/images/wow.gif'>"
        },
        2: {
            q: 'What was the Name Used by Gunters When Talking About IOI Employees',
            a: ['Thugs', 'The Watchmen', 'Ludites'],
            c: 'Sixers',
            gif: "<img src='./assets/images/sorento.gif'>"
        },
        3: {
            q: 'Where Does the Main Character Live?',
            a: ['Trailers Park', 'Ghetto', 'The Suburbs'],
            c: 'The Stacks',
            gif: "<img src='./assets/images/stacks.gif'>"
        },
        4: {
            q: 'What is the main characters name? ',
            a: ['Octavius', 'Peter', 'Wilson'],
            c: 'Wade',
            gif: "<img src='./assets/images/parzival.gif'>"
        },
        5: {
            q: 'Who was the Main Character in Love With ?',
            a: ['Aech', 'Daito', 'Shoto'],
            c: 'Art3mis',
            gif: "<img src='./assets/images/art3mis.gif'>"
        },
        6: {
            q: 'What does IOI stand for?',
            a: ['Integral Outline Industries', 'Input Output Input', 'Binary'],
            c: 'Inovative Online Industries',
            gif: "<img src='./assets/images/sixers.gif'>"
        },
        7: {
            q: 'What Robot Does Sorento use?',
            a: ['Gundam', 'Iron Giant', 'Statue of Liberty'],
            c: 'Mechagodzilla',
            gif: "<img src='./assets/images/mg2.gif'>"
        },
        8: {
            q: 'What did parzival drive',
            a: ['Bigfoot', 'Batmobile', 'Firefly'],
            c: 'Delorean',
            gif: "<img src='./assets/images/ride.gif'>"
        },
        9: {
            q: 'What was the Name of the Club Parzival and Art3mis Danced in ',
            a: ['Deep Space 9', 'Oxigen Disco', 'Two to Entanglement'],
            c: 'Distracted Globe',
            gif: "<img src='./assets/images/leap.gif'>"
        },
        10: {
            q: 'Who is Parzivals BestFriend? ',
            a: ['Art3mis', 'Daito', 'Shoto'],
            c: 'Aech',
            gif: "<img src='./assets/images/shake.gif'>"
        },
    };

    display();
    $("#end-game").hide();
    var propOwn = Object.getOwnPropertyNames(trivia);
    shuffle(trivia, propOwn.length);

    function timer() {
        if (!startGame) {
            if (time > -1) {
                display();
                time--;
                intervalId = setTimeout(timer, 1000);
            }
            if (time == -1 && betweenRounds) {
                newRound();
            } else if (time == -1 && !betweenRounds) {
                loses++;
                endRound();
            }
        }
    }

    function shuffle(a, i) {
        for (i > 0; i--;) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
    }

    function newRound() {
        if (!optionsLayout) {
            $("#image").empty();
            $("#answers").empty();
            correct = trivia[round].c;
            gif = trivia[round].gif;
        }
        optionsLayout = true;
        $("#image").empty();
        $("#answers").empty();
        clearInterval(intervalId);
        betweenRounds = false;
        time = 15;
        countdownRunning = true;
        do {
            timer();
            gamePlay();
        } while (round < trivia.length)
    }

    function endRound() {
        $("#answers").html(correct);
        $("#image").append(gif);
        round++;
        betweenRounds = true;
        clearInterval(intervalId);
        time = 5;
        timer();
        $(tempDiv).remove();
        if (round == propOwn.length) {
            setTimeout(endGame, 5000);
        }
    }

    function gamePlay() {
        for (i = 0; i < trivia[round].a.length; i++) {
            listWord[i] = $(`<li>`);
            $(listWord[i]).html(trivia[round].a[i]);
            $(listWord[i]).attr('id', trivia[round].a[i]);
        }
        listWord[3] = $(`<li>`);
        $(listWord[3]).html(trivia[round].c);
        $(listWord[3]).attr('id', trivia[round].c);
        display();
        optionsLayout = false;
    }

    function compare() {
        if (answerSelect == correct) {
            wins++;
        } else {
            loses++;
        }
        display();
    }

    function display() {
        if (!betweenRounds) {
            $("#timer").html(time);
            $("#round").html("Round:<br><br>" + (1 + round));
        } else {
            if (round > 0) {
                $("#timer").html("<p> Round Over <br> Next Question in " + time + " Seconds </p>");
            }
        }
        if (optionsLayout) {
            $("#question").html(trivia[round].q);
            shuffle(listWord, listWord.length);
            $(tempDiv).empty();
            for (i = 0; i < listWord.length; i++) {
                listWord[i].addClass("a");
                $(tempDiv).append(listWord[i]);
            }
            $("#answers").append(tempDiv);
        }
        $("#wins").html("Wins: " + wins);
        $("#loses").html("Losses: " + loses);
    }

    function endGame() {
        startGame = true;
        shuffle(trivia, propOwn.length);
        $("#end-game").hide();
        $("#start").show();
        listWord = [];
        betweenRounds = true;
        optionsLayout = false;
        round = 0;
        wins = 0;
        loses = 0;
        display();
        $("#question").empty();
        $("#round").empty();
        $("#answers").empty();
        $("#timer").empty();
        $("#image").empty();
    }
    $("#start").on('click', function () {
        startGame = false;
        $("#end-game").show();
        $("#start").hide();
        newRound();
    });
    $("#answers").on('click', function () {
        if (!betweenRounds) {
            answerSelect = event.target.id;
            compare();
            endRound();
        }
    });
    $("#end-game").on('click', function () {
        endGame();
    });
});