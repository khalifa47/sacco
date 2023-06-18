import { NextResponse } from "next/server";
import prisma from "@/utils/prismadb";
import { Notification } from "@prisma/client";

export async function GET(request: Request) {
  let notifications: Notification[];

  try {
    notifications = await prisma.notification.findMany({
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
