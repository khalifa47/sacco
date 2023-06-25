"use client";

import { useState, useCallback } from "react";
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
  type GridRowModel,
} from "@mui/x-data-grid";
import type { Loan, User } from "@prisma/client";
import { Transaction } from "@/types/othTypes";
import {
  getLoanHistoryColumns,
  getTransactionColumns,
  getUserColumns,
} from "./columns";
import ConfirmDialog from "@/app/(components)/layout/ConfirmDialog";
import { useToast } from "@/utils/hooks";

const useFakeMutation = () => {
  return useCallback(
    (user: Partial<User>) =>
      new Promise<Partial<User>>((resolve, reject) => {
        setTimeout(() => {
          if (user.otherNames?.trim() === "") {
            reject();
          } else {
            resolve(user);
          }
        }, 200);
      }),
    []
  );
};

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
  const { showToast } = useToast();
  const mutateRow = useFakeMutation();

  const [promiseArguments, setPromiseArguments] = useState<any>(null);

  const computeMutation = (newRow: GridRowModel, oldRow: GridRowModel) => {
    if (newRow.firstName.toLowerCase() !== oldRow.firstName.toLowerCase()) {
      return `First Name from '${oldRow.firstName}' to '${newRow.firstName}'`;
    }
    if (newRow.otherNames.toLowerCase() !== oldRow.otherNames.toLowerCase()) {
      return `Other Names from '${oldRow.otherNames || ""}' to '${
        newRow.otherNames || ""
      }'`;
    }
    if (newRow.lastName.toLowerCase() !== oldRow.lastName.toLowerCase()) {
      return `Last Name from '${oldRow.lastName}' to '${newRow.lastName}'`;
    }
    return null;
  };

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

  const handleNo = () => {
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow); // Resolve with the old row to not update the internal state
    setPromiseArguments(null);
  };

  const handleYes = async () => {
    const { newRow, oldRow, reject, resolve } = promiseArguments;

    try {
      // Make the HTTP request to save in the backend
      const response = await mutateRow(newRow);
      showToast("User successfully saved", "success");
      resolve(response);
    } catch (error) {
      showToast("Name can't be empty", "error");
      reject(oldRow);
    } finally {
      setPromiseArguments(null);
    }
  };

  const renderConfirmDialog = () => {
    if (!promiseArguments) {
      return null;
    }

    const { newRow, oldRow } = promiseArguments;
    const mutation = computeMutation(newRow, oldRow);

    return (
      <ConfirmDialog
        open={!!promiseArguments}
        handleNo={handleNo}
        handleYes={handleYes}
        content={`Pressing 'Yes' will change ${mutation}.`}
      />
    );
  };

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
      {renderConfirmDialog()}
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
