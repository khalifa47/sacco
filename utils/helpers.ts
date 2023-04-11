export const capitalize = (sentence: string) => {
  const words = sentence.split(" ");

  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return capitalizedWords.join(" ");
};

// date format function
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
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

export const getTimeAgo = (dateString: string) => {
  const currentDate: Date = new Date();
  const targetDate: Date = new Date(dateString);

  const millisecondsAgo: number = currentDate.getTime() - targetDate.getTime();
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

export const isValidKenyanPhoneNumber = (phoneNumber: string) => {
  // Remove whitespace, hyphens, and other characters from the phone number
  phoneNumber = phoneNumber.replace(/\D/g, "");

  // Check if the phone number starts with the Kenyan country code (+254) and is 12 digits long
  return /^254\d{9}$/.test(phoneNumber);
};

// temp dummy data
export const createTransactionData = (transaction: TransactionRow) =>
  transaction;

export const createUserData = (user: UserRow) => user;

export const createNotificationData = (notification: AppNotification) =>
  notification;
