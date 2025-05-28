import { Bar } from './Bar.js'; 
import { Bullet } from './Bullet.js';
import { GameOver } from './GameOver.js';

export class Player extends  Phaser.Physics.Arcade.Sprite{
    
    constructor(scene, x, y, textureKey){
        super(scene, x, y, textureKey);

        scene.add.existing(this);  // 화면에 렌더링 
        scene.physics.add.existing(this);  //물리 엔진에 등록

        this.hp = 10;
        this.hpbar = new Bar(scene, this.x, this.y+40, 60, 8, 58, 7, 0x000000, 0x9B111E);  // scene, x, y, outBox width/height
        this.tintTimer = null;

        this.cursors = scene.input.keyboard.createCursorKeys();
    }

    move(){
        let l = this.cursors.left.isDown;
        let r = this.cursors.right.isDown;
        let u = this.cursors.up.isDown;
        let d = this.cursors.down.isDown;

        if(l && u){
            this.setVelocity(-160, -160);   //1초당 움직이는 픽셀 수 
            this.anims.play('left', true);
        } else if(l && d){
            this.setVelocity(-160, 160);   
            this.anims.play('left', true);
        }else if(l){
            this.setVelocity(-160, 0);   
            this.anims.play('left', true);

        } else if(r && u){
            this.setVelocity(160, -160); 
            this.anims.play('right', true);
        } else if(r && d){
            this.setVelocity(160, 160);  
            this.anims.play('right', true);
        } else if(r){
            this.setVelocity(250, 0);   
            this.anims.play('right', true);
            

        } else if(u){
            this.setVelocity(0, -160);  
            
        } else if(d){
            this.setVelocity(0, 160);   
   
        }else{
            this.setVelocity(0, 0);
            this.anims.play('turn', true);
        }

    }

    onHitEnemy(enemy){
        this.hp -= enemy.damage;
        this.hpbar.setProgress(this.hp / 100);

        if(this.hp <= 0){
            this.die();    
        }

        // 1초동안 빨간색으로 표시되고, 그 이후엔 다시 원래 색으로 돌아오기
        // 근데 그 사이에 다른 몬스터에게 또 맞았다면 2번째 타이머가 또 작동하고 
        // 이전 몬스터에서 설정된 타이머 이벤트가 끝나면 2번째 타이머는 끝나지도 않았는데 1번 타이머가 끝나서 .clearTint가 호출되는 문제 발생 
        // 타이머를 하나로 두고 몬스터에게 피격을 입을때마다 시간 새로고침 필요 (타이머 이벤트를 삭제한 후 다시 addEvent) 
        this.setTint(0xff0000);
        if(this.tintTimer != null) {
            this.tintTimer.remove();
        }
        this.tintTimer = this.scene.time.addEvent({
            delay: 3000,
            callback: function(){
                this.clearTint();
                this.hitTimer = null;
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

    die(){
      //게임오버 씬으로 전환 
       
        let scene = this.scene;

            //  Get a random color
            const red = Phaser.Math.Between(50, 255);
            const green = Phaser.Math.Between(50, 255);
            const blue = Phaser.Math.Between(50, 255);
            this.scene.cameras.main.fade(2000, red, green, blue);


            this.scene.cameras.main.on(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                console.log(this.scene);
                scene.scene.start('GameOver');
            });


    }

}