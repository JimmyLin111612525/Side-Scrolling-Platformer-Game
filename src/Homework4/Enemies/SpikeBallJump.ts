import GameEvent from "../../Wolfie2D/Events/GameEvent";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { EnemyStates } from "./EnemyController";
import EnemyState from "./EnemyState";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";


export default class SpikeBallJump extends EnemyState  {
	event: GameEvent

	onEnter(): void {
		this.parent.speed = this.parent.speed;
		(<AnimatedSprite>this.owner).animation.play("IDLE", true);
	}

	handleInput(event: GameEvent) {
		if(event){
			this.event=event;
		}
	}

	update(deltaT: number): void {
		super.update(deltaT);


		if(this.parent.spikeball){
			let pos = this.event.data.get("position");
			const a = this.owner.position.x - pos.x;
			const b =this.owner.position.y - pos.y;
			const dist = Math.sqrt( a*a + b*b );
			if(dist < 50){
				this.finished(EnemyStates.JUMP);
				this.parent.velocity.y = -300;
			}else{
				this.finished(EnemyStates.IDLE);
			}
		}

		
		// if(this.owner.onGround){
		// 	this.finished(EnemyStates.JUMP);
		// }

		// if(this.owner.onCeiling){
		// 	this.parent.velocity.y = 0;
		// }

		// this.parent.velocity.x += this.parent.direction.x * this.parent.speed/3.5 - 0.3*this.parent.velocity.x;

		// this.owner.move(this.parent.velocity.scaled(deltaT));
	}

	onExit(): Record<string, any> {
		(<AnimatedSprite>this.owner).animation.stop();
		(<AnimatedSprite>this.owner).tweens.stop("jump");
		return {};
	}
}