class HarmObject
{
    constructor(xLocation, yLocation, dy) 
    {
        this.currentImg = "img/burger.png";
        this.xLocation = xLocation;
        this.yLocation = yLocation;
        this.dy = dy;
    }
    
    
    draw(canvasContent)
    {
       this.currentSprite = document.createElement('img');
       this.currentSprite.src = this.currentImg;
       canvasContent.drawImage(this.currentSprite, this.xLocation, this.yLocation, this.currentSprite.naturalWidth, this.currentSprite.naturalHeight);
    }
    
    update(canvasContent, canvas, index)
    {
        this.yLocation += (this.dy + ((levels) * .75));
        this.draw(canvasContent);
        if(this.yLocation >= canvas.height)
        {
            this.xLocation = Math.random() * (canvas.width - (32));
            this.yLocation =  (Math.random() * (canvas.width)) * -1;
        }
        else if(this.yLocation >=  player.yLocation && this.yLocation <  (canvas.height - 50) && this.xLocation >= player.xLocation && this.xLocation <= player.xLocation + 64)
        {
            if(player.currentImg == "img/girlTurnedLeft.png")
                player.currentImg = "img/girlTurnedLeftOpen.png";
            else if(player.currentImg == "img/girlTurnedRight.png")
                player.currentImg = "img/girlTurnedRightOpen.png";
            else if(player.currentImg == "img/girlWalkingLeft.png")
                player.currentImg = "img/girlWalkingLeftOpen.png";
            else if(player.currentImg == "img/girlWalkingRight.png")
                player.currentImg = "img/girlWalkingRightOpen.png";
            streak = 0;
            lives--;
            badFood.splice(index, 1);
        }
    }
}