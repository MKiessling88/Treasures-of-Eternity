const level1 = new Level(
    [
        new Goblin(),
        new Goblin(),
        new Goblin(),
        new Endboss(300),
    ],
    [
        new Cloud(-740),
        new Cloud(0),
        new Cloud(740),
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
    2000);