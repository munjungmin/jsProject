export class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, textureKey){
        super(scene, x, y, textureKey);

        scene.add.existing(this);  // 화면에 렌더링 
        scene.physics.add.existing(this);  //물리 엔진  에 등록

        this.hp;
        this.damage;
        this.lastHitTime = scene.time.now;
    }


    
    static getPosition(playerX, playerY){
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

    init(){
        console.log("enemy.init()");

     }

    move(){
        this.scene.physics.moveToObject(this, this.scene.player, 30);
    }
    isHitable(){}
    onHitBullet(){}
    die(){}
}