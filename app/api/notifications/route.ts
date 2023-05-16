import { NextResponse } from "next/server";
import prisma from "@/utils/prismadb";
import { Notification } from "@prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("uid");
  let notifications: Notification[];

  if (uid === null) {
    return new NextResponse("Missing user ID", {
      status: 400,
    });
  }

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
