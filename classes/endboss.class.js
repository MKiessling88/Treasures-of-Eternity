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
        this.hitBoxAdjustment();
    }


/**
 * Periodically animates the Endboss by cycling through its walking images.
 * If the Endboss is not dead, it uses the walking images to create an animation effect.
 * The animation updates every 200ms, providing a frame rate of 5 frames per second.
 */
    animate() {
        setInterval(() => {
            if (!this.isDead() && !this.isHurt) {
                this.animateImages(this.Images_WALK);
            }
        }, 1000 / 5);
    }

    /**
     * Periodically moves the Endboss horizontally, alternating between moving left and right.
     * The Endboss moves by 2 pixels every frame, providing a smooth motion effect.
     * If the Endboss is not dead, it continuously moves between its start position and 200 pixels left/right of it.
     * The movement is updated every 33ms, providing a frame rate of 30 frames per second.
     * Additionally, the spawnEnemys() method is called every frame to spawn new enemies.
     */
    walking() {
        setInterval(() => {
            if (!this.isDead() && !this.isHurt) {
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
        }, 1000 / 30);
    }

    /**
     * Adjusts the hitbox offset of the Endboss periodically.
     * Depending on the direction the Endboss is facing, the offset is set to create a realistic hitbox.
     * This adjustment runs every 16.7ms to ensure smooth updates at a frame rate of 60 frames per second.
     */
    hitBoxAdjustment() {
        setInterval(() => {
            if (this.otherDirection) {
                this.offset_X = 10;
            } else {
                this.offset_X = 35;
            }
        }, 1000 / 60);
    }

    /**
     * Spawns three Goblins at random positions near the Endboss when its life falls below 15.
     * The Goblins are spawned one second apart and are only spawned once per Endboss.
     * The positions of the spawned Goblins are randomly chosen within a range of 100 pixels left and right of the Endboss.
     */
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