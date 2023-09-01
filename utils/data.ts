import type {
  User,
  Loan,
  Frequency,
  // LoanTransaction,
  LoanStatus,
} from "@prisma/client";
import { createUserData } from "./helpers";
import { LoanWithGuarantors } from "@/types/othTypes";

const users: User[] = [
  createUserData({
    id: "1",
    firstName: "khalifa",
    otherNames: "bakari",
    lastName: "fumo",
    email: "khalifafumo5@gmail.com",
    phone: "0712345678",
    role: "user",
    nationalId: "39386977",
    status: "active",
    createdAt: new Date("2004-10-19 10:23:54"),
    lastActive: new Date("2014-10-19 10:23:54"),
  }),
  createUserData({
    id: "2",
    firstName: "khalifa",
    otherNames: "bakari",
    lastName: "fumo",
    email: "khalifafumo5@gmail.com",
    phone: "0712345678",
    role: "user",
    nationalId: "39386977",
    status: "active",
    createdAt: new Date("2004-10-19 10:23:54"),
    lastActive: new Date("2014-10-19 10:23:54"),
  }),
  createUserData({
    id: "3",
    firstName: "khalifa",
    otherNames: "bakari",
    lastName: "fumo",
    email: "khalifafumo5@gmail.com",
    phone: "0712345678",
    role: "user",
    nationalId: "39386977",
    status: "active",
    createdAt: new Date("2004-10-19 10:23:54"),
    lastActive: new Date("2014-10-19 10:23:54"),
  }),
  createUserData({
    id: "4",
    firstName: "khalifa",
    otherNames: "bakari",
    lastName: "fumo",
    email: "khalifafumo5@gmail.com",
    phone: "0712345678",
    role: "user",
    nationalId: "39386977",
    status: "inactive",
    createdAt: new Date("2004-10-19 10:23:54"),
    lastActive: new Date("2014-10-19 10:23:54"),
  }),
  createUserData({
    id: "5",
    firstName: "khalifa",
    otherNames: "bakari",
    lastName: "fumo",
    email: "khalifafumo5@gmail.com",
    phone: "0712345678",
    role: "admin",
    nationalId: "39386977",
    status: "active",
    createdAt: new Date("2004-10-19 10:23:54"),
    lastActive: new Date("2014-10-19 10:23:54"),
  }),
];

const loans: LoanWithGuarantors[] = [];

for (let i = 0; i < 15; i++) {
  const user = users[Math.floor(Math.random() * users.length)];
  const guarantors = users.filter((u) => u.id !== user.id).slice(0, 2);
  // const payments: LoanTransaction[] = [];

  // for (let j = 0; j < Math.floor(Math.random() * 5); j++) {
  //   payments.push({
  //     id: j + 1,
  //     loanId: 1,
  //     amount: Math.floor(Math.random() * 10000),
  //     balance: Math.floor(Math.random() * 100000),
  //     type: j % 2 === 0 ? "debit" : "credit",
  //     method: j % 3 === 0 ? "card" : j % 3 === 1 ? "mpesa" : "paypal",
  //     createdAt: new Date(Date.now() - Math.floor(Math.random() * 86400000)),
  //   });
  // }

  loans.push({
    id: i + 1,
    userId: user.id,
    // guarantors: guarantors,
    // payments: payments,
    amount: Math.floor(Math.random() * 100000),
    status: ["pending", "disbursed", "rejected", "approved", "paid"][
      Math.floor(Math.random() * 5)
    ] as LoanStatus,
    frequency: ["weekly", "monthly", "quarterly", "yearly"][
      Math.floor(Math.random() * 4)
    ] as Frequency,
    amountPerFrequency: Math.floor(Math.random() * 10000),
    purpose: "Lorem ipsum dolor sit amet",
    loanRisk: Math.random(),
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 86400000)),
    updatedAt: new Date(Date.now() - Math.floor(Math.random() * 86400000)),
    guarantors: guarantors,
  });
}

// NOTIFICATIONS

// {id: 1,
// title: "Guarantor Request",
// content:
//   "You've got a guarantor request from Khalifa Fumo for a loan amount of Ksh. 200,000",
// go_to: "/loans/1",
// isRead: false,
// created_at: "2023-01-19 10:23:54",}

export { users, loans };
