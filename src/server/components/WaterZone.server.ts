import { BaseComponent, Component } from "@flamework/components";
import {
	DEFAULT_WATER_CONFIG,
	WATER_APPEARANCE,
	type WaterPhysicsConfig,
} from "shared/waterPhysics";

/** Tag must match WATER_ZONE_TAG in shared/waterPhysics/constants */
@Component({
	tag: "WaterZone",
	defaults: {
		density: DEFAULT_WATER_CONFIG.density,
		drag: DEFAULT_WATER_CONFIG.drag,
		buoyancy: DEFAULT_WATER_CONFIG.buoyancy,
		enableWaves: DEFAULT_WATER_CONFIG.enableWaves,
	},
})
export class WaterZone extends BaseComponent<WaterPhysicsConfig, Part> {
	onStart() {
		const part = this.instance;
		part.CanCollide = true;
		part.Anchored = true;
		part.Transparency = WATER_APPEARANCE.transparency;
		part.Color = WATER_APPEARANCE.color;
		part.Material = Enum.Material.Water;

		print(`[WaterZone] Initialized at ${part.Position}`);
	}
}
