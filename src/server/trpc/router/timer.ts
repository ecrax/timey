import { t } from "../utils";
import { z } from "zod";
import { nanoid } from "nanoid";

export const timerRouter = t.router({
  create: t.procedure
    .input(z.object({ due: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const { shortId } = await ctx.prisma.timer.create({
        data: {
          due: input.due,
          shortId: nanoid(10),
        },
      });

      return { shortId };
    }),
  getById: t.procedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.timer.findFirst({ where: { shortId: input.id } });
    }),
});
