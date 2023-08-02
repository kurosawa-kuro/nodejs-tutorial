// backend\database\prisma\seed\createFollows.ts

import { User } from "@prisma/client";
import { db } from "../prismaClient";

export async function createUsersAndFollows() {
  const data = Array.from({ length: 8 }, (_, i) => {
    const userNumber = i + 4;
    return {
      email: `user${userNumber}@email.com`,
      name: `User${userNumber}`,
      password_digest: "123456",
    };
  });

  await db.user.createMany({
    data,
  });

  const users: User[] = await db.user.findMany();

  const follows = [
    {
      follower_id: users[1].id,
      followed_id: users[2].id,
    },
    {
      follower_id: users[1].id,
      followed_id: users[3].id,
    },
    {
      follower_id: users[1].id,
      followed_id: users[4].id,
    },
    {
      follower_id: users[2].id,
      followed_id: users[1].id,
    },
    {
      follower_id: users[2].id,
      followed_id: users[3].id,
    },
    {
      follower_id: users[3].id,
      followed_id: users[4].id,
    },
  ];

  await Promise.all(
    follows.map((follow) => {
      return db.relationships.create({
        data: follow,
      });
    })
  );

  return await db.relationships.findMany();
}
