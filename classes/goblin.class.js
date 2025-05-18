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
        this.X = x || Math.floor(Math.random() * 1200) + 500;
        this.Y = 350;
        this.moveLeft();

        this.animate();
    }

    /**
* Animates the goblin by switching between the walk images every 200ms.
* If the goblin is hurt or dead, the animation is paused.
*/
    animate() {
        setInterval(() => {
            if (!this.isHurt && !this.isDead()) {
                this.animateImages(this.Images_WALK);
            }
        }, 1000 / 5);
    }

    /**
 * Moves the goblin to the left by subtracting 0.25 from its X position every 16.7ms.
 * If the goblin is hurt or dead, the movement is paused.
 */
    moveLeft() {
        setInterval(() => {
            if (!this.isHurt && !this.isDead()) {
                this.X -= 0.25;
            }
        }, 1000 / 60);
    }
}