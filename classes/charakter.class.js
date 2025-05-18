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
    jumpSound = new Audio('sounds/jump.mp3');
    attackSound = new Audio('sounds/attack.mp3');

    constructor() {
        super();
        this.loadImage('img/charakter/mage.png');
        this.loadImages(this.Images_WALK);
        this.loadImages(this.Images_JUMP);
        this.loadImages(this.Images_DEAD);
        this.loadImages(this.Images_HURT);
        this.loadImages(this.Images_ATTACK);
        this.attackSound.volume = 0.2;

        this.animate();
        this.applyGravity();
        this.jump();
        this.attack();
        this.resourceGenerator();
    }

    /**
     * Animates the character by setting up two intervals:
     * 1. The first interval handles the movement of the character based on keyboard inputs,
     *    updating the character's position and direction if the character is not dead.
     *    It checks if the RIGHT or LEFT keys are pressed and moves the character accordingly,
     *    along with maintaining the camera position.
     * 
     * 2. The second interval handles the character's walking animation by switching images
     *    if the RIGHT or LEFT keys are pressed, the character is on the ground, not dead,
     *    not attacking, and not jumping. If the character is idle (not attacking, not dead,
     *    not jumping, and not hurt), it resets the character's image to its default.
     * 
     * Both intervals run at different frame rates to ensure smooth animation and movement.
     */
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
            if (this.world.keyboard.RIGHT && this.isOnGround() && !this.isDead() && !this.isAttacking || this.world.keyboard.LEFT && this.isOnGround() && !this.isDead() && !this.isAttacking) {
                this.animateImages(this.Images_WALK);
            } else if (!this.isAttacking && !this.isDead() && !this.isJumping && !this.isHurt) {
                this.loadImage('img/charakter/mage.png');
            }
        }, 80);
    }

    /**
     * Handles the jumping behavior of the character.
     * Sets up an interval to monitor the SPACE key and the character's state.
     * If the SPACE key is pressed and the character is on the ground, not jumping,
     * not dead, and not attacking, it initiates a jump by setting the vertical speed
     * and playing the jump animation. The character's jumping state is updated accordingly.
     * Once the character lands back on the ground and the SPACE key is not pressed,
     * the jumping state is reset.
     */
    jump() {
        setInterval(() => {
            const spacePressed = this.world.keyboard.SPACE;

            if (spacePressed && this.isOnGround() && !this.isJumping && !this.isDead() && !this.isAttacking) {
                this.speedY = -8;
                this.animateImagesOnce(this.Images_JUMP);
                this.playSound(this.jumpSound);
                this.isJumping = true;
            }
            if (this.isOnGround() && !spacePressed) {
                this.isJumping = false;
            }
        }, 1000 / 60);
    }    

    /**
     * Handles the attacking behavior of the character.
     * Sets up an interval to monitor the X key and the character's state.
     * If the X key is pressed, the character is not already attacking, and has at least 20 mana,
     * it initiates an attack by reducing the mana, playing the attack animation, and firing a projectile.
     * The character's attacking state is updated accordingly.
     * The attacking state is reset after the animation duration.
     */
    attack() {
        setInterval(() => {
            if (this.world.keyboard.X && !this.isAttacking && this.mana >= 20) {
                this.isAttacking = true;
                this.animateImagesOnce(this.Images_ATTACK);
                this.playSound(this.attackSound);
                this.world.projectils.push(new Projectil(this.X + 45, this.Y + 25, this.otherDirection, this.world));
                this.mana -= 10;

                // Setze Flag nach Ende der Animation wieder zurück
                setTimeout(() => {
                    this.isAttacking = false;
                }, 1000);
            }
        }, 1000 / 60); // 60 FPS → häufig genug, aber effizient
    }

    /**
     * Adds the given resource to the character and removes the collectable from the level.
     * @param {Collectable} collectable - The collectable to remove from the level.
     * @param {string} resource - The resource to add to the character ('life' or 'mana').
     */
    addResource(collectable, resource) {
        if (resource === 'life') {
            this.life += 50;
            if (this.life > 100) {
                this.life = 100;
            }
        }
        if (resource === 'mana') {
            this.mana += 50;
            if (this.mana > 100) {
                this.mana = 100;
            }
        }
        this.world.level.collectables.splice(this.world.level.collectables.indexOf(collectable), 1);
        this.resourceBarSync();
    }

    /**
     * Calculates the camera's offset based on the character's position.
     * The camera's offset is clamped to ensure it doesn't move beyond the start or end of the level.
     */
    camera() {
        // Kamera-Versatz berechnen
        let cameraTarget = -this.X + 100;
        // Begrenzungen für die Kamera
        let maxCameraOffset = -this.world.level.levelLength - 100; // Kamera hört bei 2000px auf
        let minCameraOffset = 500;     // Kamera geht nicht weiter als zum Anfang

        this.world.camera_X = Math.max(Math.min(cameraTarget, minCameraOffset), maxCameraOffset);
    }

    /**
     * Generates resources (mana) for the character over time.
     * If the character's mana is less than 100, 1 mana is added every second.
     * The character's win or lose condition is also checked every second.
     */
    resourceGenerator() {
        setInterval(() => {
            if (this.mana < 100) {
                this.mana += 1;
            }
            this.resourceBarSync();
            this.winOrLose();
        }, 1000);
    }

    /**
     * Checks the win or lose condition for the character.
     * If the character is dead, sets the end screen image to a losing graphic and renders the end screen.
     * If there are no enemies left in the level, sets the end screen image to a winning graphic and renders the end screen.
     */
    winOrLose() {
        if (this.isDead()) {
            document.getElementById('actionButtons').classList.add('hidden');
            document.getElementById('endscreenImage').src = 'img/interface/knight_loose.png';
            this.world.renderEndScreen();
        }
        if (this.world.level.enemys.length === 0) {
            document.getElementById('actionButtons').classList.add('hidden');
            document.getElementById('endscreenImage').src = 'img/interface/knight_win.png';
            this.world.renderEndScreen();
        }
    }
}