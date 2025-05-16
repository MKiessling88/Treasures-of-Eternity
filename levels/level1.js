const level1 = new Level(
    [
        //new Goblin(),
        // new Goblin(),
        // new Goblin(),
        new Endboss(300),
    ],
    [
        new Cloud(-740),
        new Cloud(0),
        new Cloud(740),
        new Cloud(740 * 2),
        new Cloud(740 * 3),
        new Cloud(740 * 4),
    ],
    [
        new BackgroundObject(-740, 'img/background/bg.png'),
        new BackgroundObject(-740, 'img/background/rock5.png'),
        new BackgroundObject(-740, 'img/background/rock3.png'),
        new BackgroundObject(-740, 'img/background/rock1.png'),
        new BackgroundObject(-740, 'img/background/rock2.png'),

        new BackgroundObject(0, 'img/background/bg.png'),
        new BackgroundObject(0, 'img/background/rock5.png'),
        new BackgroundObject(0, 'img/background/rock3.png'),
        new BackgroundObject(0, 'img/background/rock1.png'),
        new BackgroundObject(0, 'img/background/rock2.png'),

        new BackgroundObject(740, 'img/background/bg.png'),
        new BackgroundObject(740, 'img/background/rock5.png'),
        new BackgroundObject(740, 'img/background/rock3.png'),
        new BackgroundObject(740, 'img/background/rock1.png'),
        new BackgroundObject(740, 'img/background/rock2.png'),

        new BackgroundObject(740 * 2, 'img/background/bg.png'),
        new BackgroundObject(740 * 2, 'img/background/rock5.png'),
        new BackgroundObject(740 * 2, 'img/background/rock3.png'),
        new BackgroundObject(740 * 2, 'img/background/rock1.png'),
        new BackgroundObject(740 * 2, 'img/background/rock2.png'),

        new BackgroundObject(740 * 3, 'img/background/bg.png'),
        new BackgroundObject(740 * 3, 'img/background/rock5.png'),
        new BackgroundObject(740 * 3, 'img/background/rock3.png'),
        new BackgroundObject(740 * 3, 'img/background/rock1.png'),
        new BackgroundObject(740 * 3, 'img/background/rock2.png'),
    ],
    [
        new Tileset('img/tilesets/tile2.png', -500, 390),
        new Tileset('img/tilesets/tile5.png', -500, 440),
    ],
    [
        new CollectableHEART(50, 370),
        new CollectablePotion(100, 370),
    ],
    2000);