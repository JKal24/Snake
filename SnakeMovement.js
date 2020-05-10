let bodyX;
let bodyY;

function movement() {
   changePoints();

   changeHead();

   checkPosition();
}

function changePoints() {
   lastPart = body.slice(body.length - 1)[0];
   lastPart = {
      x: [lastPart.x[0], lastPart.x[1]],
      y: [lastPart.y[0], lastPart.y[1]]
   }

   for (let parse = body.length - 1; parse > 0; parse--) {

      /* get co-ordinates of the piece immediately before this one */
      bodyX = $("#" + body[parse - 1].id).css("grid-column");
      bodyY = $("#" + body[parse - 1].id).css("grid-row");
      
      /* apply these co-ordinates to the current piece */
      $("#" + body[parse].id).css("grid-column", bodyX);
      $("#" + body[parse].id).css("grid-row", bodyY);

      /* display the changes in the body array */
      body[parse].x = bodyX.split(" / ");;
      body[parse].y = bodyY.split(" / ");;
   }
}

function changeHead() {

   /* access current co-ordinates of head */
   let head = document.getElementById("0");
   bodyX = $(head).css("grid-column").split(" / ");
   bodyY = $(head).css("grid-row").split(" / ");

   /* move the head based on the applied direction */
   switch (direction) {
      case 0:
         bodyX = [(parseInt(bodyX[0]) - 1).toString(), 
         (parseInt(bodyX[1]) - 1).toString()];
         body[0].x = bodyX;
         $(head).css("grid-column", bodyX[0] + " / " + bodyX[1]);
         break;
      case 1:
         bodyY = [(parseInt(bodyY[0]) - 1).toString(), 
         (parseInt(bodyY[1]) - 1).toString()];
         body[0].y = bodyY;
         $(head).css("grid-row", bodyY[0] + " / " + bodyY[1]);
         break;
      case 2:
         bodyX = [(parseInt(bodyX[0]) + 1).toString(), 
         (parseInt(bodyX[1]) + 1).toString()];
         body[0].x = bodyX;
         $(head).css("grid-column", bodyX[0] + " / " + bodyX[1]);
         break;
      case 3:
         bodyY = [(parseInt(bodyY[0]) + 1).toString(), 
         (parseInt(bodyY[1]) + 1).toString()];
         body[0].y = bodyY;
         $(head).css("grid-row", bodyY[0] + " / " + bodyY[1]);
   }
}

function checkPosition() {

   /* check if the head is eating the apple, apple cannot spawn on a body part thus only the head may touch the apple */
   
   if ((parseInt(body[0].x[0]) == appleLocation[0][0]) 
      && (parseInt(body[0].y[0]) == appleLocation[1][0])) {
      addPart();
      spawnApple(false);
      score++;
      updateScore();
   }

   if (outOfBounds(body[0]) || movingIntoItself(body[0])) {
      gameOver();
   }
}

function outOfBounds(head) {
   if ((parseInt(head.x[0]) > 19 || parseInt(head.x[0]) < 2) || 
   (parseInt(head.y[0]) > 19 || parseInt(head.y[0]) < 2)) {
      return true;
   }
   return false;
}

function movingIntoItself(head) {
   return body.filter(part => (head.id != part.id) && (parseInt(part.x[0]) == parseInt(head.x[0])) && (parseInt(part.y[0]) == parseInt(head.y[0]))).length > 0;
}