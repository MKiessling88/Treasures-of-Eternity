class Cloud extends MoveableObjekt{
    constructor(x) {
        super();
        this.loadImage('img/background/myst.png');
        this.X = x;
        this.Y = 0;
        this.height = 480;
        this.width = 740;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.X -= 0.15;
        },1000/60);
    }
}