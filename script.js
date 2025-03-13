function draw() {
  const canvas = document.getElementById("gameCanvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    main();
    ctx.strokeRect(0, 0, 800, 800);
    let snake = [{ x: 400, y: 400 }, { x: 410, y: 400 }, { x: 420, y: 400 }, { x: 430, y: 400 }, { x: 440, y: 400 }];
    let dx = 10;
    let dy = 0;

    function drawSnakePart(snakePart) {
			/* ctx.beginPath();
			ctx.lineWidth = "5";
			ctx.strokeStyle = "green";
			ctx.moveTo(snakePart.x, snakePart.y);
			ctx.lineTo(350, 75);
			ctx.stroke(); */

			//squares canvas
      ctx.fillStyle = 'lightgreen';
      ctx.strokestyle = 'darkgreen';
      ctx.fillRect(snakePart.x, snakePart.y, 10, 10); 
      ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    }

    function drawSnake() { 
      snake.forEach(drawSnakePart); 
    }

    function advanceSnake() {
      const head = { x: snake[0].x + dx, y: snake[0].y + dy };
      snake.unshift(head);
      snake.pop();
    }

    function clearCanvas() {
      ctx.fillStyle = "white"; ctx.strokeStyle = "black";
      ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
      ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
    }

    function main() {
      setTimeout(function onTick() {
        clearCanvas();
        advanceSnake();
        drawSnake();
        // Call main again
        main();
      }, 100)
    }

    document.addEventListener("keyup", changeDirection)
   
    function changeDirection(event) {
      const keyPressed = event.keyCode;
      const arrowUp = 38;
      const arrowRight = 39;
      const arrowLeft = 37;
      const arrowDown = 40;

      //anti-cheat for going the opposite side
      const goingUp = dy === -10;
      const goingDown = dy === 10;
      const goingRight = dx === 10;  
      const goingLeft = dx === -10;
   
      if (keyPressed === arrowUp && !goingDown) {
        dx = 0;
        dy = -10;
      }

      if (keyPressed === arrowRight && !goingLeft) {
        dx = 10;
        dy = 0;
      }

      if (keyPressed === arrowLeft && !goingRight) {
        dx = -10;
        dy = 0;
      }

      if (keyPressed === arrowDown && !goingUp) {
        dx = 0;
        dy = 10;
      }

      
    }
  }
}

window.addEventListener("load", draw);