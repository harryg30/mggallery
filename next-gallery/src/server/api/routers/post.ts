import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

type searchById = {
  id: string;
};

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        imageUrl: z.string().min(1),
        name: z.string().min(1),
        description: z.string().min(1),
        month: z.number().min(1),
        year: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const finDate = new Date();
      finDate.setMonth(input.month);
      finDate.setFullYear(input.year);

      return ctx.db.post.create({
        data: {
          imageUrl: input.imageUrl,
          title: input.name,
          description: input.description,
          finishedDate: finDate,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getAllPosts: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  byId: publicProcedure.input(z.object({ id: z.string() })).query(({ ctx }) => {
    return ctx.db.post.findFirst({
      where: {},
      orderBy: { createdAt: "desc" },
    });
  }),
});
