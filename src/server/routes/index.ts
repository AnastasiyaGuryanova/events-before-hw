import { router } from "../trpc";
import { eventRouter } from "./event";
import { authRouter } from "./auth";

export const appRouter = router({
  event: eventRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
