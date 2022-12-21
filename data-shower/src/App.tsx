import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./App.css";

import DataTable from "./components/table";
import GetPlayerID from "./fetch/playerMetadatas";
import GetPlayerData, { PlayerData } from "./fetch/playerData";

async function getFinalOutput(name: string): Promise<PlayerData> {
	let Response: PlayerData;

	try {
		let playerID = await GetPlayerID(name);
		Response = await GetPlayerData(playerID.player[0].name);
	} catch (e) {
		console.log(e);
		throw e;
	}

	return Response;
}

function LoadingIcon(props: {
	isLoading: boolean;
	values: PlayerData;
}): JSX.Element {
	if (props.isLoading) {
		return <CircularProgress />;
	}

	return <DataTable rows={props.values.values}></DataTable>;
}

function App(props: { playerName: string[] }) {
	const [data, setData] = React.useState<PlayerData>({
		headers: [],
		values: [{ values: [] }],
	});

	const [gotData, setGotData] = React.useState<boolean>(false);

	const refreshData = () => {
		getFinalOutput(props.playerName[0])
			.then((res) => {
				setData(res);
				setGotData(true);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	React.useEffect(() => {
		if (!gotData) {
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
