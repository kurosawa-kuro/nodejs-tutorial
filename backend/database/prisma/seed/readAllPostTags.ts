// backend\database\prisma\seed\readAllPostTags.ts

import { db } from "../prismaClient";

export async function readAllPostTags() {
  return await db.tagsOnPosts.findMany({
    include: {
      microposts: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              admin: true,
              created_at: true,
              updated_at: true,
            },
          },
        },
      },
    },
  });
}
