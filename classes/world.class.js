class World {
    charakter = new Charakter();
    canvas;
    ctx;
    keyboard;
    camera_X = 0;
    level;

    constructor(canvas, keyboard, level) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;

        this.setWorld();
        this.draw();
        this.checkEnemyCollisions();

    }

    setWorld() {
        this.charakter.world = this;
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
        this.addObjectsToMap(this.level.enemys);

        this.addToMap(this.charakter);

        this.ctx.translate(-this.camera_X, 0);

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

    checkEnemyCollisions() {
        setInterval(() => {
            this.level.enemys.forEach((enemy) => {
                if (this.charakter.isCollidingWith(enemy)) {
                    this.charakter.hit();
                    console.log(this.charakter.life);
                }
            });
        }, 100);
    }

}