import { Preloader } from "./Preloader.js";
import { GameScene } from "./GameScene.js";
import { GameOver } from "./GameOver.js";
import PauseScene from "./PauseScene.js";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#AAAAAA',
    pixelArt: true,
    physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: false
            }
        },
    //scene:[ Preloader, GameScene]
    scene:[ GameScene,PauseScene, GameOver]
};

let game = new Phaser.Game(config);