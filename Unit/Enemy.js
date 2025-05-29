const HIT_COOLTIME = 1500;
const DEFAULT_HP = 10;
const DEFAULT_DAMAGE = 8;

export class Enemy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, textureKey){
        super(scene, x, y, textureKey);        
    }

    init(){
        this.hp = this.hp || DEFAULT_HP;  // 없으면 기본값 10 
        this.damage = this.damage || DEFAULT_DAMAGE;
        this.lastHitTime = this.scene.time.now;

        this.expDropRate = 70;  //70% 확률

        this.scene.add.existing(this);  // 화면에 렌더링 
        this.scene.physics.add.existing(this);  //물리 엔진에 등록
    }
    
    move(){
        this.scene.physics.moveToObject(this, this.scene.player, 30);
    }
    
    isHitable(){  // 한 마리의 적에게 공격 당한 후 일정 시간이 지나고 다시 hit 가능 
        let currentTime = this.scene.time.now;
        let elapsedTime = currentTime - this.lastHitTime;

        if(elapsedTime >= HIT_COOLTIME){   
            this.lastHitTime = currentTime;
            return true;
        } else {
            return false;
        }
    }

    onHitBullet(bullet){
        this.playTakeHitAnim();
        this.hp -= bullet.damage;

        if(this.isDead()){
            this.die();

            if(this.canDropExp()){
                this.scene.createExpItem(this.x, this.y);
            }
        }
    }

    isDead(){
        return this.hp <= 0;
    }

    canDropExp(){
        return (Math.random() < this.expDropRate) ? true : false;
    }

    die(){
        this.scene.killedEnemyCount++;
        this.playDeathAnim();       
    }

    playTakeHitAnim(){
        this.anims.play(this.animKeys.takehit, true);
        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + this.animKeys.takehit, () => {
            this.anims.play(this.animKeys.walk, true); 
        });
    }
    playDeathAnim(){
        this.anims.play(this.animKeys.death, true);
        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + this.animKeys.death, () => {
            this.disableBody(true, true);
        });
    }

    static spawnPosition(playerX, playerY){
        const distance = 400;
        const direction = Phaser.Math.Between(0, 3); // l r t b
        let x = parseInt(playerX);
        let y = parseInt(playerY);

        switch(direction){
            case 0: 
                x -= distance;
                y += Phaser.Math.Between(-350, 350);
                break;
            case 1: 
                x += distance;
                y += Phaser.Math.Between(-350, 350);
                break;
            case 2:
                x += Phaser.Math.Between(-450, 450);
                y += distance;
                break;
            case 3:
                x += Phaser.Math.Between(-450, 450);
                y -= distance;
                break;
        }
        return {x, y};
    }
}