"use client";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { capitalize, dateFormat, formatNumber } from "@/utils/helpers";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Link from "next/link";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

function createData(
  id: string,
  amount: number,
  balance: number,
  type: string,
  dateTime: string
) {
  return { id, amount, balance, type, dateTime };
}

const rows = [
  createData("281936183", 200000, 200000, "shares", "2004-10-19 10:23:54"),
  createData("282936183", 200000, 200000, "shares", "2004-10-19 10:23:54"),
  createData("283936183", 200000, 200000, "shares", "2004-10-19 10:23:54"),
  createData("284936183", 200000, 200000, "shares", "2004-10-19 10:23:54"),
  createData("285936183", 200000, 200000, "shares", "2004-10-19 10:23:54"),
];

const SummaryTable = () => {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: "lg", m: "20px auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Amount</StyledTableCell>
            <StyledTableCell>Balance</StyledTableCell>
            <StyledTableCell>Type</StyledTableCell>
            <StyledTableCell>Date and Time</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell sx={{ color: "#4C3FE4" }}>
                {row.id}
              </StyledTableCell>
              <StyledTableCell>Ksh. {formatNumber(row.amount)}</StyledTableCell>
              <StyledTableCell>
                Ksh. {formatNumber(row.balance)}
              </StyledTableCell>
              <StyledTableCell>{capitalize(row.type)}</StyledTableCell>
              <StyledTableCell>{dateFormat(row.dateTime)}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Link
        href="/transactions"
        style={{
          display: "flex",
          alignItems: "center",
          float: "right",
          textDecoration: "none",
          padding: 10,
          color: "#0018af",
        }}
      >
        <Typography>View All Transactions</Typography>
        <ChevronRightIcon />
      </Link>
    </TableContainer>
  );
};

export default SummaryTable;
