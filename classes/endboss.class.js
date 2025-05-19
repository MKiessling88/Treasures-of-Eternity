class Endboss extends MoveableObjekt {
    height = 200;
    width = 200;
    Y = 245;
    offset_X = 10;
    offset_Y = 75;
    offset_Width = 50;
    offset_Height = 90;
    otherDirection = true;
    life = 50;
    enemysSpawned = false;
    world;
    playerNearby = false;
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
    Images_ATTACK = [
        'img/endboss/attack/physical/Attack1.png',
        'img/endboss/attack/physical/Attack2.png',
        'img/endboss/attack/physical/Attack3.png',
        'img/endboss/attack/physical/Attack4.png',
        'img/endboss/attack/physical/Attack5.png',
        'img/endboss/attack/physical/Attack6.png',
        'img/endboss/attack/physical/Attack7.png',
    ];



    constructor(x) {
        super();
        this.loadImage(this.Images_WALK[0]);
        this.loadImages(this.Images_WALK);
        this.loadImages(this.Images_HURT);
        this.loadImages(this.Images_DEAD);
        this.loadImages(this.Images_ATTACK);
        this.X = x
        this.startX = x;

        this.animate();
        this.walking();
        this.hitBoxAdjustment();
        this.detectPlayer();
        this.targetPlayer();
        this.attack();
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
     */
    walking() {
        setInterval(() => {
            if (!this.isDead() && !this.isHurt && !this.playerNearby) {
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
     * Periodically checks the distance between the Endboss and the character.
     * If the character is within 300 pixels, sets the playerNearby flag to true.
     * Otherwise, sets the playerNearby flag to false.
     */
    detectPlayer() {
        setInterval(() => {
            if (this.world) {
                const distance = Math.abs(this.world.charakter.X - this.X);
                if (distance < 300) {
                    this.playerNearby = true;
                } else {
                    this.playerNearby = false;
                }
            }
        }, 100);
    }

    /**
     * Periodically moves the Endboss towards the character if it is within a certain range.
     * If the character is on the left side of the Endboss, it moves left. If the character is on the right side of the Endboss, it moves right.
     */
    targetPlayer() {
        setInterval(() => {
            if (this.playerNearby && this.world && !this.isDead() && !this.isHurt) {
                if (this.world.charakter.X < this.X) {
                    this.otherDirection = true;
                    this.moveLeft(2.5);
                } else if (this.world.charakter.X > this.X) {
                    this.otherDirection = false;
                    this.moveRight(2.5);
                }
            }
        }, 1000 / 30);
    }

    /**
     * Handles the attacking behavior of the Endboss.
     */
    attack() {
        setInterval(() => {
            if (this.world) {
                const distance = Math.abs(this.world.charakter.X - this.X);
                if (distance < 100 && !this.isAttacking && !this.isHurt && !this.isDead()) {
                    this.isAttacking = true;
                    this.animateImagesOnce(this.Images_ATTACK);
                    setTimeout(() => {
                        this.isAttacking = false;
                    }, 5000);
                }
            }
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
                }, i * 1000);
            }
        }
    }
} 