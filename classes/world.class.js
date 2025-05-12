class World {
    charakter = new Charakter();
    enemys = [
        new Goblin(),
        new Goblin(),
        new Goblin(),
    ];
    clouds = [
        new Cloud(0),
        new Cloud(740),
    ];
    backgroundObjects = [
        new BackgrounfObject(0, 'img/background/bg.png'),
        new BackgrounfObject(0, 'img/background/rock5.png'),
        new BackgrounfObject(0, 'img/background/rock3.png'),
        new BackgrounfObject(0, 'img/background/rock1.png'),
        new BackgrounfObject(0, 'img/background/rock2.png'),
    ];
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.draw();
    }

    /**
     * Clears the canvas, draws all objects of the backgroundObjects, enemys and clouds arrays and the charakter.
     * Then calls itself with requestAnimationFrame to draw the next frame.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemys);

        this.addToMap(this.charakter);

        let self = this;
        requestAnimationFrame(function () {
            self.draw() });
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
     * Draws the given MoveableObjekt instance on the canvas at its specified position.
     * @param {MoveableObjekt} mo - The object to be drawn on the canvas.
     */
    addToMap(mo){
        this.ctx.drawImage(mo.Image, mo.X, mo.Y, mo.width, mo.height);
    }
}