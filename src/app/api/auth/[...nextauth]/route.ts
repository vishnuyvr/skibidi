import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { defaultApps } from "@/lib/defaultApps";

export const authOptions: NextAuthOptions =  ({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
  async jwt({ token, account, profile }) {
    if (account && profile) {
      await connectDB();

      const googleProfile = profile as {
        sub: string;
        email: string;
        name?: string;
        picture?: string;
      };

      const email = googleProfile.email;
      const name = googleProfile.name;
      const image = googleProfile.picture;
      const providerId = googleProfile.sub;

      let user = await User.findOne({ email });

      // ✅ FIRST LOGIN → create user + seed apps
      if (!user) {
        user = await User.create({
          provider: "google",
          providerId,
          email,
          name,
          image,
          apps: defaultApps.map(app => ({
            name: app.name,
            url: app.url,
            icon: app.icon,
          })),
        });
      }

      token.userId = user._id.toString();
    }

    return token;
  },

  async session({ session, token }) {
    if (session.user && token.userId) {
      session.user.id = token.userId as string;
    }
    return session;
  },
},
});
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
