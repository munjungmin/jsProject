import { Enemy } from "./Enemy.js";
export class FlyingEye extends Enemy {
    constructor(scene, x, y, textureKey){
        super(scene, x, y, textureKey);

        this.damage = 5;
        this.hp = 10;
        this.lastHitTime = scene.time.now;        
    }

    move(){
        //this.anims.play('flyingeye_flight', true);
        super.move();
    }

    isHitable(){
        let cur_time = this.scene.time.now;
        if(cur_time - this.lastHitTime >= 2000){   //한번 접촉 후 2초가 지난 후에 공격 가능 
            this.lastHitTime = cur_time;
            return true;
        }
        else {
            return false;
        }
    }

    init(){
        console.log("flyingeye.init()");
        
        this.setSize(32, 32);  //이미지 크기 조정이 아니라 충돌 판정 영역 조정 
        this.setOffset(59, 59);  // 충돌 영역을 가운데로 조정 
        this.anims.play('flyingeye_flight', true); 
    }

    onHitBullet(bullet){
        console.log("flyingeye.onhitbullet");
        this.anims.play('flyingeye_takehit', true);
        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + 'flyingeye_takehit', () => {
            this.anims.play('flyingeye_flight', true); // takehit 끝나고 flight로
        });

        this.hp -= bullet.damage;

        if(this.hp <= 0){
            console.log("die");
            this.die();
        }
    }

    die(){
        this.anims.play('flyingeye_death', true);
        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + 'flyingeye_death', () => {
            this.disableBody(true, true);
        })
    }
}