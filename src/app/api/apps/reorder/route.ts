import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { email, apps } = await req.json();

  await connectDB();

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  user.apps = apps;
  await user.save();

  return NextResponse.json({ success: true });
}
