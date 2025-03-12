import NextAuth from "next-auth";
import { User as DbUser } from "@prisma/client";

declare module "next-auth" {
  interface User {
    id: number;
    name: string;
    email: string;
  }

  interface Session {
    user: {
      id: number;
      email: string;
      name: string;
    };
  }
}
