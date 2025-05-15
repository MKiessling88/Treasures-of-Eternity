class Charakter extends MoveableObjekt {
    X = 100;
    Y = 100;
    width = 100;
    height = 100;
    offset_X = 15;
    offset_Y = 40;
    offset_Width = 35;
    offset_Height = 50;
    Images_WALK = [
        'img/charakter/walk/walk1.png',
        'img/charakter/walk/walk2.png',
        'img/charakter/walk/walk3.png',
        'img/charakter/walk/walk4.png',
        'img/charakter/walk/walk5.png',
        'img/charakter/walk/walk6.png',
    ];
    Images_JUMP = [
        'img/charakter/jump/jump1.png',
        'img/charakter/jump/jump2.png',
        'img/charakter/jump/jump3.png',
        'img/charakter/jump/jump4.png',
        'img/charakter/jump/jump5.png',
        'img/charakter/jump/jump6.png',
    ]
    Images_DEAD = [
        'img/charakter/dead/death1.png',
        'img/charakter/dead/death2.png',
        'img/charakter/dead/death3.png',
        'img/charakter/dead/death4.png',
        'img/charakter/dead/death5.png',
        'img/charakter/dead/death6.png',
        'img/charakter/dead/death7.png',
        'img/charakter/dead/death8.png',
        'img/charakter/dead/death9.png',
        'img/charakter/dead/death10.png',
    ];
    Images_HURT = [
        'img/charakter/hurt/hurt1.png',
        'img/charakter/hurt/hurt2.png',
        'img/charakter/hurt/hurt3.png',
        'img/charakter/hurt/hurt4.png',
    ];
    Images_ATTACK = [
        'img/charakter/attack/attack1.png',
        'img/charakter/attack/attack2.png',
        'img/charakter/attack/attack3.png',
        'img/charakter/attack/attack4.png',
        'img/charakter/attack/attack5.png',
        'img/charakter/attack/attack6.png',
        'img/charakter/attack/attack7.png',
    ]
    world;
    isJumping = false;

    constructor() {
        super();
        this.loadImage('img/charakter/mage.png');
        this.loadImages(this.Images_WALK);
        this.loadImages(this.Images_JUMP);
        this.loadImages(this.Images_DEAD);
        this.loadImages(this.Images_HURT);
        this.loadImages(this.Images_ATTACK);

        this.animate();
        this.applyGravity();
        this.jump();
        this.attack();
        this.resourceGenerator();
    }

    animate() {
        setInterval(() => {
            if (!this.isDead() && !this.isAttacking) {
                if (this.world.keyboard.RIGHT && this.X < this.world.level.levelLength + this.world.canvas.width - 50) {
                    this.X += 3;
                    this.otherDirection = false;
                }
                if (this.world.keyboard.LEFT && this.X > -400) {
                    this.X -= 3;
                    this.otherDirection = true;
                }
            }
            this.camera();
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.isOnGround() && !this.isDead() && !this.isAttacking || this.world.keyboard.LEFT && this.isOnGround() && !this.isDead() && !this.isAttacking) {
                this.animateImages(this.Images_WALK);
            } else if (!this.isAttacking && !this.isDead() && !this.isJumping && !this.isHurt) {
                this.loadImage('img/charakter/mage.png');
            }
        }, 80);
    }

    jump() {
        setInterval(() => {
            const spacePressed = this.world.keyboard.SPACE;

            if (spacePressed && this.isOnGround() && !this.isJumping && !this.isDead() && !this.isAttacking) {
                this.speedY = -8;
                this.animateImagesOnce(this.Images_JUMP); // Nur 1x!
                this.isJumping = true;
            }

            // Zurücksetzen wenn wieder gelandet
            if (this.isOnGround() && !spacePressed) {
                this.isJumping = false;
            }
        }, 1000 / 60);
    }

attack() {
    setInterval(() => {
        if (this.world.keyboard.X && !this.isAttacking && this.mana >= 20) {
            this.isAttacking = true;
            this.animateImagesOnce(this.Images_ATTACK);
            this.world.projectils.push(new Projectil(this.X + 45, this.Y + 25, this.otherDirection, this.world));
            this.mana -= 20;

            // Setze Flag nach Ende der Animation wieder zurück
            setTimeout(() => {
                this.isAttacking = false;
            }, 1000);
        }
    }, 1000 / 60); // 60 FPS → häufig genug, aber effizient
}


    camera() {
        // Kamera-Versatz berechnen
        let cameraTarget = -this.X + 100;
        // Begrenzungen für die Kamera
        let maxCameraOffset = -this.world.level.levelLength - 100; // Kamera hört bei 2000px auf
        let minCameraOffset = 500;     // Kamera geht nicht weiter als zum Anfang

        this.world.camera_X = Math.max(Math.min(cameraTarget, minCameraOffset), maxCameraOffset);
    }

    resourceGenerator() {
        setInterval(() => {
            if (this.mana < 100) {
                this.mana += 1;
            }
        }, 1000);
    }
}