export default class MenuScene extends Phaser.Scene {

    constructor() {
        super('MenuScene'); 
    }

    create(){
        const add = this.add;
        const scene = this;
        WebFont.load({
            google: {
                families: [ 'New Rocker' ]
            },
            active: function ()
            {
                add.text(400, 300, 'Fake Vampire Survivor', { 
                    fontFamily: 'New Rocker', 
                    fontSize: 80, color: '#d4af37'
                 }).setShadow(2, 2, '#333333', 2, false, true).setOrigin(0.5, 0.5).setInteractive();

                this.text = add.text(400, 400, 'click here to start', { 
                    fontFamily: 'New Rocker', 
                    fontSize: 25, color: '#ffffff'
                }).setShadow(2, 2, '#333333', 2, false, true).setOrigin(0.5, 0.5).setInteractive();

                this.text.on('pointerdown', function(){
                        scene.scene.start('GameScene');
                });           
            }
        });
    }
    
}