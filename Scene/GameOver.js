
export class GameOver extends Phaser.Scene{

    constructor(){
        super('GameOver');
    }

    create(){
        WebFont.load({
            google: {
                families: ['New Rocker']
            },
            active: () =>
            {
                const gameScene = this.scene.get('GameScene');

                this.add.text(400, 250, 'Game Over', { 
                    fontFamily: 'New Rocker' , 
                    fontSize: 80, color: '#d4af37'
                }).setShadow(2, 2, '#333333', 2, false, true)
                .setOrigin(0.5, 0.5);
                
                this.add.text(400, 350, `killed: ${gameScene.killedEnemyCount} \nsurvived: Lv ${gameScene.level + 1}`, { 
                    fontStyle: 'bold',
                    fontSize: 25, color: '#d4af37'
                }).setShadow(2, 2, '#333333', 2, false, true)
                .setOrigin(0.5, 0.5);


                this.text = this.add.text(400, 500, 'Click here to restart', { 
                    fontFamily: 'New Rocker' , 
                    fontSize: 25, color: '#ffffff'
                }).setShadow(2, 2, '#333333', 2, false, true)
                .setOrigin(0.5, 0.5).setInteractive();

                this.text.on('pointerdown', function(){
                        this.scene.scene.start('GameScene');
                });           
            }   
        });
    }
}
