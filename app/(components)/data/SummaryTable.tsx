"use client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import {
  capitalize,
  formatDate,
  formatNumber,
  getTimeAgo,
} from "@/utils/helpers";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Link from "next/link";

const StyledTableCell = ({
  children,
  color = "inherit",
}: {
  children: React.ReactNode;
  color?: string;
}) => (
  <TableCell
    sx={{
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: "black",
        color: "white",
        fontSize: 15,
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 13,
        color,
      },
    }}
  >
    {children}
  </TableCell>
);

const StyledTableRow = ({ children }: { children: React.ReactNode }) => (
  <TableRow
    sx={{
      "&:nth-of-type(odd)": {
        backgroundColor: "#f3f3f3",
      },
    }}
  >
    {children}
  </TableRow>
);

const columns = {
  transactions: [
    "Transaction ID",
    "Amount",
    "Balance",
    "Purpose",
    "Payment Method",
    "Date and Time",
  ],
  users: ["User ID", "Full Name", "Email", "Date Joined", "Last Active"],
};

const SummaryTable = ({
  admin,
  rows,
}: {
  admin?: boolean;
  rows: Transaction[] | User[];
}) => {
  if (rows.length === 0) {
    return (
      <Typography
        variant="h6"
        sx={{ textAlign: "center", m: "50px auto", color: "text.disabled" }}
      >
        No data to display⚠️
      </Typography>
    );
  }

  const col = "type" in rows[0] ? "transactions" : "users";

  return (
    <TableContainer component={Paper} sx={{ maxWidth: "lg", m: "20px auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns[col].map((column) => (
              <StyledTableCell key={column}>{column}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell color="#4C3FE4">{row.id}</StyledTableCell>

              {"type" in row ? (
                // if transaction
                <>
                  <StyledTableCell
                    color={row.type === "debit" ? "error.main" : "success.main"}
                  >
                    Ksh. {formatNumber(row.amount)}
                  </StyledTableCell>
                  <StyledTableCell>
                    Ksh. {formatNumber(row.balance)}
                  </StyledTableCell>
                  <StyledTableCell>{capitalize(row.content)}</StyledTableCell>
                  <StyledTableCell>{row.method}</StyledTableCell>
                  <StyledTableCell>{formatDate(row.dateTime)}</StyledTableCell>
                </>
              ) : (
                // if user
                <>
                  <StyledTableCell>
                    {capitalize(
                      `${row.firstName} 
                      ${row.otherNames ? row.otherNames : ""} 
                      ${row.lastName}`
                    )}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Link
                      style={{ textDecoration: "none", color: "#4C3FE4" }}
                      href={`mailto:${row.email}`}
                    >
                      {row.email}
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell>
                    {formatDate(row.dateJoined)}
                  </StyledTableCell>
                  <StyledTableCell color="#5f5f5f">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {getTimeAgo(row.dateActive)}
                      <Tooltip title={capitalize(row.status)}>
                        <Chip
                          color={row.status === "active" ? "success" : "error"}
                          sx={{ height: 7, width: 7, borderRadius: "50%" }}
                        />
                      </Tooltip>
                    </div>
                  </StyledTableCell>
                </>
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Link
        href={admin ? `/admin/${col}` : "/transactions"}
        style={{
          display: "flex",
          alignItems: "center",
          float: "right",
          textDecoration: "none",
          padding: 10,
          color: "#0018af",
        }}
      >
        <Typography>
          View All {admin ? "" : "My "} {capitalize(col)}
        </Typography>
        <ChevronRightIcon />
      </Link>
    </TableContainer>
  );
};

export default SummaryTable;
