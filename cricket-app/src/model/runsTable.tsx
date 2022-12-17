import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const NotOut = "not out";

export function createData(
	name: string,
	runs: number,
	balls: number,
	sixes: number,
	fours: number
): RunsTableInput {
	let strike: boolean = true;
	let howout: string = NotOut;
	return { name, howout, runs, balls, sixes, fours, strike };
}

export interface RunsTableInput {
	name: string;
	howout: string;
	runs: number;
	balls: number;
	sixes: number;
	fours: number;
	strike: boolean;
}

interface RunsTableInputList {
	list: RunsTableInput[];
	totalRun: number;
	wicket: number;
	overs: string;
}

function checkNotOut(no: string): string {
	if (no === NotOut) {
		return "Highlight";
	}

	return "";
}

export default class RunsTable extends React.Component<RunsTableInputList, {}> {
	render() {
		let isStrike = (strike: boolean) => {
			if (strike) {
				return "*";
			}

			return "";
		};

		return (
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow sx={{ backgroundColor: "whitesmoke" }}>
							<TableCell>Batsman</TableCell>
							<TableCell>Howout</TableCell>
							<TableCell align="right">Runs</TableCell>
							<TableCell align="right">Balls</TableCell>
							<TableCell align="right">6's</TableCell>
							<TableCell align="right">4's</TableCell>
							<TableCell align="right">strike rate</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{this.props.list.map((row) => (
							<TableRow
								key={row.name}
								sx={{
									"&:last-child td, &:last-child th": {
										border: 0,
									},
									backgroundColor: checkNotOut(row.howout),
								}}
							>
								<TableCell component="th" scope="row">
									{row.name}
									{isStrike(row.strike)}
								</TableCell>
								<TableCell align="left">{row.howout}</TableCell>
								<TableCell align="right">{row.runs}</TableCell>
								<TableCell align="right">{row.balls}</TableCell>
								<TableCell align="right">{row.sixes}</TableCell>
								<TableCell align="right">{row.fours}</TableCell>
								<TableCell align="right">
									{((row.runs / row.balls) * 100).toFixed(2)}
								</TableCell>
							</TableRow>
						))}
						<TableRow sx={{ backgroundColor: "wheat" }}>
							<TableCell rowSpan={2} />
							{/* <TableCell rowSpan={1} /> */}
							<TableCell
								sx={{ fontWeight: "bold", fontSize: 28 }}
							>
								Total
							</TableCell>
							<TableCell
								align="right"
								sx={{ fontWeight: "bold", fontSize: 28 }}
							>
								{this.props.totalRun}/{this.props.wicket}
							</TableCell>
							<TableCell
								align="right"
								sx={{ fontWeight: "bold", fontSize: 28 }}
							>
								{this.props.overs}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		);
	}
}
