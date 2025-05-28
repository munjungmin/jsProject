export class Bullet extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, textureKey){
        super(scene, x, y, textureKey);

        scene.add.existing(this);  // 화면에 렌더링 
        scene.physics.add.existing(this);  //물리 엔진에 등록

        this.damage = 8;        
    }

    
    move(){
        let enemy = this.scene.physics.closest(this, this.scene.enemies.children.entries);
        this.scene.physics.moveToObject(this, enemy, 50);
    }

    onHit(){
        this.disableBody(true, true);
    }
    
}