import type { Transaction } from "@/types/othTypes";
import type { AlertColor } from "@mui/material/Alert";
import type { GridRowModel } from "@mui/x-data-grid";
import type { User } from "@prisma/client";

export const capitalize = (sentence: string) => {
  const words = sentence.split(" ");

  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return capitalizedWords.join(" ");
};

// date format function
export const formatDate = (date: string | Date) => {
  if (typeof date === "string") {
    date = new Date(date);
  }

  // date.setHours(date.getHours() + 3);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

export const getTimeAgo = (date: string | Date) => {
  const currentDate: Date = new Date();
  if (typeof date === "string") {
    date = new Date(date);
  }

  const millisecondsAgo: number = currentDate.getTime() - date.getTime();
  const secondsAgo: number = Math.floor(millisecondsAgo / 1000);

  if (secondsAgo < 60) {
    return `${secondsAgo} seconds ago`;
  }

  const minutesAgo: number = Math.floor(secondsAgo / 60);

  if (minutesAgo < 60) {
    return `${minutesAgo} minutes ago`;
  }

  const hoursAgo: number = Math.floor(minutesAgo / 60);

  if (hoursAgo < 24) {
    return `${hoursAgo} hours ago`;
  }

  const daysAgo: number = Math.floor(hoursAgo / 24);

  return `${daysAgo} days ago`;
};

// number format
export const formatNumber = (num: number, locale: string = "en-US") => {
  return new Intl.NumberFormat(locale).format(num);
};

export const isValidSafaricomPhoneNumber = (phoneNumber: string) => {
  // Remove whitespace, hyphens, and other characters from the phone number
  phoneNumber = phoneNumber.replace(/\D/g, "");

  // Check if the phone number starts with the Kenyan country code (+254) and is 12 digits long
  return /^(?:254|\+254|0)?((?:7(?:[0129]\d|4[0123568]|5[789]|6[89])|(1(1[0-5])))\d{6})$/.test(
    phoneNumber
  );
};

export const groupTransactionsByMonth = (
  transactions: readonly Transaction[]
) => {
  const monthlyTotals = Array(12).fill(0);

  for (const transaction of transactions) {
    const timestamp = new Date(transaction.createdAt);
    const month = timestamp.getMonth();
    monthlyTotals[month] += transaction.amount;
  }

  return monthlyTotals;
};

// temp dummy data
export const createUserData = (user: User) => user;

// data editing on datatable
export const computeMutation = (newRow: GridRowModel, oldRow: GridRowModel) => {
  if (newRow.firstName.toLowerCase() !== oldRow.firstName.toLowerCase()) {
    return `First Name from '${oldRow.firstName}' to '${newRow.firstName}'`;
  }
  if (newRow.otherNames.toLowerCase() !== oldRow.otherNames.toLowerCase()) {
    return `Other Names from '${oldRow.otherNames || ""}' to '${
      newRow.otherNames || ""
    }'`;
  }
  if (newRow.lastName.toLowerCase() !== oldRow.lastName.toLowerCase()) {
    return `Last Name from '${oldRow.lastName}' to '${newRow.lastName}'`;
  }
  return null;
};

export const handleNo = (
  promiseArguments: any,
  setPromiseArguments: (val: any) => void
) => {
  const { oldRow, resolve } = promiseArguments;
  resolve(oldRow); // Resolve with the old row to not update the internal state
  setPromiseArguments(null);
};

export const handleYes = async (
  promiseArguments: any,
  toast: (message: string, severity: AlertColor | undefined) => void,
  setPromiseArguments: (val: any) => void,
  mutate: (user: Partial<User>) => Promise<Partial<User>>
) => {
  const { newRow, oldRow, reject, resolve } = promiseArguments;

  try {
    const response = await mutate(newRow);
    toast("User successfully saved", "success");
    resolve(response);
  } catch (error: any) {
    toast(error.toString() || "An error occurred", "error");
    reject(oldRow);
  } finally {
    setPromiseArguments(null);
  }
};
