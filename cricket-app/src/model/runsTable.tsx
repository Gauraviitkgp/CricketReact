import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { watch } from 'fs';

export function createData(
  name: string,
  runs: number,
  balls: number,
  sixes: number,
  fours: number,
) {
  return { name, runs, balls, sixes, fours };
}

interface RunsTableInput {
	name: string,
  runs: number,
  balls: number,
  sixes: number,
  fours: number,
} 

export interface RunsTableInputList{
  list : RunsTableInput[]
}


export default class RunsTable extends React.Component<RunsTableInputList,{}> {

  abc() {
    console.log("abc");
  }

  render() {
    return <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Batsman</TableCell>
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
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.runs}</TableCell>
              <TableCell align="right">{row.balls}</TableCell>
              <TableCell align="right">{row.sixes}</TableCell>
              <TableCell align="right">{row.fours}</TableCell>
              <TableCell align="right">{(row.runs/row.balls*100).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  }
}