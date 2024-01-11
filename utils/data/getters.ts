import type { LoanWithGuarantor, Transaction } from "@/types/othTypes";
import type { Notification, Contribution, User, Loan } from "@prisma/client";

export const getNotifications = async (uid: string) => {
  let res: Response;
  let notifications: Notification[] = [];

  try {
    res = await fetch(`${process.env.BASE_URL}/api/users/${uid}/notifications`);
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg === "" ? res.statusText : msg);
    }

    notifications = await res.json();
  } catch (error: any) {
    console.error(error);
  }

  return notifications;
};

export const getTransactionData = async (
  uid?: string,
  limit?: number,
  content?: Content
) => {
  let res: Response;
  let transactions: Transaction[] = [];

  try {
    res = await fetch(
      `${process.env.BASE_URL}/api/${
        uid ? `users/${uid}/` : ""
      }transactions?limit=${limit}&content=${content}`
      // { headers: headers(), next: { revalidate: 60 } }
    );
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg === "" ? res.statusText : msg);
    }

    transactions = await res.json();
  } catch (error: any) {
    console.error(error);
  }

  return transactions;
};

export const getLoans = async (uid?: string) => {
  let res: Response;
  let loans: LoanWithGuarantor[] = [];

  try {
    res = await fetch(
      `${process.env.BASE_URL}/api/${uid ? `users/${uid}/` : ""}loans`,
      {
        // headers: headers(),
        next: { revalidate: 0 },
      }
    );
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg === "" ? res.statusText : msg);
    }

    loans = await res.json();
  } catch (error: any) {
    console.error(error);
  }

  return {
    loans: loans,
    amount: loans.reduce((acc, loan) => acc + loan.amount, 0),
  };
};

export const getLoan = async (lid: number) => {
  let res: Response;
  let loan: Loan | null = null;

  try {
    res = await fetch(`${process.env.BASE_URL}/api/loans/${lid}`);
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg === "" ? res.statusText : msg);
    }

    loan = await res.json();
  } catch (error: any) {
    console.error(error);
  }

  return loan;
};

export const getContributions = async (uid?: string) => {
  let res: Response;
  let contributions: {
    shares: Contribution | Contribution[];
    welfare: Contribution | Contribution[];
  };

  try {
    res = await fetch(
      `${process.env.BASE_URL}/api/${uid ? `users/${uid}/` : ""}contributions`,
      {
        // headers: headers(),
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg === "" ? res.statusText : msg);
    }

    contributions = await res.json();

    return contributions;
  } catch (error: any) {
    console.error(error);
  }
};

export const getUsers = async (limit?: number) => {
  let res: Response;
  let users: User[] = [];

  try {
    res = await fetch(`${process.env.BASE_URL}/api/users?limit=${limit}`);
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg === "" ? res.statusText : msg);
    }

    users = await res.json();
  } catch (error: any) {
    console.error(error);
  }

  return users;
};

export const getUser = async (uid: string) => {
  let res: Response;
  let user: User | null = null;

  try {
    res = await fetch(`${process.env.BASE_URL}/api/users/${uid}`);
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg === "" ? res.statusText : msg);
    }

    user = await res.json();
  } catch (error: any) {
    console.error(error);
  }

  return user;
};
