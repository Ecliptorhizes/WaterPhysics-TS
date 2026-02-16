import { Service, OnStart } from "@flamework/core";
import DataStore from "@rbxts/suphi-datastore";
import { Players } from "@rbxts/services";
import {
	DATASTORE_NAME,
	DEFAULT_PLAYER_DATA_TEMPLATE,
} from "shared/datastore/constants";

/**
 * DataStore service using @rbxts/suphi-datastore (Lapis equivalent).
 * Features: session locking, auto-save, cross-server communication.
 */
@Service({})
export class DataStoreService implements OnStart {
	onStart() {
		Players.PlayerAdded.Connect((player) => {
			const dataStore = new DataStore(
				DATASTORE_NAME,
				tostring(player.UserId),
			);
			const [success] = dataStore.Open({ ...DEFAULT_PLAYER_DATA_TEMPLATE });
			if (success !== "Success") {
				warn(`[DataStoreService] Failed to open for ${player.Name}:`, success);
			}
		});

		Players.PlayerRemoving.Connect((player) => {
			const dataStore = DataStore.find(
				DATASTORE_NAME,
				tostring(player.UserId),
			);
			dataStore?.Destroy();
		});

		print("[DataStoreService] Initialized with suphi-datastore (Lapis equivalent)");
	}
}
