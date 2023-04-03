type UserRow = {
  id: string;
  firstName: string;
  otherNames?: string;
  lastName: string;
  email: string;
  dateTime: string;
};

type TransactionRow = {
  id: string;
  amount: number;
  balance: number;
  type: string;
  dateTime: string;
};
