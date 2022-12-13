import * as React from "react";
import RunsTable from "./runsTable";
import { createData, RunsTableInput } from "./runsTable";
import "./css/scoring.css";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { createTheme } from '@mui/material/styles';

let scorecard: RunsTableInput[] = [];
let Player1: RunsTableInput, Player2: RunsTableInput;

interface Iplaying11 {
	Batsman: string[];
	WicketKeeper: string[];
	All_Rounder: string[];
	Bowler: string[];
}

interface IActions {
	Runs: number[];
	Wicket: string[];
	Extra: string[];
}

function setBatsman(batsman: string, Player: RunsTableInput): RunsTableInput {
	let newPlayer: RunsTableInput;

	if (batsman !== Player1?.name && batsman !== Player2?.name) {
		newPlayer = createData(batsman, 0, 0, 0, 0);
		scorecard.push(newPlayer);
		Player = newPlayer;
	}

	return Player;
}

function DropDownSelect(props: {
	id: string;
	batsmanVal: string;
	handleBatsmanValChange: (event: SelectChangeEvent) => void;
	players: string[];
	disabled: boolean;
}): JSX.Element {
	let labelVal =
		props.id.charAt(0).toUpperCase() + props.id.substr(1).toLowerCase();
	let labelID = props.id + "Select";

	let colorStyle = "";

	if (!props.disabled) {
		colorStyle = "input";
	}

	return (
		<FormControl sx={{ minWidth: 150 }}>
			<InputLabel id={props.id}>{labelVal}</InputLabel>

			<Select
				labelId={props.id}
				id={labelID}
				value={props.batsmanVal}
				label={labelVal}
				onChange={props.handleBatsmanValChange}
				autoWidth
				disabled={props.disabled}
				className = {colorStyle}
			>
				{props.players.map((player) => (
					<MenuItem value={player} sx={{ textAlign: "left" }}>
						{player}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}

// function

export default function RenderScoring(props: {
	teamname: string;
	playing11: Iplaying11;
	actions: IActions;
}): JSX.Element {
	const [isBatsman1Disabled, setIsBatsman1Disabled] = React.useState(false);
	const [isBatsman2Disabled, setIsBatsman2Disabled] = React.useState(false);
	const [totalRuns, setTotalRuns] = React.useState(0);
	const [totalBalls, setTotalBalls] = React.useState(0);

	const [batsman1, setPlayer1] = React.useState("");
	const handlePlayer1Change = (event: SelectChangeEvent) => {
		setPlayer1(event.target.value as string);
		Player1 = setBatsman(event.target.value as string, Player1);
	};

	const [batsman2, setPlayer2] = React.useState("");
	const handlePlayer2Change = (event: SelectChangeEvent) => {
		setPlayer2(event.target.value as string);
		Player2 = setBatsman(event.target.value as string, Player2);
		if (Player1?.strike && Player2?.strike) {
			Player2.strike = false;
		}
	};

	const [isOutBall, setOut] = React.useState(true);
	const handleOut = (event: React.MouseEvent<HTMLElement>) => {
		if (Player1 === undefined || Player2 === undefined) {
			console.log("Numbers not correct");
			return;
		}
		setOut(false);
	};

	const [isExtraBall, setExtra] = React.useState(true);
	const handleExtra = (event: React.MouseEvent<HTMLElement>) => {
		setExtra(false);
	};

	const handleRun = (runs: number) => {
		if (Player1 === undefined || Player2 === undefined) {
			console.log("Numbers not correct");
			return;
		}

		let player = Player1;

		if (Player2.strike) {
			player = Player2;
		}

		player.runs += runs;
		player.balls += 1;
		if (runs === 4) {
			player.fours += 1;
		} else if (runs === 6) {
			player.sixes += 1;
		}

		setIsBatsman1Disabled(true);
		setIsBatsman2Disabled(true);

		setTotalBalls(totalBalls + 1);
		setTotalRuns(totalRuns + runs);
		if (runs%2 === 1){ //odd number of runs
			Player1.strike = !Player1.strike;
			Player2.strike = !Player2.strike;
		}		
		if( totalBalls%6 === 5) {
			Player1.strike = !Player1.strike;
			Player2.strike = !Player2.strike;
		}
	};

	const handleOutDecision = (event: SelectChangeEvent) => {
		if (Player1 === undefined || Player2 === undefined) {
			console.log("Numbers not correct");
			return;
		}

		handleRun(0);
		setOut(true);
		if (Player1.strike) {
			Player1.howout = event.target.value as string;
			Player1.strike = false;
			setIsBatsman1Disabled(false);
		} else if (Player2.strike) {
			Player2.howout = event.target.value as string;
			Player2.strike = false;
			setIsBatsman2Disabled(false);
		}
	};

	return (
		<>
			<h1>Score for {props.teamname}</h1>
			<div className="something">
				<DropDownSelect
					id="Batsman1"
					batsmanVal={batsman1}
					handleBatsmanValChange={handlePlayer1Change}
					players={props.playing11.Batsman.concat(props.playing11.WicketKeeper).concat(props.playing11.All_Rounder).concat(props.playing11.Bowler)}
					disabled={isBatsman1Disabled}
				></DropDownSelect>
				<DropDownSelect
					id="Batsman2"
					batsmanVal={batsman2}
					handleBatsmanValChange={handlePlayer2Change}
					players={props.playing11.Batsman.concat(props.playing11.WicketKeeper).concat(props.playing11.All_Rounder).concat(props.playing11.Bowler)}
					disabled={isBatsman2Disabled}
				></DropDownSelect>
			</div>
			<Stack spacing={1} direction="row">
				{props.actions.Runs.map((run) => (
					<Button variant="contained" onClick={()=>{handleRun(run)}}>{run.toString()}</Button>
				))}

				<Button variant="contained" onClick={handleOut}>
					Out
				</Button>
				<DropDownSelect
					id="Out"
					batsmanVal=''
					handleBatsmanValChange={handleOutDecision}
					players={props.actions.Wicket}
					disabled={isOutBall}
				></DropDownSelect>
				<Button variant="contained" onClick={handleExtra}>
					Extra
				</Button>
				<DropDownSelect
					id="Extra"
					batsmanVal={props.actions.Extra[0]}
					handleBatsmanValChange={handlePlayer1Change}
					players={props.actions.Extra}
					disabled={isExtraBall}
				></DropDownSelect>
			</Stack>
			<RunsTable list={scorecard}></RunsTable>
		</>
	);
}
