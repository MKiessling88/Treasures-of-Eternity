class CollectableHEART extends MoveableObjekt {
    images = [
        'img/collectable/heart/heart1.png',
        'img/collectable/heart/heart2.png',
        'img/collectable/heart/heart3.png',
        'img/collectable/heart/heart4.png',
        'img/collectable/heart/heart5.png',
        'img/collectable/heart/heart6.png',
        'img/collectable/heart/heart7.png',
        'img/collectable/heart/heart8.png',
        'img/collectable/heart/heart9.png',
        'img/collectable/heart/heart10.png',
    ];
    height = 25;
    width = 25;
    offset_X = 15;
    offset_Y = 30;
    offset_Width = 35;
    offset_Height = 15;

    constructor(x, y) {
        super();
        this.loadImage(this.images[0]);
        this.loadImages(this.images);
        this.X = x;
        this.Y = y;

        this.animate();
    }

        animate() {
        setInterval(() => {
            if (!this.isDead()) {
                this.animateImages(this.images);
            }
        }, 1000 / 5);
    }
}