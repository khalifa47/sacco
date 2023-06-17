"use client";

import { capitalize, formatDate, formatNumber } from "@/utils/helpers";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarQuickFilter,
  type GridColDef,
  type GridRowsProp,
  // type GridRenderCellParams,
} from "@mui/x-data-grid";
import type { Loan } from "@prisma/client";
import { Transaction } from "@/types/othTypes";

// TODO: loan history to include guarantors
const loanHistoryColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 50,
    sortable: false,
  },
  {
    field: "amount",
    type: "number",
    headerName: "Amount",
    headerAlign: "left",
    align: "left",
    width: 100,
    disableColumnMenu: true,
    valueFormatter: ({ value }) => `Ksh. ${formatNumber(value)}`,
  },
  {
    field: "frequency",
    headerName: "Frequency",
    width: 100,
    valueFormatter: ({ value }) => capitalize(value),
  },
  {
    field: "amountPerFrequency",
    headerName: "Amount Per Frequency",
    headerAlign: "left",
    align: "left",
    width: 100,
    disableColumnMenu: true,
    valueFormatter: ({ value }) => `Ksh. ${formatNumber(value)}`,
  },
  // {
  //   field: "guarantors",
  //   headerName: "Guarantors",
  //   headerAlign: "left",
  //   align: "left",
  //   width: 150,
  //   disableColumnMenu: true,
  //   sortable: false,
  //   renderCell: (params: GridRenderCellParams<Loan>) => (
  //     <span>
  //       {params.value.map(
  //         (guarantor: User) =>
  //           `${guarantor.firstName} ${guarantor.lastName}${
  //             params.value[params.value.length - 1] === guarantor ? "" : ", "
  //           }`
  //       )}
  //     </span>
  //   ),
  // },
  {
    field: "purpose",
    headerName: "Purpose",
    headerAlign: "left",
    align: "left",
    flex: 1,
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: "createdAt",
    type: "dateTime",
    headerName: "Taken On",
    flex: 1,
    valueGetter: ({ value }) => value && new Date(value),
    valueFormatter: ({ value }) => formatDate(value),
  },
  {
    field: "updatedAt",
    type: "dateTime",
    headerName: "Last Paid",
    flex: 1,
    valueGetter: ({ value }) => value && new Date(value),
    valueFormatter: ({ value }) => formatDate(value),
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    valueFormatter: ({ value }) => capitalize(value),
  },
];

const transactionColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    sortable: false,
  },
  {
    field: "amount",
    type: "number",
    headerName: "Amount",
    headerAlign: "left",
    align: "left",
    width: 150,
    disableColumnMenu: true,
    valueFormatter: ({ value }) => `Ksh. ${formatNumber(value)}`,
  },
  {
    field: "balance",
    type: "number",
    headerName: "Balance",
    headerAlign: "left",
    align: "left",
    width: 150,
    disableColumnMenu: true,
    valueFormatter: ({ value }) => `Ksh. ${formatNumber(value)}`,
  },
  {
    field: "content",
    headerName: "Purpose",
    width: 100,
    valueGetter: ({ row }) => {
      if ("contributionId" in row) {
        return row.contributionId % 2 === 0 ? "welfare" : "shares";
      } else {
        return "loan";
      }
    },
    valueFormatter: ({ value }) => capitalize(value),
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
    valueGetter: ({ row }) => {
      if (row.content === "loan")
        return row.type === "debit" ? "repayment" : row.type;
      else return row.type;
    },
    valueFormatter: ({ value }) => capitalize(value),
  },
  {
    field: "method",
    headerName: "Method",
    width: 100,
    valueFormatter: ({ value }) => capitalize(value),
  },
  {
    field: "createdAt",
    type: "dateTime",
    headerName: "Date and Time",
    flex: 1,
    valueGetter: ({ value }) => value && new Date(value),
    valueFormatter: ({ value }) => formatDate(value),
  },
];

const SpacedToolbar = () => {
  return (
    <>
      <GridToolbarContainer
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          display="flex"
          rowGap={0}
          columnGap={{ xs: 1, md: 3 }}
          m={{ xs: "0 auto", md: 1 }}
        >
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </Box>
        <GridToolbarQuickFilter
          debounceMs={200}
          variant="outlined"
          size="small"
          sx={{ m: { xs: "0 auto", md: 1 } }}
        />
      </GridToolbarContainer>
      <Divider variant="middle" sx={{ mb: 1, mt: { xs: 2, md: 0 } }} />
    </>
  );
};

const DataTable = ({ rows }: { rows: GridRowsProp<Transaction | Loan> }) => {
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

  const isLoan = "status" in rows[0];

  return (
    <Box
      sx={{
        "& .css-1ojlfni-MuiDataGrid-root": {
          "--unstable_DataGrid-headWeight": 600,
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={isLoan ? loanHistoryColumns : transactionColumns}
        density="compact"
        autoHeight
        disableRowSelectionOnClick
        sx={{ border: 1, borderColor: "primary.light" }}
        slots={{
          toolbar: SpacedToolbar,
        }}
        slotProps={{
          columnsPanel: {
            disableHideAllButton: true,
            disableShowAllButton: true,
          },
        }}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
      />
    </Box>
  );
};

export default DataTable;
