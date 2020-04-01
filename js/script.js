
function draw(){
    console.log('Draw function called')
    const canvas = document.getElementById('game-area');
    const ctx = canvas.getContext('2d');
    if( ctx ){
        const box = 30;         // Unit for measure
        let snake = [];         // Snake Array 

        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.fillRect(300, 300, box, box);
    }
    else{
        document.write('Some Error Occured\n');
    }
}
