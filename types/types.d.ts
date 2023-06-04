type Content = "shares" | "loans" | "welfare";

type LoanStatus = "requested" | "rejected" | "granted" | "paid";

type User = {
  id: string;
  firstName: string;
  otherNames?: string;
  lastName: string;
  email: string;
  status: "active" | "inactive";
  dateJoined: string;
  dateActive: string;
};

type Loan = {
  id: string;
  user: User;
  guarantors: User[];
  payments: Transaction[];
  amount: number;
  status: LoanStatus;
  frequency: Frequency;
  amountPerFrequency: number;
  purpose: string;
  createdAt: string;
  updatedAt: string;
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
