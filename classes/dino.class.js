class Dino extends MoveableObjekt {
    Images_DEAD = [
        'img/dino/death/death1.png',
        'img/dino/death/death2.png',
        'img/dino/death/death3.png',
        'img/dino/death/death4.png',
        'img/dino/death/death5.png',
        'img/dino/death/death6.png',
    ];
    Images_HURT = [
        'img/dino/hurt/hurt1.png',
        'img/dino/hurt/hurt2.png',
        'img/dino/hurt/hurt3.png',
        'img/dino/hurt/hurt4.png',
    ];
    Images_WALK = [
        'img/dino/walk/walk1.png',
        'img/dino/walk/walk2.png',
        'img/dino/walk/walk3.png',
        'img/dino/walk/walk4.png',
    ];
    Images_ATTACK = [
        'img/dino/attack/attack1.png',
        'img/dino/attack/attack2.png',
        'img/dino/attack/attack3.png',
        'img/dino/attack/attack4.png',
        'img/dino/attack/attack5.png',
    ];
    height = 80;
    width = 80;
    offset_X = -25;
    offset_Y = 20;
    offset_Width = 60;
    offset_Height = 35;
    otherDirection = true;
    life = 10;
    world;
    isAttacking = false;

    constructor(x) {
        super();
        this.loadImage(this.Images_WALK[0]);
        this.loadImages(this.Images_WALK);
        this.loadImages(this.Images_HURT);
        this.loadImages(this.Images_DEAD);
        this.loadImages(this.Images_ATTACK);
        this.X = x || 300 + Math.random() * 1200;
        this.Y = 350;

        setTimeout(() => {
            this.move();
            this.animate();
            this.startIntervals();
        }, 1000);
    }

    startIntervals() {
        setInterval(() => {
            this.attack();
        }, 100);
    }

    attack() {
        if (this.world) {
                if (!this.isAttacking && this.world.charakter.X > this.X - 500 && !this.isDead()) {
                    this.isAttacking = true;
                    this.animateImagesOnce(this.Images_ATTACK);
                    this.world.projectils.push(new EnemyProjectile(this.X, this.Y - 10, this.otherDirection, this.world));
                    setTimeout(() => {
                        this.isAttacking = false;
                    }, 5000);
                }
        }
    }
}