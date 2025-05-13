class Endboss extends MoveableObjekt{
    height = 200;
    width = 200;
    Y = 245;
    otherDirection = true;
    Images_IDLE = [
        'img/endboss/idle/Idle1.png',
        'img/endboss/idle/Idle2.png',
        'img/endboss/idle/Idle3.png',
    ];



    constructor(x){
        super();
        this.loadImage(this.Images_IDLE[0]);
        this.loadImages(this.Images_IDLE);
        this.X = x

        this.animate();
    }


        animate(){
        setInterval(() => {
                this.animateImages(this.Images_IDLE);
        },1000/5);
    }
} 