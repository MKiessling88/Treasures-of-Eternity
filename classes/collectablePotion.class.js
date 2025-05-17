class CollectablePotion extends MoveableObjekt {
    images = [
        'img/collectable/crystal/crystal1.png',
        'img/collectable/crystal/crystal2.png',
        'img/collectable/crystal/crystal3.png',
        'img/collectable/crystal/crystal4.png',
        'img/collectable/crystal/crystal5.png',
        'img/collectable/crystal/crystal6.png',
        'img/collectable/crystal/crystal7.png',
        'img/collectable/crystal/crystal8.png',
        'img/collectable/crystal/crystal9.png',
        'img/collectable/crystal/crystal10.png',
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

    /**
     * Animates the potion by switching between the images every 200ms.
     * The function is called every 200ms to update the animation.
     * @function
     * @memberof CollectablePotion
     */
    animate() {
        setInterval(() => {
            this.animateImages(this.images);
        }, 1000 / 5);
    }
}