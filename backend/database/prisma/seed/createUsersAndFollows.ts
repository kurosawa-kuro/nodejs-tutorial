// backend\database\prisma\seed\createFollows.ts

import { User } from "@prisma/client";
import { db } from "../prismaClient";
import { hashPassword } from "../../../utils";

export async function createUsers() {
  const usersDataPromises = Array.from({ length: 8 }, async (_, i) => {
    const userNumber = i + 4;
    return {
      email: `user${userNumber}@email.com`,
      name: `User${userNumber}`,
      password_digest: await hashPassword("123456"),
    };
  });

  const usersData = await Promise.all(usersDataPromises);

  await db.user.createMany({
    data: usersData,
  });

  return await db.user.findMany();
}

export async function createFollows(users: User[]) {
  const followsData = [
    { follower_id: users[1].id, followed_id: users[2].id },
    { follower_id: users[1].id, followed_id: users[3].id },
    { follower_id: users[1].id, followed_id: users[4].id },
    { follower_id: users[2].id, followed_id: users[1].id },
    { follower_id: users[2].id, followed_id: users[3].id },
    { follower_id: users[3].id, followed_id: users[4].id },
  ];

  await Promise.all(
    followsData.map((follow) => db.relationships.create({ data: follow }))
  );

  return await db.relationships.findMany();
}

export async function createUsersAndFollows() {
  const users = await createUsers();
  const follows = await createFollows(users);
  return follows;
}
