import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function EtherTable({transferData}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Block Number</StyledTableCell>
            <StyledTableCell align='right'>Timestamp</StyledTableCell>
            <StyledTableCell align='right'>From</StyledTableCell>
            <StyledTableCell align='right'>To</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transferData.map((transfer) => (
            <StyledTableRow key={transfer.block_number}>
              <StyledTableCell component='th' scope='row'>
                {transfer.block_number}
              </StyledTableCell>
              <StyledTableCell align='right'>{transfer.block_timestamp}</StyledTableCell>
              <StyledTableCell align='right'>{transfer.from_address=="0x0000000000000000000000000000000000000000"?"Minter":transfer.from_address}</StyledTableCell>
              <StyledTableCell align='right'>{transfer.to_address}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
