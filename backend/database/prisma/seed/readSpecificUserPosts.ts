import { db } from "../prismaClient";

export async function readPostsByUserId(userId: number) {
  const specificUserPosts = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatar_path: true,
      admin: true,
      microposts: {
        select: {
          id: true,
          description: true,
          image_path: true,
        },
      },
    },
  });

  return specificUserPosts && specificUserPosts.microposts
    ? { specificUserPosts }
    : null;
}
