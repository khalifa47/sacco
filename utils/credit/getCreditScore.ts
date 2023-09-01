// Sample credit data
const credit: CreditData = {
  successfulLoanRepayments: 10,
  totalLoanRepayments: 12,
  creditUtilization: 0.5,
  creditHistoryMonths: 24,
  numCreditTypes: 3,
  numNewCredits: 1,
};

// Calculate payment history score
const calculatePaymentHistoryScore = (credit: CreditData) => {
  const { successfulLoanRepayments, totalLoanRepayments } = credit;
  if (totalLoanRepayments === 0) {
    return 300; // Minimum score for no payment history
  }
  const paymentPercentage = successfulLoanRepayments / totalLoanRepayments;
  return Math.floor(300 + 550 * paymentPercentage);
};

// Calculate credit utilization score
const calculateCreditUtilizationScore = (credit: CreditData) => {
  const { creditUtilization } = credit;
  return Math.floor(300 + 550 * (1 - creditUtilization));
};

// Calculate length of credit history score
const calculateLengthOfCreditScore = (credit: CreditData) => {
  const { creditHistoryMonths } = credit;
  // Define breakpoints and associated scores
  const breakpoints = [12, 24, 36];
  const scores = [400, 600, 800];
  for (let i = breakpoints.length - 1; i >= 0; i--) {
    if (creditHistoryMonths >= breakpoints[i]) {
      return scores[i];
    }
  }
  return 300;
};

// Calculate types of credit score
const calculateTypesOfCreditScore = (credit: CreditData) => {
  const { numCreditTypes } = credit;
  // Define breakpoints and associated scores
  const breakpoints = [1, 2, 3];
  const scores = [450, 675, 850];
  for (let i = breakpoints.length - 1; i >= 0; i--) {
    if (numCreditTypes >= breakpoints[i]) {
      return scores[i];
    }
  }
  return 300;
};

// Calculate new credit score
const calculateNewCreditScore = (credit: CreditData) => {
  const { numNewCredits } = credit;
  // Define breakpoints and associated scores
  const breakpoints = [0, 1];
  const scores = [850, 575];
  for (let i = breakpoints.length - 1; i >= 0; i--) {
    if (numNewCredits >= breakpoints[i]) {
      return scores[i];
    }
  }
  return 300;
};

// Calculate overall credit score
export const calculateCreditScore = (credit: CreditData) => {
  const paymentHistoryScore = calculatePaymentHistoryScore(credit);
  const creditUtilizationScore = calculateCreditUtilizationScore(credit);
  const lengthOfCreditScore = calculateLengthOfCreditScore(credit);
  const typesOfCreditScore = calculateTypesOfCreditScore(credit);
  const newCreditScore = calculateNewCreditScore(credit);

  // Weighted sum of scores (adjust weights based on importance)
  const totalScore =
    paymentHistoryScore * 0.3 +
    creditUtilizationScore * 0.2 +
    lengthOfCreditScore * 0.2 +
    typesOfCreditScore * 0.15 +
    newCreditScore * 0.15;

  return totalScore;
};
