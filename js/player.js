let paused;
class Player
{
    constructor(canvas) 
    {
        this.xLocation = canvas.width / 2;
        this.yLocation = canvas.height - 64;
        this.speedFactor = 10;
        this.dx = 0;
        this.lives = 3;
        this.score = 0;
        this.currentSprite = null;
        this.currentImg = "img/girlTurnedLeft.png";
        this.walking = 0;
        this.walkingDelay = 0;
        
        // This will handle the player movement to the right and left on pressing and holding of the A or W key.
        document.addEventListener("keydown", (e) =>
        {
            if(this.walkingDelay == 0 && !paused)
            {
                switch (e.code) {
                    case "ArrowLeft":
                        this.walkingDelay = 10;
                        if(this.walking != 0)
                            this.dx = -this.speedFactor;

                        if(this.walking % 2 == 0)
                            this.currentImg = "img/girlTurnedLeft.png";
                        else
                        {
                            this.currentImg = "img/girlWalkingLeft.png";
                            this.dx = -this.speedFactor;
                        }
                        this.walking++;
                        break;
                    case "ArrowRight":
                        this.walkingDelay = 10;
                        if(this.walking != 0)
                            this.dx = this.speedFactor;

                        if(this.walking % 2 == 0)
                            this.currentImg = "img/girlTurnedRight.png";
                        else
                        {
                            this.currentImg = "img/girlWalkingRight.png";
                            this.dx = this.speedFactor;
                        }
                        this.walking++;
                        break;
                }
            }
            else
                this.dx = 0;
        });

        // This will handle the player stopping after the A or W key is released.
        document.addEventListener("keyup", (e) =>
        {
            if(!paused)
            {
                switch (e.code) {
                    case "ArrowLeft":
                        this.dx = 0;
                        this.currentImg = "img/girlTurnedLeft.png";
                        this.walking = 0;
                        break;
                    case "ArrowRight":
                        this.dx = 0;
                        this.currentImg = "img/girlTurnedRight.png";
                        this.walking = 0;
                        break;
                }
            }
        });
    }
    
    
    draw(canvasContent)
    {
        this.currentSprite = document.createElement('img');
        this.currentSprite.src = this.currentImg;
        canvasContent.drawImage(this.currentSprite, this.xLocation, this.yLocation, this.currentSprite.naturalWidth * 1.5, this.currentSprite.naturalHeight * 1.5);
    }
    
    update(canvasContent, canvas)
    {
        if(lastWidth != 0 && canvas.width - lastWidth != 0)
        {
            if(canvas.width - lastWidth > 0)
                this.xLocation += canvas.width - lastWidth;  
        }
        if(this.xLocation > canvas.width + (64 * 1.5))
            this.xLocation = canvas.width - (64 * 1.5);
        
        this.yLocation = canvas.height - (64 * 1.5);
        this.xLocation += this.dx;
        
        if(this.walkingDelay != 0)
            this.walkingDelay--;
        this.draw(canvasContent);
        
        if(this.xLocation > canvas.width)
            this.xLocation = -(64 * 1.5);
        if(this.xLocation < -(64 * 1.5))
            this.xLocation = canvas.width;
    }
}