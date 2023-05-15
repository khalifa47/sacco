const users: User[] = [
  {
    id: "user1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    status: "active",
    dateJoined: "2022-04-01T00:00:00Z",
    dateActive: "2022-04-01T00:00:00Z",
  },
  {
    id: "user2",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    status: "active",
    dateJoined: "2022-04-01T00:00:00Z",
    dateActive: "2022-04-01T00:00:00Z",
  },
  {
    id: "user3",
    firstName: "Jack",
    lastName: "Doe",
    email: "jack.doe@example.com",
    status: "active",
    dateJoined: "2022-04-01T00:00:00Z",
    dateActive: "2022-04-01T00:00:00Z",
  },
  // add more users as needed
];

const loans: Loan[] = [];

for (let i = 0; i < 15; i++) {
  const user = users[Math.floor(Math.random() * users.length)];
  const guarantors = users.filter((u) => u.id !== user.id).slice(0, 2);
  const payments: Transaction[] = [];

  for (let j = 0; j < Math.floor(Math.random() * 5); j++) {
    payments.push({
      id: `payment${j + 1}`,
      amount: Math.floor(Math.random() * 10000),
      balance: Math.floor(Math.random() * 100000),
      type: j % 2 === 0 ? "debit" : "credit",
      method: j % 3 === 0 ? "Card" : j % 3 === 1 ? "MPESA" : "PayPal",
      content: j % 3 === 0 ? "shares" : j % 3 === 1 ? "loans" : "welfare",
      dateTime: new Date(
        Date.now() - Math.floor(Math.random() * 86400000)
      ).toISOString(),
    });
  }

  loans.push({
    id: `loan${i + 1}`,
    user: user,
    guarantors: guarantors,
    payments: payments,
    amount: Math.floor(Math.random() * 100000),
    status: ["requested", "rejected", "granted", "paid"][
      Math.floor(Math.random() * 4)
    ] as LoanStatus,
    frequency: ["daily", "weekly", "monthly"][
      Math.floor(Math.random() * 3)
    ] as Frequency,
    amountPerFrequency: Math.floor(Math.random() * 10000),
    purpose: "Lorem ipsum dolor sit amet",
    createdAt: new Date(
      Date.now() - Math.floor(Math.random() * 86400000)
    ).toISOString(),
    updatedAt: new Date(
      Date.now() - Math.floor(Math.random() * 86400000)
    ).toISOString(),
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
