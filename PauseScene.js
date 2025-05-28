export default class PauseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseUI', active: true }); // 항상 활성화
    }

    create() {
        this.input.keyboard.on('keydown-ESC', () => {
            const mainScene = this.scene.get('GameScene'); // 실제 게임 씬 이름으로 바꾸세요

            if (mainScene.scene.isPaused()) {
                mainScene.scene.wake(); // 다시 시작
                console.log("게임 재개");
            } else {
                mainScene.scene.pause(); // 일시정지
                console.log("게임 일시정지");
            }
        });
    }
}