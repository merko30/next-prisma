import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compareSync } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

import prisma from "../../../lib/prisma";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
  },
  secret: "LdVV1NdYmHQPc643xrncw6zJ0TtmEWaBZSEz4GhEgts=",
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Your email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const prisma = new PrismaClient();

        const user = await prisma.user.findFirst({
          where: { email: { equals: credentials!.email } },
        });

        if (!user) {
          throw new Error("Wrong credentials");
        } else {
          if (compareSync(credentials!.password, user.password)) {
            return user;
          }

          throw new Error("Wrong credentials");
        }
      },
    }),
  ],
});
