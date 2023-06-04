import type { GridRowsProp } from "@mui/x-data-grid";
import type { ContributionTransaction, LoanTransaction } from "@prisma/client";

export type Transaction = ContributionTransaction | LoanTransaction;

export type TransactionPromise = Promise<GridRowsProp<Transaction>>;
