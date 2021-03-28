import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import { GameEventType } from "../../../Wolfie2D/Events/GameEventType";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { EaseFunctionType } from "../../../Wolfie2D/Utils/EaseFunctions";
import { HW4_Events } from "../../hw4_enums";
import { PlayerStates } from "../PlayerController";
import InAir from "./InAir";

export default class Jump extends InAir {
	owner: AnimatedSprite;

	onEnter(options: Record<string, any>): void {
		this.owner.animation.play("JUMP", true);
		this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "jump", loop: false, holdReference: false});
	}

	handleInput(event: GameEvent): void {}

	update(deltaT: number): void {
		super.update(deltaT);

		if(this.owner.onCeiling){
			let size=this.parent.tilemap.getTileSize()
			let tileData=this.parent.tilemap.getTileAtWorldPosition(new Vec2(this.owner.sweptRect.x,this.owner.sweptRect.y-size.y))
			if(tileData===17){
				let coords = this.parent.tilemap.getColRowAt(new Vec2(this.owner.sweptRect.x,this.owner.sweptRect.y-size.y))
				this.parent.tilemap.setTileAtRowCol(coords,18)

				this.parent.coin.position.set(this.owner.sweptRect.x, this.owner.sweptRect.y-size.y);
        		this.parent.coin.scale.set(2, 2);


				this.parent.coin.tweens.add("float",{
					startDelay: 0,
					duration: 50,
					effects: [
						{
							property: "positionY",
							start: this.owner.sweptRect.y-size.y,
							end: this.owner.sweptRect.y-size.y-50,
							ease: EaseFunctionType.OUT_SINE
						}
					]
				})

				this.parent.coin.tweens.add("fade",{
					startDelay: 0,
					duration: 50,
					effects: [
						{
							property: "alpha",
							start: 1,
							end: 0,
							ease: EaseFunctionType.OUT_SINE
						}
					]
				})

				this.parent.coin.tweens.play('float',false)
				this.parent.coin.tweens.play('fade',false)
				this.emitter.fireEvent(HW4_Events.PLAYER_HIT_COIN_BLOCK)
				
			}
			
			this.parent.velocity.y = 0;
		}

		// If we're falling, go to the fall state
		if(this.parent.velocity.y >= 0){
			this.finished(PlayerStates.FALL);
		}
	}

	onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {};
	}
}