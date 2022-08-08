// src/server/trpc/router/index.ts
import { t } from "../utils";
import { timerRouter } from "./timer";

export const appRouter = t.router({
  timer: timerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
