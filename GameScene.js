export class GameScene extends Phaser.Scene{

    constructor(){
        super('MainGame');
        this.player = null;
        this.cursors = null;
    }            

    preload(){
        this.load.image('grass', 'assets/grass.png');
        this.load.spritesheet(
            'dude', 
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    
    create(){
        //배경 
        let image = this.add.tileSprite(400, 300, 800, 600, 'grass');  // 배경 tileSprite 이미지(무한 스크롤 가능)
        image.setTileScale(800/1024, 600/1024);  
        
        //player 추가
        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setCollideWorldBounds(true);
        console.log(this.player);
        //키보드 매니저
        this.cursors = this.input.keyboard.createCursorKeys();
        console.log(this.cursors.up);
        // 애니메이션 생성
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        
    }

    update(){
        // 플레이어 이동
        let l = this.cursors.left.isDown;
        let r = this.cursors.right.isDown;
        let u = this.cursors.up.isDown;
        let d = this.cursors.down.isDown;

        
        if(l && u){
            this.player.setVelocity(-160, -160);   //1초당 움직이는 픽셀 수 
            this.player.anims.play('left', true);
        } else if(l && d){
            this.player.setVelocity(-160, 160);   
            this.player.anims.play('left', true);
        }else if(l){
            this.player.setVelocity(-160, 0);   
            this.player.anims.play('left', true);
        } else if(r && u){
            this.player.setVelocity(160, -160); 
            this.player.anims.play('right', true);
        } else if(r && d){
            this.player.setVelocity(160, 160);  
            this.player.anims.play('right', true);
        } else if(r){
            this.player.setVelocity(160, 0);   
            this.player.anims.play('right', true);
        } else if(u){
            this.player.setVelocity(0, -160);  
            
        } else if(d){
            this.player.setVelocity(0, 160);   
            
        }

        else{
            this.player.setVelocity(0, 0);
            this.player.anims.play('turn');
        }
    }

} 