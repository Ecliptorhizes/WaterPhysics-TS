import { Service, OnStart } from "@flamework/core";
import { CollectionService, Workspace } from "@rbxts/services";
import {
	WATER_ZONE_TAG,
	createFloorPart,
	createWaterPart,
	createAllTestObjects,
} from "shared/waterPhysics";

/**
 * Orchestrates water physics demo: floor, water pool, and test objects.
 * Uses shared config and part factories. Water is tagged for WaterZone component.
 */
@Service({})
export class WaterPhysicsService implements OnStart {
	onStart() {
		Workspace.FindFirstChild("Baseplate")?.Destroy();

		const floor = this.spawnFloor();
		const water = this.spawnWater();
		const testParts = this.spawnTestObjects();

		print("[WaterPhysicsService] Water physics demo initialized");
		print(
			"[WaterPhysicsService] Spawned:",
			floor.Name,
			floor.Position,
			water.Name,
			water.Position,
			...testParts.map((p) => `${p.Name}@${p.Position}`),
		);
	}

	private spawnFloor() {
		const floor = createFloorPart();
		floor.Parent = Workspace;
		return floor;
	}

	private spawnWater() {
		const water = createWaterPart();
		water.Parent = Workspace;
		CollectionService.AddTag(water, WATER_ZONE_TAG);
		return water;
	}

	private spawnTestObjects() {
		const parts = createAllTestObjects();
		for (const part of parts) {
			part.Parent = Workspace;
		}
		return parts;
	}
}
