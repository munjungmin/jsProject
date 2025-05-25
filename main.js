import { Preloader } from "./Preloader.js";
import { Game } from "./Game.js";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#AAAAAA',
    scene:[ Preloader, Game]
};

let game = new Phaser.Game(config);