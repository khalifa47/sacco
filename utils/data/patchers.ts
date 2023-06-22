export const updateContribution = async (
  action: ShareActions | WelfareActions,
  amount: number,
  uid: string,
  cid: number
) => {
  let res: Response;

  try {
    res = await fetch(
      `${process.env.BASE_URL}/api/users/${uid}/contributions/${cid}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action,
          amount,
        }),
      }
    );
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg === "" ? res.statusText : msg);
    }

    return res.text();
  } catch (error: any) {
    console.error(error);
  }

  throw new Error("Something went wrong");
};
