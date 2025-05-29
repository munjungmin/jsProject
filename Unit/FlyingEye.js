import { Enemy } from "./Enemy.js";

const FLYINGEYE_HP = 10;
const FLYINGEYE_DAMAGE = 10;
const HITBOX_WIDTH = 32;
const HITBOX_HEIGHT = 20;
const HITBOX_X_OFFSET = 59;
const HITBOX_Y_OFFSET = 69;

export class FlyingEye extends Enemy {

    constructor(scene, x, y, textureKey){
        super(scene, x, y, textureKey);
        this.init();
    }

    init(){
        super.init();
        this.hp = FLYINGEYE_HP;
        this.damage = FLYINGEYE_DAMAGE;
        
        this.setSize(HITBOX_WIDTH, HITBOX_HEIGHT);  //이미지 크기 조정이 아니라 충돌 판정 영역(히트박스) 조정 
        this.setOffset(HITBOX_X_OFFSET, HITBOX_Y_OFFSET);  // 충돌 영역을 가운데로 조정 

        this.animKeys = {
            walk: 'flyingeye_flight',
            takehit: 'flyingeye_takehit',
            death: 'flyingeye_death'
        };

        this.anims.play(this.animKeys.walk, true);
    }
}