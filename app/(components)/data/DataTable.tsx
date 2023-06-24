"use client";

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
  type GridRowsProp,
} from "@mui/x-data-grid";
import type { Loan, User } from "@prisma/client";
import { Transaction } from "@/types/othTypes";
import {
  getLoanHistoryColumns,
  getTransactionColumns,
  getUserColumns,
} from "./columns";

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
  rows,
  admin,
}: {
  rows: GridRowsProp<Transaction | Loan | User>;
  admin?: boolean;
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
  let transactionColumns = getTransactionColumns(admin ?? false);
  const loanHistoryColumns = getLoanHistoryColumns(admin ?? false);
  const userColumns = getUserColumns();

  if (admin) {
    transactionColumns = transactionColumns.filter(
      (column) => column.field !== "balance"
    )!;
  }

  const isLoan = "frequency" in rows[0];
  const isUser = "email" in rows[0];

  const columns = isLoan
    ? loanHistoryColumns
    : isUser
    ? userColumns
    : transactionColumns;

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
        columns={columns}
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
