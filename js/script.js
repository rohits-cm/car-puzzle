$(document).ready(function() {
    var car = $(".car");
    var obstacle = $(".obstacle");
    var container = $(".container");

    var carSpeed = 20;
    var obstacleSpeed = 2;
    var isGameOver = false;

    // Move the car left or right
    $(document).on("keydown", function(e) {
        if (e.key === "ArrowLeft" && !isGameOver) {
            var leftPosition = parseInt(car.css("left"));
            if (leftPosition > 50) {
                car.css("left", leftPosition - carSpeed);
            }
        }
        if (e.key === "ArrowRight" && !isGameOver) {
            var leftPosition = parseInt(car.css("left"));
            if (leftPosition < 400-70) {
                car.css("left", leftPosition + carSpeed);
            }
        }
    });

    // Move the obstacle
    function moveObstacle() {
        var topPosition = parseInt(obstacle.css("top"));
        obstacle.css("top", topPosition + obstacleSpeed);

        if (topPosition > container.height()) {
            resetObstacle();
        }

        if (!isGameOver) {
            requestAnimationFrame(moveObstacle);
        }
    }

    // Reset obstacle position
    function resetObstacle() {
        obstacle.css({
            top: -obstacle.height(),
            left: Math.random() * (container.width() - obstacle.width())
        });
    }

    // Collision detection
    function checkCollision() {
        var carRect = car[0].getBoundingClientRect();
        var obstacleRect = obstacle[0].getBoundingClientRect();

        if (
            carRect.left < obstacleRect.right &&
            carRect.right > obstacleRect.left &&
            carRect.top < obstacleRect.bottom &&
            carRect.bottom > obstacleRect.top
        ) {
            gameOver();
        }

        if (!isGameOver) {
            requestAnimationFrame(checkCollision);
        }
    }

    // Game over
    function gameOver() {
        isGameOver = true;
        alert("Game Over");

        // Reset car position
        car.css("left", container.width() / 2 - car.width() / 2);

        // Reset obstacle position
        resetObstacle();

        // Restart the game
        setTimeout(function() {
            isGameOver = false;
            moveObstacle();
            checkCollision();
        }, 2000); // Restart after a 2-second delay
    }

    // Start the game
    moveObstacle();
    checkCollision();
});
