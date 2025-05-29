import { Enemy } from "./Enemy.js";

const SKELETON_HP = 30;
const SKELETON_DAMAGE = 30;
const HITBOX_WIDTH = 32;
const HITBOX_HEIGHT = 50;
const HITBOX_X_OFFSET = 59;
const HITBOX_Y_OFFSET = 45;

export class Skeleton extends Enemy {

    constructor(scene, x, y, textureKey){
        super(scene, x, y, textureKey);
        this.init();
    }

    init(){
        super.init();
        this.hp = SKELETON_HP;
        this.damage = SKELETON_DAMAGE;

        this.setSize(HITBOX_WIDTH, HITBOX_HEIGHT);  
        this.setOffset(HITBOX_X_OFFSET, HITBOX_Y_OFFSET); 

        this.animKeys = {
            walk: 'skeleton_walk',
            takehit: 'skeleton_takehit',
            death: 'skeleton_death'
        };

        this.anims.play(this.animKeys.walk, true);
    }
}