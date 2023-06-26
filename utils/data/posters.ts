import type { PaymentMethod } from "@prisma/client";
import type { SupabaseClient } from "@supabase/supabase-js";

export const postContributionTransaction = async (
  action: ShareActions | WelfareActions,
  amount: number,
  phone: string,
  method: PaymentMethod,
  supabaseClient: SupabaseClient
) => {
  let res: Response;

  try {
    const userId = (await supabaseClient.auth.getUser()).data.user?.id;

    if (!userId) {
      throw new Error("User not found");
    }

    const { data: contribution, error } = await supabaseClient
      .from("contributions")
      .select("id")
      .match({
        user_id: userId,
        type: action === "deposit welfare" ? "welfare" : "shares",
      })
      .single();

    if (error || !contribution) {
      throw new Error(error.message || "Contribution not found");
    }

    res = await fetch(`/api/users/${userId}/contributions/${contribution.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action,
        amount,
        phone,
        method,
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

  throw new Error("Something went wrong");
};
