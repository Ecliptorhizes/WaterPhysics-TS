import { Service, OnStart } from "@flamework/core";
import DataStore from "@rbxts/suphi-datastore";
import { Players } from "@rbxts/services";

/**
 * DataStore service using @rbxts/suphi-datastore (Lapis equivalent)
 * Features: session locking, auto-save, cross-server communication
 */
@Service({})
export class DataStoreService implements OnStart {
	onStart() {
		Players.PlayerAdded.Connect((player) => {
			const dataStore = new DataStore("WaterPhysics", tostring(player.UserId));
			const [success] = dataStore.Open({ level: 0, coins: 0 });
			if (success !== "Success") {
				warn(`[DataStoreService] Failed to open for ${player.Name}:`, success);
			}
		});

		Players.PlayerRemoving.Connect((player) => {
			const dataStore = DataStore.find("WaterPhysics", tostring(player.UserId));
			dataStore?.Destroy();
		});

		print("[DataStoreService] Initialized with suphi-datastore (Lapis equivalent)");
	}
}
