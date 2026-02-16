/**
 * Water physics module - barrel export for clean imports.
 * @example import { WATER_ZONE_TAG, createWaterPart, DEFAULT_WATER_CONFIG } from "shared/waterPhysics"
 */
export { WATER_ZONE_TAG, PART_NAMES } from "./constants";
export {
	DEFAULT_WATER_CONFIG,
	WATER_APPEARANCE,
	FLOOR_CONFIG,
	WATER_POOL_CONFIG,
	TEST_OBJECTS,
	type TestObjectConfig,
	type PhysicalProps,
} from "./config";
export {
	createPart,
	createWaterPart,
	createFloorPart,
	createTestObjectPart,
	createAllTestObjects,
	type CreatePartOptions,
} from "./createPart";
export type { WaterPhysicsConfig } from "./types";
