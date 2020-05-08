let bodyX;
let bodyY;

function movement() {
   changeHead();

   changePoints();

   checkPosition();
}

function changePoints() {
   lastPart = body[body.length - 1];

   for (let parse = 1; parse < body.length - 1; parse++) {

      /* get co-ordinates of the piece immediately before this one */
      bodyX = $("#" + body[parse - 1].id).css("grid-row");
      bodyY = $("#" + body[parse - 1].id).css("grid-column");
      
      /* apply these co-ordinates to the current piece */
      $("#" + body[parse]).css("grid-row", bodyX);
      $("#" + body[parse]).css("grid-column", bodyY);

      /* display the changes in the body array */
      body[parse].x = bodyX;
      body[parse].y = bodyY;
   }
}

function changeHead() {

   /* access current co-ordinates of head */
   let head = document.getElementById("0");
   bodyX = $(head).css("grid-row").split("/");
   bodyY = $(head).css("grid-column").split("/");

   /* move the head based on the applied direction */
   switch (direction) {
      case 0:
         bodyX = [parseInt(bodyX[0]) - 1, parseInt(bodyX[1]) - 1];
         body[0].x = bodyX;
         $(head).css("grid-row", (bodyX[0]).toString() + "/" + (bodyX[1]).toString());
         break;
      case 1:
         bodyY = [parseInt(bodyY[0]) - 1, parseInt(bodyY[1]) - 1];
         body[0].y = bodyY;
         $(head).css("grid-row", (bodyY[0]).toString() + "/" + (bodyY[1]).toString());
         break;
      case 2:
         bodyX = [parseInt(bodyX[0]) + 1, parseInt(bodyX[1]) + 1];
         body[0].x = bodyX;
         $(head).css("grid-row", (bodyX[0]).toString() + "/" + (bodyX[1]).toString());
         break;
      case 3:
         bodyY = [parseInt(bodyY[0]) + 1, parseInt(bodyY[1]) + 1];
         body[0].y = bodyY;
         $(head).css("grid-row", (bodyY[0]).toString() + "/" + (bodyY[1]).toString());
         break;
   }
}