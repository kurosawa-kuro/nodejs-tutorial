// backend\database\prisma\seed\createPosts.ts

import { User, Prisma } from "@prisma/client";
import { db } from "../prismaClient";

export async function createMicroposts(userEntities: User[]) {
  const user = userEntities.filter((user) => !user.admin);

  const microposts = [
    {
      id: 1,
      user_id: user[0].id,
      image_path: "image_url1",
      description: "Description1 posted by User",
    },
    {
      id: 2,
      user_id: user[0].id,
      image_path: "image_url2",
      description: "Description2 posted by User",
    },
    {
      id: 3,
      user_id: user[1].id,
      image_path: "image_url3",
      description: "Description3 posted by User2",
    },
  ];

  await Promise.all(
    microposts.map((micropost) => {
      const { id, user_id, image_path, description } = micropost;
      return db.microposts.create({
        data: {
          id,
          user_id,
          image_path,
          description,
        },
      });
    })
  );

  return await db.microposts.findMany();
}
