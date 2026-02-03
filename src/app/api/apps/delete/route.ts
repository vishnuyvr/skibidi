import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { Types } from "mongoose";

export const runtime = "nodejs";

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  let body;
  try{
    body = await req.json();
  } catch {
    return new Response( JSON.stringify({error: "Invalid JSON"}), {status: 400});
  }

  const { appId } = body;
  type App = {
  _id: Types.ObjectId;
  name: string;
  url: string;
  icon?: string;
};
  await connectDB();

  const user = await User.findById(session.user.id);

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  user.apps = user.apps.filter(
    (app: App) => !app._id.equals(appId)
  );

  await user.save();

  return Response.json(user.apps);
}

