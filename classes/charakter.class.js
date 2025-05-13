class Charakter extends MoveableObjekt{
    X = 100; 
    Y = 320;
    width = 100;
    height = 100;
    Images_WALK = [
        'img/charakter/idle/idle1.png',
        'img/charakter/idle/idle2.png',
        'img/charakter/idle/idle3.png',
        'img/charakter/idle/idle4.png',
        'img/charakter/idle/idle5.png',
        'img/charakter/idle/idle6.png',
        'img/charakter/idle/idle7.png',
        'img/charakter/idle/idle8.png',
        'img/charakter/idle/idle9.png',
        'img/charakter/idle/idle10.png',
        'img/charakter/idle/idle11.png',
        'img/charakter/idle/idle12.png',
        'img/charakter/idle/idle13.png',
        'img/charakter/idle/idle14.png',
    ];
    currentImage = 0;
    world;

    constructor(){
        super();
        this.loadImage('img/charakter/mage.png');
        this.loadImages(this.Images_WALK);

        this.animate();
    }

    animate(){
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.world.keyboard.LEFT) {
                let path = this.Images_WALK[this.currentImage];
                this.Image = this.imageCache[path];
                this.currentImage = (this.currentImage + 1) % this.Images_WALK.length;
                console.log('test'); 
            }
        },1000/5);
    }

    jump(){

    }
}