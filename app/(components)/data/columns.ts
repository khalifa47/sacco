import {
  capitalize,
  formatDate,
  formatNumber,
  getTimeAgo,
} from "@/utils/helpers";
import type { GridColDef } from "@mui/x-data-grid";

export const getLoanHistoryColumns = (admin: boolean): GridColDef[] => [
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
  {
    field: "guarantor",
    headerName: "Guarantor",
    headerAlign: "left",
    align: "left",
    minWidth: 120,
    flex: 1,
    disableColumnMenu: true,
    sortable: false,
    valueGetter: ({ value }) => {
      if (value) {
        return capitalize(`${value.user.firstName} ${value.user.lastName}`);
      }
      return "N/A";
    },
  },
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

export const getTransactionColumns = (admin: boolean): GridColDef[] => [
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

export const getUserColumns = (): GridColDef[] => [
  {
    field: "nationalId",
    headerName: "National ID",
    width: 100,
  },
  {
    field: "firstName",
    headerName: "First Name📝",
    headerAlign: "left",
    align: "left",
    editable: true,
    minWidth: 105,
    valueFormatter: ({ value }) => capitalize(value),
  },
  {
    field: "otherNames",
    headerName: "Other Names📝",
    headerAlign: "left",
    align: "left",
    editable: true,
    minWidth: 120,
    valueFormatter: ({ value }) => capitalize(value),
  },
  {
    field: "lastName",
    headerName: "Last Name📝",
    headerAlign: "left",
    align: "left",
    editable: true,
    minWidth: 105,
    valueFormatter: ({ value }) => capitalize(value),
  },
  {
    field: "role",
    headerName: "Role📝",
    type: "singleSelect",
    editable: true,
    valueOptions: ["user", "admin"],
    width: 65,
    valueFormatter: ({ value }) => capitalize(value),
  },
  {
    field: "email",
    headerName: "E-mail",
    headerAlign: "left",
    align: "left",
    minWidth: 100,
    flex: 1,
  },
  {
    field: "phone",
    headerName: "Phone",
    headerAlign: "left",
    align: "left",
    minWidth: 100,
    flex: 1,
  },
  {
    field: "createdAt",
    type: "dateTime",
    headerName: "Joined On",
    flex: 1,
    valueGetter: ({ value }) => value && new Date(value),
    valueFormatter: ({ value }) => formatDate(value),
  },
  {
    field: "lastActive",
    type: "dateTime",
    headerName: "Last Logged In",
    flex: 1,
    valueGetter: ({ value }) => value && new Date(value),
    valueFormatter: ({ value }) => (value ? getTimeAgo(value) : "Never"),
  },
  {
    field: "status",
    headerName: "Status📝",
    width: 100,
    type: "singleSelect",
    editable: true,
    valueOptions: ["active", "inactive"],
    valueFormatter: ({ value }) => capitalize(value),
  },
];
