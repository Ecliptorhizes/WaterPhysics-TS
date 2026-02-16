/**
 * DataStore configuration and identifiers.
 * Separate from water physics for modularity.
 */
export const DATASTORE_NAME = "WaterPhysics";

/** Default template for new player data */
export const DEFAULT_PLAYER_DATA_TEMPLATE = {
	level: 0,
	coins: 0,
} as const;
