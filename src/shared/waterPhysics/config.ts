import type { WaterPhysicsConfig } from "./types";
import { PART_NAMES } from "./constants";

/** Default attributes for WaterZone component */
export const DEFAULT_WATER_CONFIG: WaterPhysicsConfig = {
	density: 1,
	drag: 2,
	buoyancy: 1.2,
	enableWaves: true,
};

/** Water appearance shared by WaterPhysicsService and WaterZone */
export const WATER_APPEARANCE = {
	color: new Color3(0.2, 0.5, 0.9),
	transparency: 0.5,
} as const;

/** Floor configuration for demo */
export const FLOOR_CONFIG = {
	name: PART_NAMES.FLOOR,
	size: new Vector3(64, 1, 64),
	position: new Vector3(0, 4, 0),
	material: Enum.Material.Concrete,
	color: new Color3(0.4, 0.4, 0.45),
} as const;

/** Water pool configuration for demo */
export const WATER_POOL_CONFIG = {
	name: PART_NAMES.WATER_POOL,
	size: new Vector3(32, 4, 32),
	position: new Vector3(0, 6, 0),
	material: Enum.Material.Water,
	color: new Color3(0.2, 0.5, 0.9),
	transparency: 0.5,
} as const;

/** Physical properties: density, friction, elasticity */
export interface PhysicalProps {
	density: number;
	friction: number;
	elasticity: number;
}

/** Test object configuration for buoyancy demo */
export interface TestObjectConfig {
	name: string;
	size: Vector3;
	position: Vector3;
	physicalProperties: PhysicalProps;
	color: Color3;
	material: Enum.Material;
}

/** Spawn offset above water surface for test objects */
const WATER_SURFACE_Y = 8;
const SPAWN_OFFSET = 3;
const SPAWN_Y = WATER_SURFACE_Y + SPAWN_OFFSET;

/** Test objects for buoyancy demonstration */
export const TEST_OBJECTS: readonly TestObjectConfig[] = [
	{
		name: PART_NAMES.FLOATER,
		size: new Vector3(2, 2, 2),
		position: new Vector3(-6, SPAWN_Y, 0),
		physicalProperties: { density: 0.5, friction: 0.3, elasticity: 0.5 },
		color: new Color3(1, 0.8, 0.2),
		material: Enum.Material.Plastic,
	},
	{
		name: PART_NAMES.SINKER,
		size: new Vector3(2, 2, 2),
		position: new Vector3(0, SPAWN_Y, 0),
		physicalProperties: { density: 2, friction: 0.3, elasticity: 0.5 },
		color: new Color3(0.6, 0.3, 0.2),
		material: Enum.Material.Concrete,
	},
	{
		name: PART_NAMES.NEUTRAL,
		size: new Vector3(2, 2, 2),
		position: new Vector3(6, SPAWN_Y, 0),
		physicalProperties: { density: 1, friction: 0.3, elasticity: 0.5 },
		color: new Color3(0.5, 0.8, 0.5),
		material: Enum.Material.Wood,
	},
] as const;
