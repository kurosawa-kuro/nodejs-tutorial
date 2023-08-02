import { Tag } from "@prisma/client";
import { db } from "../prismaClient";
import { TagWithUserAndPosts } from "../../../interfaces";

export async function readSpecificUserPosts() {
  const specificUserPosts = await db.user.findUnique({
    where: {
      id: 2,
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
