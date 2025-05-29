export class AnimationScene extends Phaser.Scene{

    constructor(){
        super('AnimationScene');
    }

    create(){
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'flyingeye_flight',
            frames: this.anims.generateFrameNumbers('flyingeye_flight', { start: 0, end: 7 }),
            repeat: -1
        });

        this.anims.create({
            key: 'flyingeye_takehit',
            frames: this.anims.generateFrameNumbers('flyingeye_takehit', { start: 0, end: 3 }),
        });

        this.anims.create({
            key: 'flyingeye_death',
            frames: this.anims.generateFrameNumbers('flyingeye_death', { start: 0, end: 3 }),
        });

        this.anims.create({
            key: 'goblin_run',
            frames: this.anims.generateFrameNumbers('goblin_run', { start: 0, end: 7 }),
            repeat: -1
        });

        this.anims.create({
            key: 'goblin_takehit',
            frames: this.anims.generateFrameNumbers('goblin_takehit', { start: 0, end: 3 }),
            repeat: 0
        });

        this.anims.create({
            key: 'goblin_death',
            frames: this.anims.generateFrameNumbers('goblin_death', { start: 0, end: 3 }),
        });

        this.anims.create({
            key: 'skeleton_walk',
            frames: this.anims.generateFrameNumbers('skeleton_walk', { start: 0, end: 3 }),
            repeat: -1
        });

        this.anims.create({
            key: 'skeleton_takehit',
            frames: this.anims.generateFrameNumbers('skeleton_takehit', { start: 0, end: 3 }),
            repeat: 0
        });

        this.anims.create({
            key: 'skeleton_death',
            frames: this.anims.generateFrameNumbers('skeleton_death', { start: 0, end: 3 }),
        });

        this.anims.create({
            key: 'bullet_explosion',
            frames: this.anims.generateFrameNumbers('bullet_explosion', { start: 12, end: 18 }),
        });
        this.anims.create({
            key: 'bullet_disappear',
            frames: this.anims.generateFrameNumbers('bullet_disappear', { start: 0, end: 7 }),
        });

        this.scene.start('MenuScene');
    }
} 