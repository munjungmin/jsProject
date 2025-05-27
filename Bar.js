export class Bar extends Phaser.GameObjects.Container{
    constructor(scene, x, y){
        super(scene, x, y);

        this.border = scene.add.rectangle(fillColor = 0xffff00);
        
    }
}