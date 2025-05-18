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
    Images_HURT = [
        'img/goblin/hurt/hurt1.png',
        'img/goblin/hurt/hurt2.png',
        'img/goblin/hurt/hurt3.png',
    ];
    Images_DEAD = [
        'img/goblin/death/death1.png',
        'img/goblin/death/death2.png',
        'img/goblin/death/death3.png',
        'img/goblin/death/death4.png',
    ];
    currentImage = 0;
    otherDirection = true;
    life = 10;
    world;

    constructor(x, world) {
        super();
        this.loadImage('img/goblin/walk1.png');
        this.loadImages(this.Images_WALK);
        this.loadImages(this.Images_HURT);
        this.loadImages(this.Images_DEAD);
        this.world = world;
        this.X = x || 300 + Math.random() * 1200;
        this.Y = 350;
        this.move();

        this.animate();
    }
}