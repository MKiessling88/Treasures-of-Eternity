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
    offset_X = 0;
    offset_Y = 0;
    offset_Width = 25;
    offset_Height = 25;

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
                this.animateImages(this.images);
        }, 1000 / 5);
    }
}