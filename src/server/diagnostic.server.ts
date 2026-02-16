/**
 * Runs before runtime.server.ts (alphabetical order) to diagnose module resolution.
 * Uses only game:GetService - no node_modules imports.
 */
// #region agent log
const ReplicatedStorage = game.GetService("ReplicatedStorage");
const rbxtsInclude = ReplicatedStorage.FindFirstChild("rbxts_include");
const nodeModules = rbxtsInclude?.FindFirstChild("node_modules");
const flamework = nodeModules?.FindFirstChild("@flamework");
const core = flamework?.FindFirstChild("core");
const flameworkChildren = flamework ? flamework.GetChildren().map((c) => c.Name) : [];
print("[DEBUG] Module check:", {
	hasRbxtsInclude: !!rbxtsInclude,
	hasNodeModules: !!nodeModules,
	hasFlamework: !!flamework,
	hasCore: !!core,
	flameworkChildren,
});
// #endregion
