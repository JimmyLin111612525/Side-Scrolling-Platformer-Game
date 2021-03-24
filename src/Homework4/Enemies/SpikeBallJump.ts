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
		
		// if(event.type === HW4_Events.PLAYER_MOVE && this.parent.spikeball){
		// 	console.log('spikeball change')
		// 	let pos = event.data.get("position");
		// 	if(this.owner.position.x - pos.x < 200){
		// 		console.log('spikeball jump')
		// 	}else{
		// 		console.log('spikeball idle')
		// 	}
		// }
		if(event){
			this.event=event;
		}
	}

	update(deltaT: number): void {
		super.update(deltaT);


		if(this.parent.spikeball){
			let pos = this.event.data.get("position");
			if(this.owner.position.x - pos.x < 100){
				console.log('spikeball jump')
				this.finished(EnemyStates.JUMP);
				this.parent.velocity.y = -300;
			}else{
				console.log('spikeball idle: ', this.owner.id)
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