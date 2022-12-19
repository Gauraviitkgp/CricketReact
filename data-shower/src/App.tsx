import React from "react";
import logo from "./logo.svg";
import "./App.css";
import config from "./config.json";
import DataTable from "./model/table";

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

async function getPlayerID(name: string): Promise<PlayerNames> {
	const url = config.base_url + "player/search?plrN=" + name;

	return new Promise((resolve,reject)=> {
		setTimeout(()=>{  fetch(url, options)
		.then((res) => res.json())
		.then((json) => {
			resolve(json);
		})
		.catch((err) => reject("error:" + err))},2000);
	});
}

async function getPlayerData(params: string): Promise<PlayerData> {
	const url = config.base_url + "player/" + params + "/batting";

	return new Promise((resolve,reject)=> {
		setTimeout(()=>{ fetch(url, options)
		.then((res) => res.json())
		.then((json) => {
			resolve(json);
		})
		.catch((err) => reject("error:" + err))},2000);
	});
}

function App(props: { playerName: string[] }) {
	// const [playerID, setPlayerID] = React.useState<string>("");

	const [data, setData] = React.useState<PlayerData>({
		headers: [],
		values: [{ values: [] }],
	});


	// getPlayerData(props.playerName[0])


	getPlayerID(props.playerName[0])
		.then((players) => {
			getPlayerData(players.player[0].id)
				.then((data) => {
					setData(data);
				})
				.catch((err) => {
					console.log("Some error occured:" + err);
				});
		})
		.catch((err) => {
			console.log("Some error occured:" + err);
		});

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
			<div>
				<DataTable rows={data.values}></DataTable>
			</div>
		</div>
	);
}

export default App;
