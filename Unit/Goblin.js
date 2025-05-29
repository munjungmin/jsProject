import { Enemy } from "./Enemy.js";

const GOBLIN_HP = 20;
const GOBLIN_DAMAGE = 20;
const HITBOX_WIDTH = 32;
const HITBOX_HEIGHT = 32;
const HITBOX_X_OFFSET = 59;
const HITBOX_Y_OFFSET = 59;

export class Goblin extends Enemy {

    constructor(scene, x, y, textureKey){
        super(scene, x, y, textureKey);
        this.init();
    }

    init(){
        super.init();
        this.hp = GOBLIN_HP;
        this.damage = GOBLIN_DAMAGE;

        this.setSize(HITBOX_WIDTH, HITBOX_HEIGHT);  
        this.setOffset(HITBOX_X_OFFSET, HITBOX_Y_OFFSET);

        this.animKeys = {
            walk: 'goblin_run',
            takehit: 'goblin_takehit',
            death: 'goblin_death'
        };

        this.anims.play(this.animKeys.walk, true);
    }
}