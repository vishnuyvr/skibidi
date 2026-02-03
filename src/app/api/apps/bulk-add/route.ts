import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body;

  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON body" }),
      { status: 400 }
    );
  }

  const { email, apps } = body;

  // ---- Validation ----
  if (!email || !Array.isArray(apps) || apps.length === 0) {
    return new Response(
      JSON.stringify({ error: "Email and apps array are required" }),
      { status: 400 }
    );
  }

  for (const app of apps) {
    if (!app?.name || !app?.url) {
      return new Response(
        JSON.stringify({ error: "Each app must have name and url" }),
        { status: 400 }
      );
    }
  }

  await connectDB();

  const user = await User.findOne({ email });

  if (!user) {
    return new Response(
      JSON.stringify({ error: "User not found" }),
      { status: 404 }
    );
  }

  // ---- Safe insertion (new subdocuments only) ----
  const newApps = apps.map((app: any) => ({
    name: app.name.trim(),
    url: app.url.trim(),
    icon: app.icon || "Link",
  }));

  user.apps.push(...newApps);
  await user.save();

  return Response.json(user.apps);
}
