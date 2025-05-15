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
        // 'img/charakter/jump/jump7.png',
    ]
    world;
    isJumping = false;

    constructor() {
        super();
        this.loadImage('img/charakter/mage.png');
        this.loadImages(this.Images_WALK);
        this.loadImages(this.Images_JUMP);

        this.animate();
        this.applyGravity();
        this.jump();
    }

    animate() {
        setInterval(() => {
            if (!this.isDead()) {
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
            if (this.world.keyboard.RIGHT && this.isOnGround() && !this.isDead() || this.world.keyboard.LEFT && this.isOnGround() && !this.isDead()) {
                this.animateImages(this.Images_WALK);
            }
        }, 80);
    }

    jump() {
        setInterval(() => {
            const spacePressed = this.world.keyboard.SPACE;

            if (spacePressed && this.isOnGround() && !this.isJumping && !this.isDead()) {
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

    camera() {
        // Kamera-Versatz berechnen
        let cameraTarget = -this.X + 100;
        // Begrenzungen für die Kamera
        let maxCameraOffset = -this.world.level.levelLength - 100; // Kamera hört bei 2000px auf
        let minCameraOffset = 500;     // Kamera geht nicht weiter als zum Anfang

        this.world.camera_X = Math.max(Math.min(cameraTarget, minCameraOffset), maxCameraOffset);
    }
}