// src/server/trpc/router/index.ts
import { t } from "../utils";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { timerRouter } from "./timer";

export const appRouter = t.router({
  example: exampleRouter,
  auth: authRouter,
  timer: timerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
