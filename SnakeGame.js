let direction;
let body = [];
let appleLocation;
let lastPart;
let partId = 0;
let score = 0;
let board;
let iteration;
let speed;

$(document).ready(function () {
   board = document.getElementById("board");

   $("body").on("keydown", function (e) {
      switch (e.which) {
         case 37:

            /* left */
            direction = 0;
            break;

         case 38:

            /* up */
            direction = 1;
            break;

         case 39:

         /* right */
            direction = 2;
            break;

         case 40:

            /* down */
            direction = 3;
      }
   });
   $("#start-button").click(function () {
      $("#start-container").hide();
      $("#board").show();
      $("#board").css("display", "grid");

      lastPart = {
         x: ["10", "11"],
         y: ["10", "11"]
      };
      direction = 0;
      speed = 500;

      addPart();
      spawnApple(true);
      addBorders();

      document.getElementById(partId - 1).classList.add('head');
      document.getElementById(partId - 1).classList.remove('bodyPart');

      iteration = setInterval(movement, speed);
   });
});

function spawnApple(newApple) {
   /* initialize the new apple co-ordinates and then assign them */
   if(newApple) {
      let apple = document.createElement('div');
      $(apple).attr('id', 'apple');
      board.appendChild(apple);
   }
   appleLocation = generateValidLocation();

   $('#apple').css("grid-column", appleLocation[0][0].toString() + " / " + appleLocation[0][1].toString());
   $('#apple').css("grid-row", appleLocation[1][0].toString() + " / " + appleLocation[1][1].toString());
}

function generateValidLocation() {
   num1 = (Math.floor(Math.random() * 18)) + 2; 
   num2 = (Math.floor(Math.random() * 18)) + 2;
   
   while (dontSpawnOnBody(num1, num2) > 0) {
      num1 = (Math.floor(Math.random() * 18)) + 2; 
      num2 = (Math.floor(Math.random() * 18)) + 2;
   }

   return [[num1, num1 + 1], [num2, num2 + 1]];
}

function dontSpawnOnBody(n1, n2) {
   return body.filter(part => parseInt(part.x[0]) == n1 
   && parseInt(part.y[0]) == n2).length;
}

function addPart() {
   /* make a new body part and initialize its type and name */
   let newPart = document.createElement("div");
   newPart.className = "bodyPart";
   $(newPart).attr("id",  partId.toString());

   /* add it to the board */
   board.appendChild(newPart);

   body.push({
        x: lastPart.x,
        y: lastPart.y,
        id: partId.toString()
      });

   /* assign its new co-ordinates */
   $(newPart).css("grid-column", lastPart.x[0] + " / " + lastPart.x[1]);
   $(newPart).css("grid-row", lastPart.y[0] + " / " + lastPart.y[1]);

   partId++;
}

function gameOver() {

   /* hide the game screen, then show the starting screen again with an updated score */
   clearInterval(iteration);
   $(board).hide();
   $("#start-container").show();
   $("#score").text('Your score for the last round was: ' + score.toString());

   /* reset and turn everything off */
   $(body).off('keydown');
   $(board).html('');
   score = 0;
   body = [];
   partId = 0;
}

function addBorders() {
   appendBorder('edgeTopRight');
   appendBorder('edgeTopLeft');
   appendBorder('edgeBottom');
   appendBorder('edgeRight');
   appendBorder('edgeLeft');
   appendBorder('scoreBoard');
   updateScore();
}

function appendBorder(name) {
   let border = document.createElement('div');
   $(border).attr('id', name);
   board.appendChild(border);
}

function updateScore() {
   $("#scoreBoard").text('Score: ' + score);
}

function intervalUpdate() {
   clearInterval(iteration);
   if (speed > 100) {
      speed -= 25;
   }
   iteration = setInterval(movement, speed);
}