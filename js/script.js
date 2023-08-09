$(document).ready(function(){
    let gameInterval;
    let isGameOver = false;

    function createObstacle() {
        if (isGameOver) return;

        const obstacle = document.createElement('div');
        obstacle.className = 'obstacle';
        obstacle.style.left = Math.random() * 370 + 'px'; // Random horizontal position
        $('.container').append(obstacle);

        // Animate obstacle falling
        $(obstacle).animate({
            top: '100%',
        }, 3000, 'linear', function() {
            $(this).remove(); // Remove obstacle when it reaches the bottom
        });

        // Check for collision
        const carLeft = parseInt($(".car").css("left"));
        const carTop = parseInt($(".car").css("top"));  // Change this to "top"
        const obstacleLeft = parseInt($(".obstacle").css("left"));
        const obstacleTop = parseInt($(".obstacle").css("top"));
        const obstacleBottom = parseInt($(".obstacle").css("bottom"));
        const obstacleRight = parseInt($(".obstacle").css("right"));
        const carBottom = parseInt($(".car").css("bottom"));
        const carRight = parseInt($(".car").css("right"));
console.log(carTop,obstacleBottom,"hits")
        let vertialMatch, horizontalMatch, intersect
        if ((obstacleTop > carTop && obstacleTop < carBottom) || (carBottom > obstacleTop && carBottom < obstacleBottom)) {
            verticalMatch = true
        } else {
            verticalMatch = false
        }

        if ((carRight > obstacleLeft && carRight < obstacleRight) || (carLeft < obstacleRight && carLeft > obstacleLeft)) {
            horizontalMatch = true
        } else {
            horizontalMatch = false
        }

        if (horizontalMatch && vertialMatch) {
            console.log('Game over - Obstacle touched car');
            intersect = true
            endGame();
        } else {
            intersect = false
        }
  
        if (
            carLeft < obstacleLeft + 30 &&
            carLeft + 80 > obstacleLeft &&
            carTop < obstacleTop + 30 &&
            carTop + 80 > obstacleTop
        ) {
            endGame();
            console.log('Game over - Obstacle touched car');
        }
    }

    function endGame() {
        isGameOver = true;
        clearInterval(gameInterval);
        $('.obstacle').remove();
        alert("Game Over! You hit an obstacle.");
    }

    // Generate obstacles at intervals
    gameInterval = setInterval(createObstacle, 2000);

    $(document).keydown(function(e) {
        if (isGameOver) return;

        switch(e.which) {
            case 37:
                console.log('Moving left');
                $(".car").css("left", Math.max(0, parseInt($(".car").css("left")) - 20) + "px");
                break;

            case 39:
                console.log('Moving right');
                $(".car").css("left", Math.min(400 - 80, parseInt($(".car").css("left")) + 20) + "px");
                break;

            default: return;
        }
        e.preventDefault();
    });
});
