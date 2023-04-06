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
  content: string;
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