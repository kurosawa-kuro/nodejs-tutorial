// backend\database\prisma\seed\createPosts.ts

import { User, Prisma } from "@prisma/client";
import { db } from "../prismaClient";

export async function createPosts(userEntities: User[]) {
  const user = userEntities.filter((user) => !user.admin);

  const posts = [
    {
      id: 1,
      user: user[0].id,
      image_path: "image_url1",
      description: "Description1 posted by User",
    },
    {
      id: 2,
      user: user[0].id,
      image_path: "image_url2",
      description: "Description2 posted by User",
    },
    {
      id: 3,
      user: user[1].id,
      image_path: "image_url3",
      description: "Description3 posted by User2",
    },
  ];

  await Promise.all(
    posts.map((post) => {
      const { id, user, image_path, description } = post;
      return db.microposts.create({
        data: {
          id,
          user_id: user,
          image_path,
          description,
        },
      });
    })
  );

  return await db.microposts.findMany();
}
