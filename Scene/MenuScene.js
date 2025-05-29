export default class MenuScene extends Phaser.Scene {

    constructor() {
        super('MenuScene'); 
    }

    create(){
        WebFont.load({
            google: {
                families: [ 'New Rocker' ]
            },
            active: () =>
            {
                this.add.text(400, 300, 'Fake Vampire Survivor', { 
                    fontFamily: 'New Rocker', 
                    fontSize: 80, color: '#d4af37'
                 }).setShadow(2, 2, '#333333', 2, false, true).setOrigin(0.5, 0.5).setInteractive();

                this.text = this.add.text(400, 400, 'click here to start', { 
                    fontFamily: 'New Rocker', 
                    fontSize: 25, color: '#ffffff'
                }).setShadow(2, 2, '#333333', 2, false, true).setOrigin(0.5, 0.5).setInteractive();

                this.text.on('pointerdown', function(){
                        this.scene.scene.start('GameScene');
                });           
            }
        });
    }
}