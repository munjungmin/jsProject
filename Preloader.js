export class Preloader extends Phaser.Scene{

    constructor(){
        super('Preloader');
    }

    preload(){
        // 사용할 이미지, 오디오 로드(리소스는 전역으로 관리됨)
        this.load.image('gamestart', 'assets/gamestart.png');
        this.load.image('dude', 'assets/dude.png');
        
    }

    create(){
        //전역 애니메이션 생성 
        //이미지를 씬에 추가하고 loading 변수에 저장
        this.loading = this.add.image(300, 200, 'gamestart'); 
        this.loading.setInteractive();  // 여기 추가해야 클릭 이벤트가 동작함

        // 이미지에 대한 이벤트리스너, once: 한번만 실행후 이벤트 제거
        this.loading.once('pointerdown', ()=>{
            this.scene.start('MainGame');
        });
    }

} 