/**
 * Water physics interfaces and types.
 * Default values live in config.ts.
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
