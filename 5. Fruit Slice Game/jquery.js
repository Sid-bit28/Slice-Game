let playing = false;
let score;
let trailsleft = 3;
let fruits = ["apple", "banana", "pineapple"];
let step;
let action;
$(function () {
    //click on start reset button.
    $("#startreset").click(function () {
        //we are playing
        if (playing == true) {
            //reload the page.
            location.reload();
        } else {
            playing = true; // playing is true now.
            score = 0;
            trailsleft = 3;
            //change in the span of scorevalue.
            $("#scorevalue").html(score);
            //show the trails left box with the hearts.
            $("#trailsleft").show(); // this function shows the box jquery feature.
            addHearts();

            //hide the game over box
            $("#gameover").hide();

            //change the button text to reset game
            $("#startreset").html("Reset Game");

            //Generate a random fruit
            startAction();
        }
    });

    // slice a fruit
    $("#fruit1").mouseover(function () {
        score++;
        $("#scorevalue").html(score); // update the score
        //play sound
        $("#slicesound")[0].play(); // Remember the jquery returns an array whose first element is the sound took a lot of time but was worth it!!.
        //stop the fruit
        clearInterval(action);
        //hide effect
        $("#fruit1").hide("explode", 500);
        //send a new fruit
        setTimeout(startAction, 800);
    });

    function addHearts() {
        $("#trailsleft").empty();
        for (let i = 0; i < trailsleft; i++) {
            $("#trailsleft").append('<img src="images/heart.png" class="life"></img>');
        }
    }

    function startAction() {
        $("#fruit1").show();
        chooseFruit(); // choose one of the fruits from the folder
        $("#fruit1").css({ 'left': Math.round(550 * Math.random()), 'top': -50 });

        // Generate a random step
        step = Math.round(5 * Math.random()) + 1;
        // Move the fruit down 1 step every 10ms
        action = setInterval(function () {
            $("#fruit1").css('top', $("#fruit1").position().top + step);

            //check if the fruit is too low
            if ($("#fruit1").position().top > $("#fruitcontainer").height()) {
                // check if any trails is left
                if (trailsleft > 1) {
                    // Repeat everything in the beginning
                    $("#fruit1").show();
                    chooseFruit(); // choose one of the fruits from the folder
                    $("#fruit1").css({ 'left': Math.round(550 * Math.random()), 'top': -50 });

                    // Generate a random step
                    step = Math.round(3 * Math.random()) + 1;

                    // Reduce trails by 1.
                    trailsleft -= 1;

                    //populate trailsleft box
                    addHearts();
                } else {
                    // Game Over
                    playing = false; // As we are not playing anymore
                    $("#startreset").html("Start Game"); // Change the html of the start reset button
                    $("#gameover").show(); // show the gameover div
                    $("#gameover").html('<p>Game Over</p><p>Your Score is ' + score + '</p>'); // changed the score div
                    $("#trailsleft").hide();
                    stopAction();
                }
            }
        }, 10);
    }

    //generate the random fruit
    function chooseFruit() {
        let index = Math.floor(Math.random() * 3);
        $("#fruit1").attr('src', 'images/' + fruits[index] + '.png');
    }

    // to stop the setInterval
    function stopAction() {
        clearInterval(action);
        $("#fruit1").hide();
    }
});