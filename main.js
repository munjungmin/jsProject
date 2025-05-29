import { Preloader } from "./Scene/Preloader.js";
import { AnimationScene } from "./Scene/AnimationScene.js";
import MenuScene from "./Scene/MenuScene.js";
import { GameScene } from "./Scene/GameScene.js";
import LevelUpScene from "./Scene/LevelUpScene.js";
import PauseScene from "./Scene/PauseScene.js";
import { GameOver } from "./Scene/GameOver.js";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2c0d0d',
    pixelArt: true,
    physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: false
            }
        },
    scene:[ Preloader, AnimationScene, MenuScene, GameScene, LevelUpScene, PauseScene, GameOver]
};

let game = new Phaser.Game(config);