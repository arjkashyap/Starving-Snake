const box = 30;         // Unit for measure
const foodImg = new Image();
foodImg.src = "../img/food.png";

let score = 0;

let mouse = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
};

let snake = [];         // Snake Array 
snake[0] = {x: 9*box, y: 10*box};    // Snake head
snake[1] = {x: 8*box, y: 10*box};

function draw(){
    const canvas = document.getElementById('game-area');
    const ctx = canvas.getContext('2d');

    if( ctx ){

        snake.forEach( (s, index) => {
    
            ctx.fillStyle = ( index == 0 ) ? 'green' : 'white';
            ctx.fillRect(s.x, s.y, box, box);
            ctx.strokeStyle = 'red';
            ctx.strokeRect(s.x, s.y, box, box);
        } )

        // Draw mouse at random places
        ctx.drawImage(foodImg, mouse.x, mouse.y);

        // Score
        ctx.fillStyle = 'white';
        ctx.font = '45px Changa One';
        console.log(2*box)
        ctx.fillText(score, 2*box, box);
        console.log(box)
    }
    else{
        document.write('Some Error Occured\n');
    }
}

//let game = setInterval(draw, 100);


