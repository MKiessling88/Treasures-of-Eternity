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


    /**
     * Animates the cloud by moving it to the left at a speed of 0.15 pixels per frame.
     * The animation is done by setting an interval, which updates the cloud's X position every 16.67 milliseconds.
     */
    animate() {
        setInterval(() => {
            this.X -= 0.15;
        },1000/60);
    }
}