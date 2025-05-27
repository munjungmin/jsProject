export class Reaper extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, textureKey){
        super(scene, x, y, textureKey);

        scene.add.existing(this);  // 화면에 렌더링 
        scene.physics.add.existing(this);  //물리 엔진에 등록

    }


    update(){

    }
}