import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import config from "./local.config.json";
import DataTable from "./model/table";
import { Button } from "@mui/material";

interface PlayerName {
	faceImageId: string;
	id: string;
	name: string;
	teamname: string;
}

interface PlayerNames {
	player: PlayerName[];
}

interface PlayerData {
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

async function getPlayerID(name: string): Promise<Response> {
	const url = config.base_url + "player/search?plrN=" + name;

	return fetch(url, options);

	// return new Promise((resolve, reject) => {
	// 	setTimeout(() => {
	// 		fetch(url, options)
	// 			.then((res) => resolve(res.json()))
	// 			.catch((err) => reject("error:" + err));
	// 	}, config.defaultTimeOut);
	// });
}

async function getPlayerData(params: string): Promise<Response> {
	const url = config.base_url + "player/" + params + "/batting";

	return fetch(url, options);

	// return new Promise((resolve, reject) => {
	// 	setTimeout(() => {
	// 		fetch(url, options)
	// 			.then((res) => resolve(res.json()))
	// 			.catch((err) => reject("error:" + err));
	// 	}, config.defaultTimeOut);
	// });
}

// async function getFinalOutput(name: string): Promise<PlayerData>{
// 	let playerID = await (await getPlayerID(name)).json() as PlayerNames;

// }

function LoadingIcon(props: {isLoading:boolean, values: PlayerData }):JSX.Element{
	if (props.isLoading){
		return <>LOADING</>
	}
	
	return <DataTable rows={props.values.values}></DataTable>
}

function App(props: { playerName: string[] }) {
	const [data, setData] = React.useState<PlayerData>({
		headers: [],
		values: [{ values: [] }],
	});

	const [gotData, setGotData] = React.useState<boolean>(false);

	const refreshData = () => {
		let playerIDRes = getPlayerID(props.playerName[0]).then((res) => {
			{
				return res.json() as Promise<PlayerNames>;
			}
		});

		playerIDRes.then((players) => {
			getPlayerData(players.player[0].id)
				.then(async (data1) => {
					console.log(data1);
					setData((await data1.json()) as PlayerData);
					setGotData(true);
				})
				.catch((err) => {
					console.log("Some error occured:" + err);
				});
		});
	};

	React.useEffect(() => {
		if (!gotData){
			refreshData();
		}
	});

	return (
		<div className="App">
			<div>
				<LoadingIcon isLoading={!gotData} values={data}></LoadingIcon>
			</div>

			<button onClick={refreshData}>Refresh</button>
		</div>
	);
}

export default App;
