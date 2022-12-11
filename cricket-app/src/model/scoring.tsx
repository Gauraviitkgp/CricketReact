import * as React from 'react';
import RunsTable from './runsTable'
import {createData,RunsTableInput} from './runsTable'

let scorecard:RunsTableInput[] = [];

export default function RenderScoring(props:{teamname:string}):JSX.Element {
    return  ( <>
    <h1>Score for {props.teamname}</h1>
    <RunsTable list={scorecard} ></RunsTable>
    </>)
}