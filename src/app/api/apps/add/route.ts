import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if(!session?.user?.id){
    return new Response( JSON.stringify({error: "Unauthorized" }), {status: 401});
  }

  let body;
  try{
    body = await req.json();
  } catch {
    return new Response( JSON.stringify({error: "Invalid JSON"}), {status: 400});
  }

  const {name, url, icon} = body;
  if(!name || !url){
    return new Response( JSON.stringify({error: "Name and URL are required"}), {status: 400});
  }

  await connectDB();

  const user = await User.findById(session.user.id);

  if (!user) {
    return new Response(
      JSON.stringify({ error: "User not found" }),
      { status: 404 }
    );
  }

  user.apps.unshift({
    name: name.trim(),
    url: url.trim(),
    icon: icon || "Link",
  });

  await user.save();

  return Response.json(user.apps);
}
