import { Enemy } from "./Enemy.js";

export class Reaper extends Enemy {
    constructor(scene, x, y, textureKey){
        super(scene, x, y, textureKey);

        this.damage = 10;
        this.lastHitTime = scene.time.now;
        console.log(this.lastHitTime);
    }


    isHitable(){
        let cur_time = this.scene.time.now;
        if(cur_time - this.lastHitTime >= 2000){   //한번 접촉 후 2초가 지난 후에 공격 가능 
            this.lastHitTime = cur_time;
            return true;
        }
        else {
            return false;
        }
    }
    
}