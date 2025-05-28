import { Player } from "./Player.js";
import { Reaper } from "./Reaper.js";
import { Bar } from "./Bar.js";
import { Enemy } from "./Enemy.js";
import { FlyingEye } from "./Flyingeye.js";
import { Bullet } from "./Bullet.js";

export class GameScene extends Phaser.Scene{

    constructor(){
        super('MainGame');
        this.player = null;
        this.cursors = null;
        this.background = null;
        this.bullets = null;
        this.enemies = null;
    }            

    preload(){
        this.load.image('grass', 'assets/grass.png');
        this.load.image('bullet', 'assets/bomb.png');
        this.load.spritesheet(
            'dude', 
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
        this.load.spritesheet(
            'reaper', 
            'assets/monster/reaper/reapermove.png',
            { frameWidth: 48, frameHeight: 48 }
        );
        this.load.spritesheet(
            'flyingeye_flight',
            'assets/monster/flyingeye/flight.png',
            { frameWidth: 150, frameHeight: 150 }
        );
        this.load.spritesheet(
            'flyingeye_takehit',
            'assets/monster/flyingeye/takehit.png',
            { frameWidth: 150, frameHeight: 150 }
        );

        this.load.spritesheet(
            'flyingeye_death',
            'assets/monster/flyingeye/death.png',
            { frameWidth: 150, frameHeight: 150 }
        );

        
    }

    createEnemy(){
        let {x, y} = Enemy.getPosition(this.player.x, this.player.y);
        let enemy = new FlyingEye(this, x, y, 'flyingeye_flight');        
        enemy.init();
        this.enemies.add(enemy);
    }
    
    

    create(){
        //배경 
        this.background = this.add.tileSprite(400, 300, 800, 600, 'grass');  // 배경 tileSprite 이미지(무한 스크롤 가능)
        this.background.setTileScale(800/1024, 600/1024);  
        
        //player 추가
        this.player = new Player(this, 400, 300, 'dude');
        this.expbar = new Bar(this, 400, 12, 800, 25, 790, 20, 0xffffff, 0x558BCF);  // scene, x, y, outBox w/h inBox w/h, out color, in color
       
        this.enemies = this.physics.add.group({ classType: Enemy });
        this.bullets = this.physics.add.group({ classType: Bullet });

        this.physics.add.collider(this.enemies, this.enemies);
        

        // 일정 시간마다 enemy 랜덤 위치에 생성하는 타이머 이벤트         
        let timer = this.time.addEvent({
            delay: 500,
            callback: this.createEnemy,
            callbackScope: this,
            loop: true
        });
        
        // player와 enemy overlap 검사
        this.physics.add.overlap(
            this.player, 
            this.enemies, 
            function(player, enemy){
               if(enemy.isHitable()){
                    player.onHitEnemy(enemy);
               }
            },
            null, 
            this
        );

        //bullet과 enemy overlap 검사
        this.physics.add.overlap(   
            this.bullets, 
            this.enemies, 
            function(bullet, enemy){
               bullet.onHit();
               enemy.onHitBullet(bullet);
            },
            null, 
            this
        );

        // 기본공격 시간마다 발사
        this.time.addEvent({
            delay: 2500,
            callback: function() {
                this.player.fire();
            },
            callbackScope: this,
            loop: true
        });


        //키보드 매니저
        this.cursors = this.input.keyboard.createCursorKeys();

        this.createAnimations();

        // 카메라 설정
        this.cameras.main.startFollow(this.player);  // 카메라가 target을 center에 두고 자동으로 따라다니도록 자동으로 scrollX,Y를 조정
        this.background.setScrollFactor(0);   //배경이 카메라 움직임에 영향을 받지 않게 함. 배경은 update()에서 따로 tilePosition으로 이동시킨다.
        //월드 상에서는 배경이 고정된 위치가 맞는데, 화면 상에서 고정돼있냐 아니냐 여부(0이면 카메라 영향을 안받아서 고정된 위치, 1이면 카메라 영향을 받아서 카메라가 움직이는 경우 화면에서 위치가 변해 보인다.)





    }

    update(){
        this.player.move();
    
        // 배경 이동 
        this.background.tilePositionX = this.cameras.main.scrollX;  //tilePosition은 내부적으로 modulo 연산처럼 동작해 카메라가 계속 오른쪽으로 움직여도 상관없다.
        this.background.tilePositionY = this.cameras.main.scrollY;     
        
        //enemy가 플레이어를 따라 이동        
        for(let i = 0; i < this.enemies.children.entries.length; i++){
            let enemy = this.enemies.children.entries[i];
            enemy.move();
        }

    }

    createAnimations(){
        // Player Animations
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

        // Reaper Animations
        this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers('reaper', { start: 0, end: 7 }),
            repeat: -1
        });


        // flyingeye Animations
        this.anims.create({
            key: 'flyingeye_flight',
            frames: this.anims.generateFrameNumbers('flyingeye_flight', { start: 0, end: 7 }),
            repeat: -1
        });

        this.anims.create({
            key: 'flyingeye_takehit',
            frames: this.anims.generateFrameNumbers('flyingeye_takehit', { start: 0, end: 3 }),
            repeat: 0
        });

        this.anims.create({
            key: 'flyingeye_death',
            frames: this.anims.generateFrameNumbers('flyingeye_death', { start: 0, end: 3 }),
        });
    }

} 
