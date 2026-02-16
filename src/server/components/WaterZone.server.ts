import { BaseComponent, Component } from "@flamework/components";
import { DEFAULT_WATER_CONFIG, WaterPhysicsConfig } from "shared/waterPhysics/types";

@Component({
	tag: "WaterZone",
	defaults: {
		density: 1,
		drag: 2,
		buoyancy: 1.2,
		enableWaves: true,
	},
})
export class WaterZone extends BaseComponent<WaterPhysicsConfig, Part> {
	density = 1;
	drag = 2;
	buoyancy = 1.2;
	enableWaves = true;

	onStart() {
		const part = this.instance;
		part.CanCollide = true;
		part.Anchored = true;
		part.Transparency = 0.5;
		part.Color = new Color3(0.2, 0.5, 0.9);
		part.Material = Enum.Material.Water;

		print(`[WaterZone] Initialized at ${part.Position}`);
	}
}
