type Content = "shares" | "loans" | "welfare";

type UserRow = {
  id: string;
  firstName: string;
  otherNames?: string;
  lastName: string;
  email: string;
  dateJoined: string;
  dateActive: string;
};

type TransactionRow = {
  id: string;
  amount: number;
  balance: number;
  type: "debit" | "credit";
  content: Content;
  dateTime: string;
};

type AppNotification = {
  id: number;
  title: string;
  content: string;
  go_to: string;
  isRead: boolean;
  created_at: string;
};

type ShareActions =
  | "deposit shares"
  | "withdraw"
  | "transfer"
  | "share settings";
type LoanActions = "loan history" | "request" | "payment" | "loan settings";
type WelfareActions = "deposit welfare" | "welfare settings";

type Action = ShareActions | LoanActions | WelfareActions;

type Frequency = "weekly" | "monthly" | "quarterly" | "yearly";
