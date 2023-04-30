"use client";

import { capitalize, formatDate, formatNumber } from "@/utils/helpers";
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
  type GridRenderCellParams,
} from "@mui/x-data-grid";

const loanHistoryColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    headerClassName: "header",
    sortable: false,
  },
  {
    field: "amount",
    type: "number",
    headerName: "Amount",
    headerAlign: "left",
    headerClassName: "header",
    align: "left",
    width: 150,
    disableColumnMenu: true,
    valueFormatter: ({ value }) => `Ksh. ${formatNumber(value)}`,
  },
  {
    field: "guarantors",
    headerName: "Guarantors",
    headerAlign: "left",
    headerClassName: "header",
    align: "left",
    width: 150,
    disableColumnMenu: true,
    sortable: false,
    renderCell: (params: GridRenderCellParams<Loan>) => (
      <span>
        {params.value.map(
          (guarantor: User) =>
            `${guarantor.firstName} ${guarantor.lastName}${
              params.value[params.value.length - 1] === guarantor ? "" : ", "
            }`
        )}
      </span>
    ),
  },
  {
    field: "purpose",
    headerName: "Purpose",
    headerAlign: "left",
    headerClassName: "header",
    align: "left",
    width: 150,
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: "createdAt",
    type: "dateTime",
    headerName: "Taken On",
    headerClassName: "header",
    flex: 1,
    valueGetter: ({ value }) => value && new Date(value),
    valueFormatter: ({ value }) => formatDate(value),
  },
  {
    field: "updatedAt",
    type: "dateTime",
    headerName: "Last Paid",
    headerClassName: "header",
    flex: 1,
    valueGetter: ({ value }) => value && new Date(value),
    valueFormatter: ({ value }) => formatDate(value),
  },
  {
    field: "status",
    headerName: "Status",
    headerClassName: "header",
    width: 100,
    valueFormatter: ({ value }) => capitalize(value),
  },
];

const transactionColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 150,
    headerClassName: "header",
    sortable: false,
  },
  {
    field: "amount",
    type: "number",
    headerName: "Amount",
    headerAlign: "left",
    headerClassName: "header",
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
    headerClassName: "header",
    align: "left",
    width: 150,
    disableColumnMenu: true,
    valueFormatter: ({ value }) => `Ksh. ${formatNumber(value)}`,
  },
  {
    field: "content",
    headerName: "Purpose",
    headerClassName: "header",
    width: 150,
    valueFormatter: ({ value }) => capitalize(value),
  },
  {
    field: "type",
    headerName: "Type",
    headerClassName: "header",
    width: 100,
    valueGetter: ({ row }) => {
      if (row.content === "loans")
        return row.type === "debit" ? "repayment" : row.type;
      else return row.type;
    },
    valueFormatter: ({ value }) => capitalize(value),
  },
  {
    field: "method",
    headerName: "Method",
    headerClassName: "header",
    width: 100,
  },
  {
    field: "dateTime",
    type: "dateTime",
    headerName: "Date and Time",
    headerClassName: "header",
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

const DataTable = ({
  // content,
  rows,
}: {
  // content: Content | "all";
  rows: GridRowsProp;
}) => {
  const isLoan = "status" in rows[0];

  return (
    <Box
      sx={{
        "& .header": {
          fontSize: 16,
        },
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
          // sorting: {
          //   sortModel: [{ field: "dateTime", sort: "desc" }],
          // },
          // filter: {
          //   filterModel: {
          //     items:
          //       content === "all"
          //         ? []
          //         : [{ field: "content", operator: "equals", value: content }],
          //   },
          // },
        }}
      />
    </Box>
  );
};

export default DataTable;
