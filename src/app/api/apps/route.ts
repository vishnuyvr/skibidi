import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export const runtime = "nodejs";

export async function GET() {
  const session = await getServerSession(authOptions);

  // ❌ Not signed in → no DB apps
  if (!session?.user?.id) {
    return Response.json([]);
  }

  await connectDB();

  const user = await User.findById(session.user.id);

  return Response.json(user?.apps || []);
}