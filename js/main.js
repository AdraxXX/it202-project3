let canvas = document.querySelector('canvas');
let canvas2DContent = canvas.getContext('2d');
let lastWidth = 0;
let game = null;
let score = 0;
let lives = 3;
let levels = 0;
let ray = 0;
let backgroundray = null;
paused = false;
canvas.width = 800;
canvas.height = 500;
let player = new Player(canvas); 
const animate = () =>
{
    game = window.requestAnimationFrame(animate);
    // clear
    canvas2DContent.clearRect(0,0,canvas.width,canvas.height);
    // update player location
    player.update(canvas2DContent, canvas);
    canvas2DContent.font = "1.5em Verdana";
    canvas2DContent.fillStyle = "red";
    canvas2DContent.fillText("Score: " + score, 0, 30);
    canvas2DContent.fillText("Lives: " + lives, 680, 30);
    canvas2DContent.fillText("Levels: " + levels, 325, 30);
    let background = document.createElement('img');
    background.src = "../img/backgroundgrass.png";
    canvas2DContent.drawImage(background, 0, 0, 800, 500);
    if(ray > 0 && ray <= 20)
    {
        backgroundray = null;
        backgroundray = document.createElement('img');
        backgroundray.src = "../img/backgroundRay1.png";
        canvas2DContent.drawImage(backgroundray, 0, 0, 800, 500);
        ray += 1;
    }
    else
    {
        backgroundray = null;
        backgroundray = document.createElement('img');
        backgroundray.src = "../img/backgroundRay2.png";
        canvas2DContent.drawImage(backgroundray, 0, 0, 800, 500);
        if(ray === 40)
            ray = 0;
    }
    ray += 1;
}

animate();

document.querySelector('#resumeBtn').addEventListener("click", (event)=>
{
    game = window.requestAnimationFrame(animate);
    $("#menu").modal('hide');
    paused = false;
});

document.querySelector('#resetBtn').addEventListener("click", (event)=>
{
    let score = 0;
    let lives = 0;
    let levels = 0;
    playe = null;
    player = new Player(canvas);
    game = window.requestAnimationFrame(animate);
    $("#menu").modal('hide');
    paused = false;
});

document.addEventListener("keydown", (e) =>
{
    switch (e.code) {
        case "Escape":
        if(!paused)
        {
            window.cancelAnimationFrame(game);
            game = null;
            $("#menu").modal();
            paused = true;
        }
        else
        {
            game = window.requestAnimationFrame(animate);
            $("#menu").modal('hide');
            paused = false;
        }
        break;
    }
});
        