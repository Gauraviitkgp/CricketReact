import config from "../local.config.json";

export interface PlayerData {
	headers: string[];
	values: { values: string[] }[];
}

const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": config.rapid_api_key,
		"X-RapidAPI-Host": config.X_RapidAPI_Host,
	},
};

export default async function GetPlayerData(params: string): Promise<PlayerData> {
	const url = config.base_url + "player/" + params + "/batting";

	return fetch(url, options).then((res) => {
		return res.json();
	});
}