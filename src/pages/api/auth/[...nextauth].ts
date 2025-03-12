import { prisma } from "@/server/db";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user?.password === credentials.password) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      session.user.id = Number(token.sub);
      return session;
    },
  },
};

export default NextAuth(authOptions);
