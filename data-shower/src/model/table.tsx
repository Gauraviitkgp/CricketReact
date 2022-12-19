import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// interface DataTableInput  {
//     Name: string,
//     Test: string,
//     ODI: string,
//     T20: string,
//     IPL: string
// }

export default function DataTable(props:{rows:{values:string[]}[]}):JSX.Element{
    if (props.rows === undefined){
        return <></>;
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{ backgroundColor: "whitesmoke" }}>
                        <TableCell></TableCell>
                        <TableCell>Test</TableCell>
                        <TableCell>ODi</TableCell>
                        <TableCell>T20</TableCell>
                        <TableCell>IPL</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.map((row) => (
                        <TableRow
                            key={row.values[0]}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                           <TableCell>{row.values[0]}</TableCell>
                           <TableCell>{row.values[1]}</TableCell>
                           <TableCell>{row.values[2]}</TableCell>
                           <TableCell>{row.values[3]}</TableCell>
                           <TableCell>{row.values[4]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
