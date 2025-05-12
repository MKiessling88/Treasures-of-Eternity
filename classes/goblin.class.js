class Goblin extends MoveableObjekt {
    height = 80;
    width = 80;

    constructor(x) {
        super();
        this.loadImage('img/goblin/walk1.png');
        this.X = 250 + Math.random() * 500;
        this.Y = 350;
        this.moveLeft();
    }

    moveLeft() {
        setInterval(() => {
            this.X -= 0.25;
        }, 1000 / 60);

    }
}