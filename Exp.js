export class Exp extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, textureKey){
        super(scene, x, y, textureKey);

        scene.add.existing(this);  
        scene.physics.add.existing(this); 

        this.expValue = 10;
    }
}