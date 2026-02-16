/**
 * Water physics configuration and types
 */
export interface WaterPhysicsConfig {
	/** Density of water (affects buoyancy) */
	density: number;
	/** Drag coefficient when moving through water */
	drag: number;
	/** Buoyancy force multiplier */
	buoyancy: number;
	/** Whether to apply wave motion */
	enableWaves: boolean;
}

export const DEFAULT_WATER_CONFIG: WaterPhysicsConfig = {
	density: 1,
	drag: 2,
	buoyancy: 1.2,
	enableWaves: true,
};
