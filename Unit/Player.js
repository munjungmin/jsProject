import { Bar } from '../Bar.js'; 
import { Bullet } from '../Bullet.js';
import { ExpBar} from '../ExpBar.js';

const TOTAL_HP = 100;
const INITIAL_REQUIRED_EXP = 20;
const EXP_INCREMENT = 20;
const VELOCITY = 250;
const TINT_DURATION = 1500;   // 빨갛게 타격 표시 되는 지속시간

export class Player extends  Phaser.Physics.Arcade.Sprite{
    
    constructor(scene, x, y, textureKey){
        super(scene, x, y, textureKey);

        scene.add.existing(this);  
        scene.physics.add.existing(this);
        
        this.totalHp = TOTAL_HP;
        this.hp = this.totalHp;
        this.hpbar = new Bar(scene, this.x, this.y+40, 60, 8, 60, 7, 0x000000, 0x9B111E);  // scene, x, y, outBox width/height

        this.currentExp = 0;
        this.requiredExp = INITIAL_REQUIRED_EXP;
        //this.expbar = new Bar(scene, 400, 12, 800, 25, 0, 20, 0xffffff, 0xff8BCF);  // scene, x, y, outBox w/h inBox w/h, out color, in color
        this.expbar = new ExpBar(scene);
        
    
        this.tintTimer = null;
        this.cursors = scene.input.keyboard.createCursorKeys();
    }

    move(){
        let l = this.cursors.left.isDown;
        let r = this.cursors.right.isDown;
        let u = this.cursors.up.isDown;
        let d = this.cursors.down.isDown;

        let vx = 0;
        let vy = 0;

        if (r) vx += 1;
        if (l) vx -= 1;
        if (u) vy -= 1;
        if (d) vy += 1;

        // 모든 방향으로 일정한 속도로 이동하도록 정규화
        const velocity = new Phaser.Math.Vector2(vx, vy).normalize().scale(VELOCITY);
        this.setVelocity(velocity.x, velocity.y);

        if (vx > 0) {
            this.anims.play('right', true);
        } else if (vx < 0) {
            this.anims.play('left', true);
        } else {
            this.anims.play('turn', true);
        }
    }

    onHitEnemy(enemy){
        this.hp -= enemy.damage;
        this.hpbar.setProgress(this.hp / this.totalHp);

        if(this.hp <= 0){
            this.die();    
        }

        this.setTint(0xff0000); // 1초동안 타격 표시
        if(this.tintTimer != null) {
            this.tintTimer.remove();
        }

        this.tintTimer = this.scene.time.addEvent({
            delay: TINT_DURATION,
            callback: function(){
                this.clearTint();
                this.tintTimer = null;   //피격을 입을때마다 타이머 초기화 (타이머 이벤트를 삭제한 후 다시 addEvent)
            },
            callbackScope: this
        });
    }

    //기본공격
    fire(){
        let bullet = new Bullet(this.scene, this.x, this.y, 'bullet');
        this.scene.bullets.add(bullet);

        bullet.move();
    }

    
    collectExpItem(expValue){
        this.currentExp += expValue;
        this.expbar.draw(this.currentExp / this.requiredExp);
        if(this.currentExp >= this.requiredExp){
            this.levelInit();
            this.scene.levelUp();
        }
    }
    
    levelInit(){
        this.currentExp = 0;
        this.expbar.setProgress(0);
        this.requiredExp += EXP_INCREMENT;
    }

    die(){
        this.disableBody(true, false);

        this.scene.cameras.main.fade(2000, 0xd4af37);
        this.scene.cameras.main.on(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            this.scene.scene.start('GameOver');
        });
    }
}