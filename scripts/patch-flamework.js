/**
 * Fixes Flamework sync for Rojo:
 * 1. default.project.json in each out/ folder keeps it as a Folder with all siblings
 *    (init.meta.json is ignored when $path points to a directory)
 * 2. RuntimeLib patch allows requiring Folders by using their init child
 * 3. Flamework init uses script (self) but siblings need script.Parent - patch init.luau
 */
const fs = require("fs");
const path = require("path");

// 1. Patch Flamework init.luau - use script.Parent to find siblings (init runs as out.init, siblings are out.reflect etc.)
const initPatches = [
	{ path: "node_modules/@flamework/core/out/init.luau", from: /TS\.import\(script, script, /g, to: "TS.import(script, script.Parent, " },
	{ path: "node_modules/@flamework/components/out/init.luau", from: /TS\.import\(script, script, /g, to: "TS.import(script, script.Parent, " },
	{ path: "node_modules/@flamework/networking/out/init.luau", from: /TS\.import\(script, script, /g, to: "TS.import(script, script.Parent, " },
];
for (const { path: p, from, to } of initPatches) {
	if (fs.existsSync(p)) {
		let content = fs.readFileSync(p, "utf8");
		content = content.replace(from, to);
		fs.writeFileSync(p, content);
		console.log("Patched", p, "for script.Parent");
	}
}

// 2. Copy init.luau to _init.luau to avoid Rojo bug (init.luau as $path fails - issue #1016)
//    Then we reference _init.luau and rename the Instance to "init" via the project key
const initCopies = [
	"node_modules/@flamework/core/out",
	"node_modules/@flamework/components/out",
	"node_modules/@flamework/networking/out",
];
for (const dir of initCopies) {
	const src = path.join(dir, "init.luau");
	const dest = path.join(dir, "_init.luau");
	if (fs.existsSync(src)) {
		fs.copyFileSync(src, dest);
		console.log("Copied init.luau -> _init.luau in", dir);
	}
}

// 3. Patch RuntimeLib to require init when module is a Folder
const runtimePath = "include/RuntimeLib.lua";
if (fs.existsSync(runtimePath)) {
	let content = fs.readFileSync(runtimePath, "utf8");
	const newCheck = `if module.ClassName ~= "ModuleScript" then
		if module.ClassName == "Folder" then
			local init = module:FindFirstChild("init")
			if init and init.ClassName == "ModuleScript" then
				module = init
			else
				error(OUTPUT_PREFIX .. "Failed to import! Expected ModuleScript, got " .. module.ClassName, 2)
			end
		else
			error(OUTPUT_PREFIX .. "Failed to import! Expected ModuleScript, got " .. module.ClassName, 2)
		end
	end`;
	const oldPattern = /if module\.ClassName ~= "ModuleScript" then\s+error\(OUTPUT_PREFIX \.\. "Failed to import! Expected ModuleScript, got " \.\. module\.ClassName, 2\)\s+end/;
	if (oldPattern.test(content)) {
		content = content.replace(oldPattern, newCheck);
		fs.writeFileSync(runtimePath, content);
		console.log("Patched RuntimeLib for Folder/init support");
	} else {
		console.log("RuntimeLib patch: pattern not found (may already be patched)");
	}
}
