let canvas = document.querySelector('canvas');
let canvas2DContent = canvas.getContext('2d');
let lastWidth = 0;
let game = null;
let ray = 0;
let backgroundray = null;
let numberBadFood = 20;
let numberGoodFood = 5;
let inGame = false;
paused = false;
canvas.width = 800;
canvas.height = 500;
player = new Player(canvas);

const init = () =>
{
    for(let i = 0; i < numberGoodFood; i++)
    {
        let x = Math.random() * (canvas.width - (32));
        let y =  (Math.random() * (canvas.width)) * -1;
        let dy = 1;
        goodFood.push(new BenefitObject(x, y, dy)); 
    }
    
    for(let i = 0; i < numberBadFood; i++)
    {
        let x = Math.random() * (canvas.width - (32));
        let y =  (Math.random() * (canvas.width)) * -1;
        let dy = 1;
        badFood.push(new HarmObject(x, y, dy)); 
    }
}

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
    if(lives <= 0)
    {
        window.cancelAnimationFrame(game);
        game = null;
        $("#gameOver").modal();
        paused = true;
    }
    
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
    
    if(badFood.length < numberBadFood)
    {
        let x = Math.random() * (canvas.width - (32));
        let y =  (Math.random() * (canvas.width)) * -1;
        let dy = 1;
        badFood.push(new HarmObject(x, y, dy));
    }
    
    if(goodFood.length < numberGoodFood)
    {
        let x = Math.random() * (canvas.width - (32));
        let y =  (Math.random() * (canvas.width)) * -1;
        let dy = 1;
        goodFood.push(new BenefitObject(x, y, dy)); 
    }
    
    for(let i = 0; i < goodFood.length; i++)
    {
        goodFood[i].update(canvas2DContent, canvas, i);
    }
    
    for(let i = 0; i < badFood.length; i++)
    {
        badFood[i].update(canvas2DContent, canvas, i);
    }
    ray += 1;
}

$("#startMenu").modal();
document.querySelector('#startBtn').addEventListener("click", (event)=>
{
    init();
    animate();
    $("#startMenu").modal('hide');
    inGame = true;
});
document.querySelector('#mainBtn').addEventListener("click", (event)=>
{
    goodFood = [];
    badFood = [];
    score = 0;
    lives = 3;
    levels = 1;
    ray = 0;
    paused = false;
    inGame = false;
    $("#startMenu").modal();
    $("#menu").modal('hide');
    canvas2DContent.clearRect(0,0,canvas.width,canvas.height);
});
document.querySelector('#resumeBtn').addEventListener("click", (event)=>
{
    game = window.requestAnimationFrame(animate);
    $("#menu").modal('hide');
    paused = false;
});
for(let buttons of document.querySelectorAll('#resetBtn'))
{
    buttons.addEventListener("click", (event)=>
    {
        goodFood = [];
        badFood = [];
        score = 0;
        lives = 3;
        levels = 1;
        ray = 0;
        player = new Player(canvas);
        game = window.requestAnimationFrame(animate);
        $(event.toElement.parentNode.parentNode.parentNode.parentNode).modal('hide');
        paused = false;
    });
}

document.addEventListener("keydown", (e) =>
{
    if(inGame)
    {
        if(e.code == "Escape")
        {
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
        }
    }
    else
    {
        if(e.code == "Escape")
        {
            $("#startMenu").modal();
        }
    }
});
        