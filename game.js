// Unit for measure
const box = 32;

// Assets
const ground = new Image();
ground.src = "../img/background.jpg"

const foodImg = new Image();
foodImg.src = "../img/food.png";

let score = 0;

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
};

let snake = [];         // Snake Array 
snake[0] = {x: 9*box, y: 10*box};    // Snake head
//snake[1] = {x: 8*box, y: 10*box};
console.log(snake)

// Current snake direction
let d;

document.addEventListener("keydown", direction);

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

function draw(){

    const canvas = document.getElementById('game-area');
    const ctx = canvas.getContext('2d');

    if( ctx ){
        ctx.drawImage(ground,0,0);
        snake.forEach( (s, index) => {
    
            ctx.fillStyle = ( index == 0 ) ? 'green' : 'white';
            ctx.fillRect(s.x, s.y, box, box);
            ctx.strokeStyle = 'red';
            ctx.strokeRect(s.x, s.y, box, box);
        } )

        

        // Draw food at random places
        ctx.drawImage(foodImg, food.x, food.y);

        // Score
        ctx.fillStyle = 'white';
        ctx.font = '45px Changa One';
       
        ctx.fillText(score, 2*box, box);
        

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
        
        // Game over
        if(snakeX < 0 || snakeX > 608 - box|| snakeY < 0 || snakeY >= 608)
        {
            console.log("game over");
            console.log(`X: ${snakeX}, Y: ${snakeY}`)
            clearInterval(game);
        }

        let newHead = {
            x: snakeX,
            y: snakeY
        }

        snake.unshift(newHead);

    }
    else{
        document.write('Some Error Occured\n');
    }
}

let game = setInterval(draw, 100);


