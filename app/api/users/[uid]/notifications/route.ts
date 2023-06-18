import { NextResponse } from "next/server";
import prisma from "@/utils/prismadb";
import { Notification } from "@prisma/client";

type Params = {
  uid: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  const uid = params.uid;
  let notifications: Notification[];

  try {
    notifications = await prisma.notification.findMany({
      where: {
        userId: uid,
        isRead: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }

  return new NextResponse(JSON.stringify(notifications), {
    status: 200,
  });
}
