
export class ExpBar extends Phaser.GameObjects.Graphics{
    constructor(scene){
        super(scene);
        scene.add.existing(this);  
        this.setScrollFactor(0);
        this.setDepth(20);
        
        this.x = 0;
        this.y = 0;
        this.width = 800;
        this.height = 25;
        this.draw();
    }

    draw(expRatio){
        this.clear();

        this.fillStyle(0x160D08, 0.9); //내부 사각형
        this.fillRoundedRect(this.x, this.y, this.width, this.height, 8);

        this.lineStyle(2, 0xd4af37, 1); // 테두리
        this.strokeRoundedRect(this.x, this.y, this.width, this.height, 8);


        this.fillStyle(0x1460BE, 1); //경험치
        this.fillRoundedRect(this.x + 2, this.y + 2, (this.width - 4) * expRatio, this.height - 4, 6);
    }
}
