import type { GridRowsProp } from "@mui/x-data-grid";
import type {
  ContributionTransaction,
  LoanTransaction,
  Frequency,
  User,
  Loan,
} from "@prisma/client";

export type Transaction = ContributionTransaction | LoanTransaction;

export type TransactionPromise = Promise<GridRowsProp<Transaction>>;

export type Settings = {
  frequency: Frequency;
  amount: number;
};

export type LoanWithGuarantor = Loan & {
  guarantor: {
    id: number;
    approved: boolean;
    user: {
      firstName: string;
      lastName: string;
    };
  } | null;
};
