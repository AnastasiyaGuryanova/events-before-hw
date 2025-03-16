import { prisma } from "../db";
import { procedure, router } from "../trpc";
import { z } from "zod";
import bcrypt from "bcrypt";

export const authRouter = router({
  register: procedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(6),
      })
    )
    .mutation(async ({ input }) => {
      const { name, email, password } = input;

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        throw new Error("Пользователь с таким email уже существует");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      return { id: user.id, email: user.email, name: user.name };
    }),
});
