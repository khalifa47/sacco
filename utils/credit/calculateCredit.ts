async function getLoanRepaymentData(userId: string) {
  const loanRepaymentDataResponse = await fetch(
    `${process.env.BASE_URL}/api/users/${userId}/loan_predict/loantransactions`
  );

  if (!loanRepaymentDataResponse.ok) {
    const msg = await loanRepaymentDataResponse.text();
    throw new Error(msg === "" ? loanRepaymentDataResponse.statusText : msg);
  }

  const loanRepaymentData = await loanRepaymentDataResponse.json();

  return loanRepaymentData;
}

async function getCreditHistory(userId: string) {
  const creditHistory = await fetch(
    `${process.env.BASE_URL}/api/users/${userId}/loan_predict/contributiontransactions`
  );

  if (!creditHistory.ok) {
    const msg = await creditHistory.text();
    throw new Error(msg === "" ? creditHistory.statusText : msg);
  }

  const creditHistoryData = await creditHistory.json();

  return creditHistoryData;
}

export async function getCreditData(userId: string): Promise<CreditData> {
  const { successfulLoanRepayments, totalLoanRepayments } =
    await getLoanRepaymentData(userId);
  const { creditUtilization, creditHistoryMonths, numNewCredits } =
    await getCreditHistory(userId);

  return {
    successfulLoanRepayments: successfulLoanRepayments,
    totalLoanRepayments: totalLoanRepayments,
    creditUtilization: creditUtilization,
    creditHistoryMonths: creditHistoryMonths,
    numCreditTypes: 2,
    numNewCredits: numNewCredits,
  };
}
