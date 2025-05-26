export class GameScene extends Phaser.Scene{

    constructor(){
        super('MainGame');
        this.player = null;
        this.cursors = null;
        this.background = null;
        
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
        this.background = this.add.tileSprite(400, 300, 800, 600, 'grass');  // 배경 tileSprite 이미지(무한 스크롤 가능)
        this.background.setTileScale(800/1024, 600/1024);  
        
        //player 추가
        this.player = this.physics.add.sprite(400, 300, 'dude');
        this.prevPlayerX = this.player.x;
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

        // 카메라 설정
        this.cameras.main.startFollow(this.player);  // 카메라가 target을 center에 두고 자동으로 따라다니도록 자동으로 scrollX,Y를 조정
        this.background.setScrollFactor(0);   //배경이 카메라 움직임에 영향을 받지 않게 함. 배경은 update()에서 따로 tilePosition으로 이동시킨다.
        //월드 상에서는 배경이 고정된 위치가 맞는데, 화면 상에서 고정돼있냐 아니냐 여부(0이면 카메라 영향을 안받아서 고정된 위치, 1이면 카메라 영향을 받아서 카메라가 움직이는 경우 화면에서 위치가 변해 보인다.)
    }

    update(time, delta){
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
            this.player.setVelocity(250, 0);   
            this.player.anims.play('right', true);

        } else if(u){
            this.player.setVelocity(0, -160);  
            
        } else if(d){
            this.player.setVelocity(0, 160);   
   
        }else{
            this.player.setVelocity(0, 0);
            this.player.anims.play('turn');
        }

        this.background.tilePositionX = this.cameras.main.scrollX;  //tilePosition은 내부적으로 modulo 연산처럼 동작해 카메라가 계속 오른쪽으로 움직여도 상관없다.
        this.background.tilePositionY = this.cameras.main.scrollY;     
    }

} 