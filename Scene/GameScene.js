import { Player } from "../Unit/Player.js";
import { Enemy } from "../Unit/Enemy.js";
import { FlyingEye } from "../Unit/FlyingEye.js";
import { Bullet } from "../Bullet.js";
import { ExpItem } from "../ExpItem.js";
import { Goblin } from "../Unit/Goblin.js";
import { Skeleton } from "../Unit/Skeleton.js";
import { ExpBar } from "../ExpBar.js";

const ATTACK_COOLTIME = 2000;
const ATTACK_COOLTIME_DECREMENT = 800;
const LV1_ENEMY_COOLTIME = 100;
const LV2_ENEMY_COOLTIME = 200;
const LV3_ENEMY_COOLTIME = 250;

export class GameScene extends Phaser.Scene{

    constructor(){
        super('GameScene');
  
        this.init();
        this.spawnRules = [
            { level: 0, type: 'flyingeye', interval: LV1_ENEMY_COOLTIME },
            { level: 1, type: 'goblin', interval: LV2_ENEMY_COOLTIME },
            { level: 2, type: 'skeleton', interval: LV3_ENEMY_COOLTIME }
        ];
    }    

    init(){
        this.count = 0;
        this.level = 0;
        this.attack_cooltime = ATTACK_COOLTIME;
        this.player = null;
        this.background = null;
        this.bullets = null;
        this.enemies = null;
        this.attackTimer = null;
        this.killedEnemyCount = 0;
    }
    
    create(){
        //this.testBar = new ExpBar(this);
        this.init();
        this.createGameObject();
        this.setupCollisions();
        this.setupAutoAttack();
        this.setupPauseKeyEvent();        
    }
    
    createGameObject(){
        this.createBackground();
        this.player = new Player(this, 400, 300, 'dude');
        this.cameras.main.startFollow(this.player);  // 카메라가 target을 center에 두고 자동으로 따라다니도록 자동으로 scrollX,Y를 조정
        this.createLevelText();
        this.createPhysicsGroup();
    }
    createBackground(){
        this.background = this.add.tileSprite(400, 300, 800, 600, 'grass');  // 배경 tileSprite 이미지(무한 스크롤 가능)
        this.background.setTileScale(800/1024, 600/1024);  
        this.background.setScrollFactor(0);   //배경이 카메라 움직임에 영향을 받지 않게 함. 배경은 update()에서 따로 tilePosition으로 이동시킨다.
         //월드 상에서는 배경이 고정된 위치가 맞는데, 화면 상에서 고정돼있냐 아니냐 여부(0이면 카메라 영향을 안받아서 고정된 위치, 1이면 카메라 영향을 받아서 카메라가 움직이는 경우 화면에서 위치가 변해 보인다.)
    }
    createLevelText(){
        this.levelText = this.add.text(790, 3, 'Lv ' + (this.level+1),{fontStyle: 'bold', fontSize: 20, color: '#ffffff'});
        this.levelText.setOrigin(1, 0);
        this.levelText.setDepth(30);
        this.levelText.setScrollFactor(0);
    }
    createPhysicsGroup(){
        this.enemies = this.physics.add.group({ classType: Enemy });
        this.bullets = this.physics.add.group({ classType: Bullet });
        this.exps = this.physics.add.group({ classType: ExpItem });
        this.physics.add.collider(this.enemies, this.enemies);
    }

    createEnemy(enemytype){
        //레벨에 따라 몬스터 종류 증가 
        console.log(enemytype);
        let {x, y} = Enemy.spawnPosition(this.player.x, this.player.y);

        let enemy;
        switch(enemytype){
            case 'flyingeye':
                enemy = new FlyingEye(this, x, y, 'flyingeye_flight');        
                break;
            case 'goblin':
                enemy = new Goblin(this, x, y, 'goblin_run');
                break;
            case 'skeleton':
                enemy = new Skeleton(this, x, y, 'goblin_walk');
                break;
        }    
        enemy.init();
        this.enemies.add(enemy);
    }
    createExpItem(x, y){
        let exp = new ExpItem(this, x, y, 'star');
        this.exps.add(exp);
    }

    //overlap 체크 등록  //겹치는지만 검사, 충돌에 대한 반응 처리 없음 
    setupCollisions(){
        // player와 enemy overlap 
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

        //player와 expItem overlap 검사
        this.physics.add.overlap(
            this.player,
            this.exps,
            function(player, exp){
                player.collectExpItem(exp.expValue);
                exp.disableBody(true, true);
            },
            null,
            this
        )
    }
    setupAutoAttack(){
        // 기본공격 시간마다 발사
        this.attackTimer = this.time.addEvent({
            delay: this.attack_cooltime,
            callback: function() {
                if(this.enemies.countActive(true) > 0) {
                    this.player.fire();
                }
            },
            callbackScope: this,
            loop: true
        });
    }

    setupPauseKeyEvent(){
        this.input.keyboard.on('keydown-ESC', () => { 
            this.scene.pause(); 
            this.scene.launch('PauseScene');
        });        
    }

    update(){
        this.count++;

        // 배경 이동 
        this.background.tilePositionX = this.cameras.main.scrollX;  //tilePosition은 내부적으로 modulo 연산처럼 동작해 카메라가 계속 오른쪽으로 움직여도 상관없다.
        this.background.tilePositionY = this.cameras.main.scrollY;     

        // unit, bullet 이동
        this.player.move();
    
        for(let i = 0; i < this.enemies.children.entries.length; i++){
            let enemy = this.enemies.children.entries[i];
            enemy.move();
        }
        for(let i = 0; i < this.bullets.children.entries.length; i++){
            let bullet = this.bullets.children.entries[i];
            bullet.move();
        }

        this.spawnRules.forEach(rule => {
            if (this.level >= rule.level && this.count % rule.interval === 0) {
                this.createEnemy(rule.type);
            }
        });
    }

    levelUp(){
        this.level++;
        if(this.level < 3){
            this.attack_cooltime -= ATTACK_COOLTIME_DECREMENT;
            this.attackTimer.delay = this.attack_cooltime;
        }
        this.levelText.setText('Lv ' + (this.level+1));
        this.scene.pause();
        this.scene.launch('LevelUpScene');
    }
}

