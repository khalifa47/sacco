import type { UserResponse } from "@supabase/supabase-js";

export const sharesAction = async (
  action: ShareActions,
  amount: number,
  phone: string,
  userPromise: Promise<UserResponse>
) => {
  let res: Response;

  try {
    const user = await userPromise;

    if (!user || !user.data.user) {
      throw new Error("User not found");
    }

    res = await fetch(`/api/transactions/shares`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action,
        amount,
        phone,
        userId: user.data.user.id,
      }),
    });
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg === "" ? res.statusText : msg);
    }

    return res.json();
  } catch (error: any) {
    console.error(error);
  }
};
