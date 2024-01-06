import type { LoanStatus, Role, UserStatus } from "@prisma/client";
import type { SupabaseClient } from "@supabase/supabase-js";

type TransferProps = {
  choice: TransferChoice;
  toId?: string;
};

const baseUrl = "https://sacco-steel.vercel.app"; // TODO: not good

export const transferContribution = async (
  choice: TransferChoice,
  amount: number,
  supabaseClient: SupabaseClient,
  toId?: string
) => {
  const userId = (await supabaseClient.auth.getUser()).data.user?.id;

  if (!userId) {
    throw new Error("User not found");
  }

  const { data: contribution, error } = await supabaseClient
    .from("contributions")
    .select("id")
    .match({
      user_id: userId,
      type: "shares",
    })
    .single();

  if (error || !contribution) {
    throw new Error(error.message || "Contribution not found");
  }

  await updateContribution("transfer", amount, userId, contribution.id, {
    choice,
    toId,
  });
};

export const updateContribution = async (
  action: ShareActions | WelfareActions,
  amount: number,
  uid: string,
  cid: number,
  transferProps?: TransferProps
) => {
  let res: Response;

  try {
    res = await fetch(
      `${baseUrl}/api/users/${uid}/contributions/${cid}?transferchoice=${transferProps?.choice}&toid=${transferProps?.toId}`,
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
    throw new Error(error || "Something went wrong");
  }
};

export const updateUser = async (
  uid: string,
  data: {
    firstName: string;
    otherNames?: string | null;
    lastName: string;
    role: Role;
    status: UserStatus;
    admin: boolean;
  }
) => {
  let res: Response;

  try {
    res = await fetch(`${baseUrl}/api/users/${uid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg === "" ? res.statusText : msg);
    }

    return res.text();
  } catch (error: any) {
    throw new Error(error || "Something went wrong");
  }
};

export const updateLoanStatus = async (lid: number, status: LoanStatus) => {
  let res: Response;

  try {
    res = await fetch(`${baseUrl}/api/loans/${lid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
      }),
    });
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg === "" ? res.statusText : msg);
    }

    return res.json();
  } catch (error: any) {
    throw new Error(
      error.message ? error.message.toString() : "Something went wrong"
    );
  }
};
