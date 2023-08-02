// backend\database\prisma\seed\clearDatabase.ts

import { db } from "../prismaClient";

export async function clearDatabase() {
  await db.$executeRaw`SET FOREIGN_KEY_CHECKS=0;`;
  await db.$executeRaw`TRUNCATE TABLE relationships;`;
  await db.$executeRaw`TRUNCATE TABLE tags_on_posts;`;
  await db.$executeRaw`TRUNCATE TABLE microposts;`;
  await db.$executeRaw`TRUNCATE TABLE tag;`;
  await db.$executeRaw`TRUNCATE TABLE user;`;
  await db.$executeRaw`SET FOREIGN_KEY_CHECKS=1;`;
}
