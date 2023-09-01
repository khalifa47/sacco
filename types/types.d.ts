type Content = "shares" | "loans" | "welfare";

type ShareActions =
  | "deposit shares"
  | "withdraw"
  | "transfer"
  | "share settings";
type LoanActions = "loan history" | "request" | "payment" | "loan settings";
type WelfareActions = "deposit welfare" | "welfare settings";

type Action = ShareActions | LoanActions | WelfareActions;

type TransferChoice = "welfare" | "other shares";

interface CreditData {
  successfulLoanRepayments: number;
  totalLoanRepayments: number;
  creditUtilization: number;
  creditHistoryMonths: number;
  numCreditTypes: number;
  numNewCredits: number;
}
