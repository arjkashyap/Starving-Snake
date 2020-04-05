// Unit for measure
const box = 32;

// Assets
const ground = new Image();
ground.src = "img/background.jpg"

const foodImg = new Image();
foodImg.src = "img/food.png";

// Integer score
let score = 0;

// Display Score
let dispScore = document.getElementById('score');

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
};

let snake = [];         // Snake Array 
snake[0] = {
    x : 5 * box,
    y : 10 * box
};

snake[1] = {
    x : 4*box,
    y : 10 * box
};

// Size decreases every 2 seconds
let starveSpeed = 2000;

// Current snake direction
let d = "RIGHT";

document.addEventListener("keydown", direction);

// Resart button pressed
function restart(){ location.reload(false); }

// Decrease size every 3 seconds
setInterval( () => {
    snake.pop();
}, starveSpeed);

// Function Changes the direction of the snake movement
function direction(event){
    if(event.keyCode == 37 && d != "RIGHT"){
        d = "LEFT";
    }else if( event.keyCode == 38 && d != "DOWN"){
        d = "UP";
    }else if( event.keyCode == 39 && d != "LEFT"){
        d = "RIGHT";
    }else if( event.keyCode == 40 && d != "UP"){
        d = "DOWN";
    }
}

// Check collison with tail
function collison(head, array){
    for(let i = 0; i < array.length; i++){
        if(array[i].x == head.x && array[i].y == head.y && array.length > 1)
            return true;
    }
    return false;
}


function draw(){

    const canvas = document.getElementById('game-area');
    const ctx = canvas.getContext('2d');

    if( ctx ){
        ctx.drawImage(ground,0,0);
        snake.forEach( (s, index) => {
    
            ctx.fillStyle = ( index == 0 ) ? '#e96539' : '#b6eab0';
            ctx.fillRect(s.x, s.y, box, box);
            ctx.strokeStyle = 'red';
            ctx.strokeRect(s.x, s.y, box, box);
        } )

        // Draw food at random places
        ctx.drawImage(foodImg, food.x, food.y);

        dispScore.textContent = score;        

        if( snake.length < 1 ){
            dispScore.textContent = `GAME OVER !! FINAL SCORE: ${score}`
            clearInterval(game);
        }
        // Old snake head position
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;
        
        // Update Position
        if( d == "RIGHT" ) snakeX += box;
        if( d == "LEFT" ) snakeX -= box;
        if( d == "UP" ) snakeY -= box;
        if( d == "DOWN" ) snakeY += box;


        // If snake eats the food
        if( snake[0].x == food.x && snake[0].y == food.y ){
            score ++; 
            food = {
                x: Math.floor(Math.random() * 17 + 1) * box,
                y: Math.floor(Math.random() * 15 + 3) * box
            };
        }
        else{
            snake.pop();
        }
        
        let newHead = {
            x: snakeX,
            y: snakeY
        }


        // Game over
        if(snakeX < 0 || snakeX > 608 - box|| snakeY < 0 || snakeY >= 608 || collison(newHead, snake) || snake.length < 0)
        {
            dispScore.textContent = `GAME OVER !! FINAL SCORE: ${score}`
            clearInterval(game);
            
        }

        snake.unshift(newHead);

    }
    else{
        document.write('Some Error Occured\n');
    }
}

let game = setInterval(draw, 100);

