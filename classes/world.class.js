class World {
    charakter = new Charakter();
    canvas;
    ctx;
    keyboard;
    camera_X = 0;
    level;
    interface = [new Interface('img/interface/square_border_big_bg.png', 12.5, 12.5, 45, 45),
    new Interface('img/interface/con2.png', 12.5, 12.5, 45, 45),
    new Interface('img/interface/square_border_big_full_empty.png', 10, 10, 50, 50),
    new Interface('img/interface/stamina-energy-magic_bar_bg.png', 60, 12.5, 100, 45),
    new Interface('img/interface/hp_full.png', 60, 12.5, 100, 22.5),
    new Interface('img/interface/magic_full_bar.png', 60, 35, 100, 22.5),
    new Interface('img/interface/hp_bar_border.png', 60, 12.5, 100, 25),
    new Interface('img/interface/stamina-energy-magic_bar_border.png', 60, 35, 100, 22.5),
    ];
    projectils = [];
    intervals = [];
    sounds;

    constructor(canvas, keyboard, level, sounds) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;
        this.sounds = sounds;
        this,sounds.attack.volume = 0.2;
        this.sounds.explode.volume = 0.2;

        this.setWorld();
        this.draw();
        this.checkCollisions();
        this.updateClouds();
        this.generateTilesets();
    }

    /**
     * Sets the world of the charakter and all enemys in the level
     */
    setWorld() {
        this.charakter.world = this;
        this.level.enemys.forEach(enemy => {
            enemy.world = this;
        });
        this.charakter.animate();
        this.charakter.jump();
        this.charakter.attack();
        this.charakter.resourceGenerator();
        this.charakter.applyGravity();
    }
    
    /**
     * Clears the canvas, draws all objects of the backgroundObjects, enemys and clouds arrays and the charakter.
     * Then calls itself with requestAnimationFrame to draw the next frame.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.ctx.translate(this.camera_X, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.tilesets);
        this.addObjectsToMap(this.level.enemys);
        this.addObjectsToMap(this.level.collectables);
        this.addObjectsToMap(this.projectils);

        this.addToMap(this.charakter);

        this.ctx.translate(-this.camera_X, 0);

        this.addObjectsToMap(this.interface);

        let self = this;
        requestAnimationFrame(function () {
            self.draw()
        });
    }

    /**
     * Iterates over the given array of objects and calls the addToMap function for each of them.
     * @param {MoveableObjekt[]} objects - An array of objects of type MoveableObjekt or any subclass of it.
     */
    addObjectsToMap(objects) {
        objects.forEach(element => {
            this.addToMap(element);
        });
    }


    /**
     * Draws a given MoveableObjekt onto the canvas.
     * If the MoveableObjekt's otherDirection field is true, the image is drawn mirrored.
     * @param {MoveableObjekt} mo - The MoveableObjekt to draw.
     */
    addToMap(mo) {

        mo.drawFrame(this.ctx, mo);

        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.X + mo.width / 2, mo.Y); // Verschiebung zum richtigen Punkt
            this.ctx.scale(-1, 1); // Spiegeln
            this.ctx.drawImage(mo.Image, 0, 0, mo.width, mo.height); // Bild an der richtigen Position zeichnen
            this.ctx.restore();
        } else {
            this.ctx.drawImage(mo.Image, mo.X, mo.Y, mo.width, mo.height); // Normales Zeichnen
        }
    }

    /**
     * Checks for collisions between the player and enemies or collectables every 100ms.
     * If the player collides with an enemy, the player's hit() method is called.
     * If the player collides with a collectable and the player's life or mana is less than 100, the player's addResource() method is called.
     */
    checkCollisions() {
        this.intervals.push(setInterval(() => {
            this.checkEnemys();
            this.checkCollectables();
        }, 100));
    }

    /**
     * Checks for collisions between the character and each enemy in the level.
     * If a collision is detected and the enemy is not dead, the character's hit() method is called.
     */
    checkEnemys() {
        this.level.enemys.forEach((enemy) => {
            if (this.charakter.isCollidingWith(enemy) && !enemy.isDead()) {
                this.charakter.hit();
            }
        });
    }

    /**
     * Checks for collisions between the character and each collectable in the level.
     * If a collision is detected and the character's life or mana is less than 100, the character's addResource() method is called with the collectable and the resource type ('life' or 'mana').
     */
    checkCollectables() {
        this.level.collectables.forEach((collectable) => {
            if (this.charakter.isCollidingWith(collectable)) {
                if (collectable instanceof CollectableHEART && this.charakter.life < 100) {
                    this.charakter.addResource(collectable, 'life');
                }
                if (collectable instanceof CollectablePotion && this.charakter.mana < 100) {
                    this.charakter.addResource(collectable, 'mana');
                }
            }
        })
    }

    /**
     * Updates the clouds every 1000/60ms.
     * If the first cloud is no longer visible on the screen, it is removed and a new cloud is added to the end of the array.
     */
    updateClouds() {
        this.intervals.push(setInterval(() => {
            let firstCloud = this.level.clouds[0];
            if (firstCloud.X + firstCloud.width < -740) {
                this.level.clouds.shift();

                let lastCloud = this.level.clouds[this.level.clouds.length - 1];
                let newX = lastCloud.X + lastCloud.width;

                let newCloud = new Cloud(newX);
                this.level.clouds.push(newCloud);
            }
        }, 1000 / 60));
    };

    /**
     * Periodically checks and generates new tilesets in the level.
     * If the last tileset's position plus its width is within the level's length,
     * new tilesets are appended to the tilesets array at specified positions.
     * This ensures continuous generation of tiles as the player progresses.
     */
    generateTilesets() {
        this.intervals.push(setInterval(() => {
            let lastTileset = this.level.tilesets[this.level.tilesets.length - 1];
            let worldLength = this.level.levelLength + 800;
            if (lastTileset.X + lastTileset.width <= worldLength) {
                this.level.tilesets.push(new Tileset('img/tilesets/tile2.png', lastTileset.X + lastTileset.width, 390));
                this.level.tilesets.push(new Tileset('img/tilesets/tile5.png', lastTileset.X + lastTileset.width, 440));
            }
        }, 1000 / 60));
    }

    /**
     * Hides the game canvas and shows the end screen.
     * Called when the character has either won or lost the game.
     */
    renderEndScreen() {
        document.getElementById('canvas').style.display = 'none';
        document.getElementById('endscreen').classList.remove('hidden');
    }

    clearAllIntervals() {
    for (let i = 0; i < this.intervals.length; i++) {
        clearInterval(this.intervals[i]);
    }
    this.intervals = [];
}
}