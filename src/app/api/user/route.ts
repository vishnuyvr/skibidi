import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { email, name } = await req.json();

  await connectDB();

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({ email, name, apps: [] });
  }

  return NextResponse.json(user);
}
