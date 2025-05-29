
export class ExpBar extends Phaser.GameObjects.Graphics{
    constructor(scene){
        super(scene);
        scene.add.existing(this);  
        this.setScrollFactor(0);
        this.setDepth(50);
        
        this.x = 0;
        this.y = 0;
        this.width = 800;
        this.height = 25;
        this.draw();
    }

    draw(expRatio){
        this.clear();

        this.lineStyle(2, 0x1a1a1a, 1); // 테두리
        this.strokeRoundedRect(this.x, this.y, this.width, this.height, 8);

        this.fillStyle(0x2c2c2c, 1); //내부 사각형
        this.fillRoundedRect(this.x, this.y, this.width, this.height, 8);

        this.fillStyle(0xd4af37, 1); //경험치
        this.fillRoundedRect(this.x + 2, this.y + 2, (this.width - 4) * expRatio, this.height - 4, 6);
    }
}
