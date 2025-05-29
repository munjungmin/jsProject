const textConfig = {fontSize: 20};

export default class PauseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseScene' });
    }

    create() {        
        const bg = this.add.rectangle(0, 0, 300, 200, 0x000000, 1).setOrigin(0.5);  //나중에는 이미지로 변경하기 
        const resume_text = this.add.text(-80, 0, 'Resume', textConfig).setInteractive();
        const exit_text = this.add.text(40, 0, 'Exit', textConfig).setInteractive();

        this.container = this.add.container(400, 300, [bg, resume_text, exit_text]);
        
        this.input.keyboard.on('keydown-ESC', () => { 
            this.resume();
        });
        
        resume_text.on('pointerdown', ()=>{
            this.resume();
        });

        exit_text.on('pointerdown', ()=>{
            this.exit();
        });
    }

    resume(){
        this.scene.stop();  
        this.scene.resume('GameScene');
    }

    exit(){
        this.scene.stop('GameScene');
        this.scene.start('MenuScene'); 
    }
}