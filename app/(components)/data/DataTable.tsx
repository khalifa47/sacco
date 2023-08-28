"use client";

import { useState, useCallback } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarQuickFilter,
  type GridRowsProp,
  type GridRowModel,
} from "@mui/x-data-grid";
import type { User } from "@prisma/client";
import type { LoanWithGuarantors, Transaction } from "@/types/othTypes";
import {
  getLoanHistoryColumns,
  getTransactionColumns,
  getUserColumns,
} from "./columns";
import ConfirmDialog from "@/app/(components)/layout/ConfirmDialog";
import { useMutation, useToast } from "@/utils/hooks";
import { computeMutation, handleNo, handleYes } from "@/utils/helpers";

import BlockIcon from "@mui/icons-material/Block";
import DoneIcon from "@mui/icons-material/Done";

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
  rows: GridRowsProp<Transaction | LoanWithGuarantors | User>;
  admin?: boolean;
}) => {
  const { showToast } = useToast();
  const mutate = useMutation();

  const [promiseArguments, setPromiseArguments] = useState<any>(null);

  const processRowUpdate = useCallback(
    (newRow: GridRowModel, oldRow: GridRowModel) =>
      new Promise<GridRowModel>((resolve, reject) => {
        const mutation = computeMutation(newRow, oldRow);
        if (mutation) {
          // Save the arguments to resolve or reject the promise later
          setPromiseArguments({ resolve, reject, newRow, oldRow });
        } else {
          resolve(oldRow); // Nothing was changed
        }
      }),
    []
  );

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

  const isLoan = "frequency" in rows[0];
  const isUser = "email" in rows[0];

  if (admin) {
    transactionColumns = transactionColumns.filter(
      (column) => column.field !== "balance"
    )!;

    if (isLoan) {
      loanHistoryColumns.push(
        {
          field: "loanRisk",
          headerName: "Risk",
          width: 60,
          disableColumnMenu: true,
          renderCell: ({ value }) => (
            <Typography
              variant="body2"
              sx={{
                color:
                  value < 40
                    ? "success.main"
                    : value < 60
                    ? "warning.main"
                    : "error.main",
              }}
            >
              {value}%
            </Typography>
          ),
        },
        {
          field: "actions",
          type: "actions",
          headerName: "Action",
          width: 65,
          getActions: ({ id, row }) =>
            row.status === "pending"
              ? [
                  <GridActionsCellItem
                    key={1}
                    icon={<DoneIcon />}
                    label="Approve"
                    onClick={() => console.log("Approve ", id)}
                    showInMenu
                  />,
                  <GridActionsCellItem
                    key={2}
                    icon={<BlockIcon />}
                    label="Reject"
                    onClick={() => console.log("Reject ", id)}
                    showInMenu
                  />,
                ]
              : [],
        }
      );
    }
  }
  console.log(rows[0]);

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
      <ConfirmDialog
        promiseArgs={promiseArguments}
        handleNo={() => handleNo(promiseArguments, setPromiseArguments)}
        handleYes={() =>
          handleYes(promiseArguments, showToast, setPromiseArguments, mutate)
        }
      />
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
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={(error) => console.error(error)}
      />
    </Box>
  );
};

export default DataTable;
