import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { SelectChangeEvent } from "@mui/material/Select";
import "./App.css";

import DataTable from "./components/table";
import GetPlayerID from "./fetch/playerMetadatas";
import GetPlayerData, { PlayerData } from "./fetch/playerData";
import DropDownSelect from "./components/drop_down_select";

async function getFinalOutput(name: string): Promise<PlayerData> {
	let Response: PlayerData;

	try {
		let playerID = await GetPlayerID(name);
		Response = await GetPlayerData(playerID.player[0].id);
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
	const [currPlayer,setCurrPlayer] = React.useState<string>(props.playerName[0]);

	const refreshData = () => {
		getFinalOutput(currPlayer)
			.then((res) => {
				setData(res);
				setGotData(true);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const dropDownHandler = (event: SelectChangeEvent) => {
		let val = event.target.value as string;
		if (val !== currPlayer){
			setGotData(false);
			setCurrPlayer(val);
		}
	}

	React.useEffect(() => {
		if (!gotData) {
			refreshData();
		}
	});

	return (
		<div className="App">
			<DropDownSelect id="playerSelector" currentValue={currPlayer} handler={dropDownHandler} list={props.playerName} disabled={false}></DropDownSelect>
			<button onClick={refreshData}>Refresh</button>
			<div>
				<LoadingIcon isLoading={!gotData} values={data}></LoadingIcon>
			</div>
		</div>
	);
}

export default App;
