class Endboss extends MoveableObjekt {
    height = 200;
    width = 200;
    Y = 245;
    offset_X = 10;
    offset_Y = 75;
    offset_Width = 50;
    offset_Height = 90;
    otherDirection = true;
    life = 30;
    enemysSpawned = false;
    world;
    Images_WALK = [
        'img/endboss/walk/Walk1.png',
        'img/endboss/walk/Walk2.png',
        'img/endboss/walk/Walk3.png',
        'img/endboss/walk/Walk4.png',
        'img/endboss/walk/Walk5.png',
        'img/endboss/walk/Walk6.png',
    ];
    Images_HURT = [
        'img/endboss/hurt/Hurt1.png',
        'img/endboss/hurt/Hurt2.png',
    ];
    Images_DEAD = [
        'img/endboss/dead/Death0.png',
        'img/endboss/dead/Death1.png',
        'img/endboss/dead/Death2.png',
        'img/endboss/dead/Death3.png',
        'img/endboss/dead/Death4.png',
    ];



    constructor(x) {
        super();
        this.loadImage(this.Images_WALK[0]);
        this.loadImages(this.Images_WALK);
        this.loadImages(this.Images_HURT);
        this.loadImages(this.Images_DEAD);
        this.X = x
        this.startX = x;

        this.animate();
        this.walking();
        this.hitBoxAjustment();
    }


    animate() {
        setInterval(() => {
            if (!this.isDead()) {
                this.animateImages(this.Images_WALK);
            }
        }, 1000 / 5);
    }

    walking() {
        setInterval(() => {
            if (!this.isDead()) {
                if (this.otherDirection) {
                    this.X -= 2;
                    if (this.X <= this.startX - 200) {
                        this.otherDirection = false;
                    }
                } else {
                    this.X += 2;
                    if (this.X >= this.startX + 200) {
                        this.otherDirection = true;
                    }
                }
            }
            this.spawnEnemys();
        }, 1000 / 30); // 30 FPS
    }

    hitBoxAjustment() {
        setInterval(() => {
            if (this.otherDirection) {
                this.offset_X = 10;
            } else {
                this.offset_X = 35;
            }
        }, 1000 / 60);
    }

    spawnEnemys() {
        if (this.life <= 15 && !this.enemysSpawned) {
            this.enemysSpawned = true;

            let minX = this.X - 100;
            let maxX = this.X + 200;

            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    let randomX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
                    let goblin = new Goblin(randomX, this.world);
                    this.world.level.enemys.push(goblin);
                }, i * 1000); // jeder Goblin 1 Sekunde nach dem vorherigen
            }
        }
    }

} 