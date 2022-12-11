import * as React from 'react';
import RunsTable from './runsTable'
import {createData,RunsTableInput} from './runsTable'
import './css/scoring.css'

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

let scorecard:RunsTableInput[] = [];

interface Iplaying11 {
    Batsman:string[],
    WicketKeeper:string[],
    All_Rounder:string[],
    Bowler: string[]
}


export default function RenderScoring(props:{teamname:string, playing11:Iplaying11}):JSX.Element {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };


    return  ( <>
    <h1>Score for {props.teamname}</h1>
    <Box sx={{ minWidth: 2000 }}>
        <FormControl  >
            <InputLabel id="batsman1">Batsman1</InputLabel>
            <InputLabel id="batsman2">Batsman2</InputLabel>
            <div className="something">
                <Select
                labelId="batsman1"
                id="batsman1Select"
                value={age}
                label="Age"
                onChange={handleChange}
                
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                
                <Select
                labelId="batsman2"
                id="batsman2Select"
                value={age}
                label="Randirona"
                onChange={handleChange}
                >
                    <MenuItem value={10}>Ten1</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </div>
        </FormControl>
    </Box>
    <RunsTable list={scorecard} ></RunsTable>
    </>)
}