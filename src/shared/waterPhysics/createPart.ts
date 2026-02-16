import {
	FLOOR_CONFIG,
	WATER_POOL_CONFIG,
	TEST_OBJECTS,
	type TestObjectConfig,
} from "./config";

export interface CreatePartOptions {
	name: string;
	size: Vector3;
	position: Vector3;
	material: Enum.Material;
	color: Color3;
	anchored?: boolean;
	canCollide?: boolean;
	transparency?: number;
	customPhysicalProperties?: PhysicalProperties;
}

/**
 * Creates a Part with the given options.
 * Parents to Workspace by default; caller can reparent if needed.
 */
export function createPart(options: CreatePartOptions): Part {
	const part = new Instance("Part");
	part.Name = options.name;
	part.Size = options.size;
	part.Position = options.position;
	part.Material = options.material;
	part.Color = options.color;
	part.Anchored = options.anchored ?? false;
	part.CanCollide = options.canCollide ?? true;

	if (options.transparency !== undefined) {
		part.Transparency = options.transparency;
	}
	if (options.customPhysicalProperties !== undefined) {
		part.CustomPhysicalProperties = options.customPhysicalProperties;
	}

	return part;
}

/**
 * Creates a water Part from WATER_POOL_CONFIG.
 * Applies water-specific defaults (anchored, canCollide, transparency).
 */
export function createWaterPart(): Part {
	const config = WATER_POOL_CONFIG;
	const part = createPart({
		name: config.name,
		size: config.size,
		position: config.position,
		material: config.material,
		color: config.color,
		anchored: true,
		canCollide: true,
		transparency: config.transparency,
	});
	return part;
}

/**
 * Creates a floor Part from FLOOR_CONFIG.
 */
export function createFloorPart(): Part {
	const config = FLOOR_CONFIG;
	return createPart({
		name: config.name,
		size: config.size,
		position: config.position,
		material: config.material,
		color: config.color,
		anchored: true,
		canCollide: true,
	});
}

/**
 * Creates a test object Part from TestObjectConfig.
 */
export function createTestObjectPart(config: TestObjectConfig): Part {
	const { physicalProperties } = config;
	const part = createPart({
		name: config.name,
		size: config.size,
		position: config.position,
		material: config.material,
		color: config.color,
		anchored: false,
		canCollide: true,
		customPhysicalProperties: new PhysicalProperties(
			physicalProperties.density,
			physicalProperties.friction,
			physicalProperties.elasticity,
		),
	});
	return part;
}

/**
 * Creates all demo test objects (floater, sinker, neutral).
 */
export function createAllTestObjects(): Part[] {
	return TEST_OBJECTS.map((config) => createTestObjectPart(config));
}
