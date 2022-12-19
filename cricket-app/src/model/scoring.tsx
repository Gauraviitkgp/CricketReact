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
import Batting from "./player";

let scorecard: RunsTableInput[] = [];
let Batters = new Batting();

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

function newBatter(batsman: string, Player: RunsTableInput): RunsTableInput {
	if (!Batters.existsByName(batsman)) {
		let newPlayer = createData(batsman, 0, 0, 0, 0);
		scorecard.push(newPlayer);
		Player = newPlayer;
	}

	return Player;
}

function DropDownSelect(props: {
	id: string;
	initialVal: string;
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
				value={props.initialVal}
				label={labelVal}
				onChange={props.handleBatsmanValChange}
				autoWidth
				disabled={props.disabled}
				className={colorStyle}
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
	const [availablePlayers, setAvailablePlayers] = React.useState(
		props.playing11.Batsman.concat(props.playing11.WicketKeeper)
			.concat(props.playing11.All_Rounder)
			.concat(props.playing11.Bowler)
	);

	const [batsman1, setPlayer1] = React.useState("");
	const handlePlayer1Change = (event: SelectChangeEvent) => {
		setPlayer1(event.target.value as string);
		Batters.setBatsman1(
			newBatter(event.target.value as string, Batters.Batsman1)
		);
	};

	const [batsman2, setPlayer2] = React.useState("");
	const handlePlayer2Change = (event: SelectChangeEvent) => {
		setPlayer2(event.target.value as string);
		Batters.setBatsman2(
			newBatter(event.target.value as string, Batters.Batsman2)
		);
	};

	const [isOutBall, setOut] = React.useState(false);
	const handleOut = (event: React.MouseEvent<HTMLElement>) => {
		if (!Batters.valid()) {
			console.log("Numbers not correct");
			return;
		}

		setOut(true);
	};

	const [isExtraBall, setExtra] = React.useState(true);
	const handleExtra = (event: React.MouseEvent<HTMLElement>) => {
		setExtra(false);
	};

	const handleRun = (runs: number) => {
		if (!Batters.valid()) {
			console.log("Numbers not correct");
			return;
		}

		Batters.addRuns(runs);

		setIsBatsman1Disabled(true);
		setIsBatsman2Disabled(true);

		setTotalBalls(totalBalls + 1);
		setTotalRuns(totalRuns + runs);
		if (totalBalls % 6 === 5 && !isOutBall) {
			Batters.rotateStrike();
		}
	};

	const handleOutDecision = (event: SelectChangeEvent) => {
		handleRun(0);

		if (Batters.onStrike() !== Batters.Batsman1) {
			setIsBatsman2Disabled(false);
		} else {
			setIsBatsman1Disabled(false);
		}
		availablePlayers.splice(
			availablePlayers.indexOf(Batters.onStrike().name),
			1
		);
		setAvailablePlayers(availablePlayers);
		Batters.batterOut(event.target.value as string);

		setOut(false);
	};

	let wickets = 11 - availablePlayers.length;
	React.useEffect(() => {
		document.title = `India ${totalRuns}/${wickets} Runs`;
	});

	return (
		<>
			<h1>Score for {props.teamname}</h1>
			<div className="something">
				<DropDownSelect
					id="Batsman1"
					initialVal={batsman1}
					handleBatsmanValChange={handlePlayer1Change}
					players={availablePlayers}
					disabled={isBatsman1Disabled}
				></DropDownSelect>
				<DropDownSelect
					id="Batsman2"
					initialVal={batsman2}
					handleBatsmanValChange={handlePlayer2Change}
					players={availablePlayers}
					disabled={isBatsman2Disabled}
				></DropDownSelect>
			</div>
			<Stack spacing={1} direction="row">
				{props.actions.Runs.map((run) => (
					<Button
						variant="contained"
						onClick={() => {
							handleRun(run);
						}}
					>
						{run.toString()}
					</Button>
				))}

				<Button variant="contained" onClick={handleOut}>
					Out
				</Button>
				<DropDownSelect
					id="Out"
					initialVal=""
					handleBatsmanValChange={handleOutDecision}
					players={props.actions.Wicket}
					disabled={!isOutBall}
				></DropDownSelect>
				<Button variant="contained" onClick={handleExtra}>
					Extra
				</Button>
				<DropDownSelect
					id="Extra"
					initialVal={props.actions.Extra[0]}
					handleBatsmanValChange={handlePlayer1Change}
					players={props.actions.Extra}
					disabled={isExtraBall}
				></DropDownSelect>
			</Stack>
			<RunsTable
				list={scorecard}
				totalRun={totalRuns}
				wicket={wickets}
				overs={Math.trunc(totalBalls / 6) + "." + (totalBalls % 6)}
			></RunsTable>
		</>
	);
}
