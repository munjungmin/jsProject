const BULLET_SPEED = 100;
const BULLET_DURATION = 2000;

export class Bullet extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x, y, textureKey){
        super(scene, x, y, textureKey);

        scene.add.existing(this);  // 화면에 렌더링 
        scene.physics.add.existing(this);  //물리 엔진에 등록

        this.damage = 8;
        this.direction = null;
        this.destroyTimer = null;
        this.setDirection();
        this.setTimer();
    }
    
    setDirection(){
        let enemy = this.scene.physics.closest(this, this.scene.enemies.children.entries);
        this.direction = new Phaser.Math.Vector2(enemy.x - this.x, enemy.y - this.y);
        this.direction.normalize(); // 단위 벡터로 정규화
    }

    move(){
        this.setVelocity(this.direction.x * BULLET_SPEED, this.direction.y * BULLET_SPEED);        
    }

    onHit(){
        this.scene.time.removeEvent(this.destroyTimer);
        this.disableBody(true, true);

        // 폭발 스프라이트를 로드하고 애니메이션 생성하긴 했어도 화면에 부착이 안돼있기 때문에 부착 
        const explosion = this.scene.add.sprite(this.x, this.y, 'bullet_explosion');
        explosion.play('bullet_explosion', true);
        explosion.on('animationcomplete', () => {
            explosion.destroy();
        });
    }

    // 2초 간 이동 후 적과 충돌하지 않으면 사라짐
    setTimer(){
        this.destroyTimer = this.scene.time.delayedCall(
            BULLET_DURATION,
            function(){
               this.disableBody(true, true);
                const disappear = this.scene.add.sprite(this.x, this.y, 'bullet_disappear');
                disappear.play('bullet_disappear', true);
                disappear.on('animationcomplete', () => {
                    disappear.destroy();
                });
            },
            null,
            this
        );
    }
}