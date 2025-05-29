export class Preloader extends Phaser.Scene{

    constructor(){
        super('Preloader');
    }

    preload(){        
        this.load.image('grass', '../assets/grass.png');
        this.load.image('bullet', '../assets/bomb.png');
        this.load.image('star', '../assets/star.png');
        
        this.load.spritesheet(
            'dude', 
            '../assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
        this.load.spritesheet(
            'flyingeye_flight',
            '../assets/monster/flyingeye/flight.png',
            { frameWidth: 150, frameHeight: 150 }
        );
        this.load.spritesheet(
            'flyingeye_takehit',
            '../assets/monster/flyingeye/takehit.png',
            { frameWidth: 150, frameHeight: 150 }
        );
        this.load.spritesheet(
            'flyingeye_death',
            '../assets/monster/flyingeye/death.png',
            { frameWidth: 150, frameHeight: 150 }
        );
        this.load.spritesheet(
            'goblin_run',
            '../assets/monster/goblin/run.png',
            { frameWidth: 150, frameHeight: 150 }
        );
        this.load.spritesheet(
            'goblin_takehit',
            '../assets/monster/goblin/takehit.png',
            { frameWidth: 150, frameHeight: 150 }
        );
        this.load.spritesheet(
            'goblin_death',
            '../assets/monster/goblin/death.png',
            { frameWidth: 150, frameHeight: 150 }
        );
        this.load.spritesheet(
            'skeleton_walk',
            '../assets/monster/skeleton/walk.png',
            { frameWidth: 150, frameHeight: 150 }
        );
        this.load.spritesheet(
            'skeleton_takehit',
            '../assets/monster/skeleton/takehit.png',
            { frameWidth: 150, frameHeight: 150 }
        );
        this.load.spritesheet(
            'skeleton_death',
            '../assets/monster/skeleton/death.png',
            { frameWidth: 150, frameHeight: 150 }
        );
        this.load.spritesheet(
            'bullet_explosion', 
            '../assets/bullet_explosion.png',
            { frameWidth: 100, frameHeight: 100 }
        );
        this.load.spritesheet(
            'bullet_disappear', 
            '../assets/bullet_disappear.png',
            { frameWidth: 48, frameHeight: 48 }
        );

        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }

    create(){
        this.scene.start('AnimationScene');
    }
} 