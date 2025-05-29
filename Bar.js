export class Bar extends Phaser.GameObjects.Container{
    constructor(scene, x, y, outWidth, outHeight, inWidth, inHeight, outColor, inColor){
        super(scene, x, y);  //컨테이너의 x, y


        this.outBox = scene.add.rectangle(0, 0, outWidth, outHeight, outColor);  // x,y,w,h,color
        this.inBox = scene.add.rectangle(-outWidth / 2, 0, inWidth, inHeight, inColor);
        this.inBox.setOrigin(0, 0.5);

        
        this.add(this.outBox);  //컨테이너에 박스 부착
        this.add(this.inBox);

        scene.add.existing(this); //화면에 렌더링
        this.setScrollFactor(0);
        this.setDepth(10);  // 몬스터에 의해 바가 가려지지 않도록 렌더링 순서를 나중으로
    }

    setProgress(ratio) {
        console.log("setprogress");
        const clamped = Phaser.Math.Clamp(ratio, 0, 1);
        this.inBox.width = (this.outBox.width - 4) * clamped;



    }
}

