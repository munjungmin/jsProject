export class HpBar extends Phaser.GameObjects.Rectangle{
    constructor(scene, x, y, width, height, fillColor){
        super(scene, x, y, width, height, fillColor);

        scene.add.existing(this);  // 화면에 렌더링 
    }

}