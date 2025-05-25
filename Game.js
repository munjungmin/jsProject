export class Game extends Phaser.Scene{

    constructor(){
        super('MainGame');
    }            

    create(){
        //전역 애니메이션 생성 
        //이미지를 씬에 추가하고 loading 변수에 저장
        this.add.image(300, 200, 'dude'); 
        console.log("bbb");
        
    }

} 