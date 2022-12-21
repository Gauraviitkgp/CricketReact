import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function DropDownSelect(props: {
	id: string;
	currentValue: string;
	handler: (event: SelectChangeEvent) => void;
	list: string[];
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
				value={props.currentValue}
				label={labelVal}
				onChange={props.handler}
				autoWidth
				disabled={props.disabled}
				className={colorStyle}
			>
				{props.list.map((player) => (
					<MenuItem value={player} sx={{ textAlign: "left" }}>
						{player}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}