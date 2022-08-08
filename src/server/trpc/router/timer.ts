import { t } from "../utils";
import { z } from "zod";
import { toMiliseconds } from "../../../utils/time";

export const timerRouter = t.router({
  create: t.procedure
    .input(z.object({ due: z.date() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = await ctx.prisma.timer.create({
        data: {
          due: input.due,
        },
      });

      return { id };
    }),
  getById: t.procedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.timer.findFirst({ where: { id: input.id } });
    }),
});
