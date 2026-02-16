/**
 * Centralized string literals and identifiers for water physics.
 * Use these constants instead of magic strings across the codebase.
 */
export const WATER_ZONE_TAG = "WaterZone";

export const PART_NAMES = {
	FLOOR: "WaterPhysicsFloor",
	WATER_POOL: "WaterPool",
	FLOATER: "Floater",
	SINKER: "Sinker",
	NEUTRAL: "Neutral",
} as const;
