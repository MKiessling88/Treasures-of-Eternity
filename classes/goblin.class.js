class Goblin extends MoveableObjekt {
    height = 80;
    width = 80;
    offset_X = -10;
    offset_Y = 20;
    offset_Width = 30;
    offset_Height = 40;
    Images_WALK = [
        'img/goblin/walk1.png',
        'img/goblin/walk2.png',
        'img/goblin/walk3.png',
        'img/goblin/walk4.png',
        'img/goblin/walk5.png',
        'img/goblin/walk6.png',
    ];
    currentImage = 0;
    otherDirection = true;

    constructor(x) {
        super();
        this.loadImage('img/goblin/walk1.png');
        this.loadImages(this.Images_WALK);
        this.X = 250 + Math.random() * 500;
        this.Y = 350;
        this.moveLeft();

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.animateImages(this.Images_WALK);
        }, 1000 / 5);
    }

    moveLeft() {
        setInterval(() => {
            this.X -= 0.25;
        }, 1000 / 60);

    }
}