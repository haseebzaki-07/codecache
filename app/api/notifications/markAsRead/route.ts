import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/connect";
import Notification from "@/lib/db/notificationModel";
import { auth } from "@clerk/nextjs/server";

export async function PATCH(req: NextRequest) {
  await dbConnect();

  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { notificationId } = await req.json();

    const notification = await Notification.findById(notificationId);
    if (!notification || notification.userId !== userId) {
      return NextResponse.json({ message: "Notification not found" }, { status: 404 });
    }

    // Update the notification status to "read"
    notification.status = "read";
    await notification.save();

    return NextResponse.json({ message: "Notification marked as read" }, { status: 200 });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return NextResponse.json({ message: "Error marking notification as read" }, { status: 500 });
  }
}
