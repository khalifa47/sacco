import type {
  Notification,
  Contribution,
  ContributionTransaction,
  Loan,
} from "@prisma/client";

export const getNotifications = async (uid: string) => {
  let res: Response;
  let notifications: Notification[] = [];

  try {
    res = await fetch(`${process.env.BASE_URL}/api/notifications?uid=${uid}`);
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
  uid: string,
  limit?: number,
  content?: Content
) => {
  let res: Response;
  let transactions: ContributionTransaction[] = [];

  try {
    res = await fetch(
      `${process.env.BASE_URL}/api/transactions?uid=${uid}&limit=${limit}&content=${content}`
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

export const getLoanAmount = async (uid: string) => {
  let res: Response;
  let loans: Loan[] = [];

  try {
    res = await fetch(`${process.env.BASE_URL}/api/loans?uid=${uid}`, {
      // headers: headers(),
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg === "" ? res.statusText : msg);
    }

    loans = await res.json();
  } catch (error: any) {
    console.error(error);
  }

  return loans.reduce((acc, loan) => acc + loan.amount, 0);
};

export const getContributionAmount = async (uid: string) => {
  let res: Response;
  let contributions: {
    shares: Contribution;
    welfare: Contribution;
  };
  let contributionAmounts: { shares: number; welfare: number } = {
    shares: 0,
    welfare: 0,
  };

  try {
    res = await fetch(`${process.env.BASE_URL}/api/contributions?uid=${uid}`, {
      // headers: headers(),
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg === "" ? res.statusText : msg);
    }

    contributions = await res.json();
    contributionAmounts = {
      shares: contributions.shares.amount,
      welfare: contributions.welfare.amount,
    };
  } catch (error: any) {
    console.error(error);
  }

  return contributionAmounts;
};
