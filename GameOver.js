
export class GameOver extends Phaser.Scene{
    constructor(){
        super('GameOver');

    }

    preload(){
        //this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }
    create(){

        const add = this.add;
        const scene = this;
        WebFont.load({
            google: {
                families: [ 'Freckle Face', 'Finger Paint', 'Nosifer' ]
            },
            active: function ()
            {
                this.text = add.text(400, 300, 'Game Over', { fontFamily: 'Freckle Face', fontSize: 80, color: '#0f0000' }).setShadow(2, 2, '#333333', 2, false, true).setOrigin(0.5, 0.5).setInteractive();
                this.text.on('pointerdown', function(){
                        console.log("hell");
                        scene.scene.start('GameScene');
                        
                    });           
            }
        });
    }



    update(){
        
    }
    
}
