import config from "../prod.config.json";

export interface PlayerMetadata {
	faceImageId: string;
	id: string;
	name: string;
	teamname: string;
}

export interface PlayerMetadatas {
	player: PlayerMetadata[];
}

const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": config.rapid_api_key,
		"X-RapidAPI-Host": config.X_RapidAPI_Host,
	},
};


export default async function GetPlayerID(name: string): Promise<PlayerMetadatas> {
	const url = config.base_url + "player/search?plrN=" + name;

	return fetch(url, options).then((res) => {
		return res.json();
	});
}