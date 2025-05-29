const textConfig = {
    fontSize: '20px', 
    color: '#ffffff' // 문자열로 지정
};

export default class LevelUpScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelUpScene' });
    }

    create() {        
        const bg = this.add.graphics();
        bg.fillStyle(0x000000, 0.7);
        bg.fillRect(0, 0, 800, 600);
        this.text = this.add.text(400, 300, 'Press Enter to proceed to the next level!', textConfig);
        this.text.setOrigin(0.5, 0.5);
        this.text.setDepth(20);

        this.input.keyboard.on('keydown-ENTER', () => { 
            this.scene.stop();  
            this.scene.resume('GameScene'); 
        });
    }
}