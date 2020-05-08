let direction = 0;
let body = [];
let appleLocation;
let lastPart = {
   x: ["10", "11"],
   y: ["10", "11"]
};
let partId = 0;
let board;

$(document).ready(function () {
   board = document.getElementById("board");

   addPart();

   spawnApple();

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
      setInterval(movement, 500);
   });
});

function spawnApple() {
   /* initialize the new apple co-ordinates and then assign them */
   appleLocation = generateValidLocation();

   $("#apple").css("grid-row", appleLocation[0][0].toString() + " / " + appleLocation[0][1].toString());
   $("#apple").css("grid-column", appleLocation[1][0].toString() + " / " + appleLocation[1][1].toString());
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

function checkPosition() {

   /* check if the head is eating the apple, apple cannot spawn on a body part thus only the head may touch the apple */
   
   if ((parseInt(body[0].x[0]) == appleLocation[0][0]) 
      && (parseInt(body[0].y[0]) == appleLocation[1][0])) {
      addPart();
      spawnApple();
   }
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