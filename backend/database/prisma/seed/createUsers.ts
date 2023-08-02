// backend\database\prisma\seed\createUsers.ts

import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { db } from "../prismaClient";
import {
  AdminData,
  UserData,
  User2Data,
  User3Data,
} from "../../../__test__/testData";

export async function createUsers() {
  const users = [
    {
      id: 1,
      name: AdminData.name,
      email: AdminData.email,
      password_digest: AdminData.password_digest,
      admin: AdminData.admin,
    },
    {
      id: 2,
      name: UserData.name,
      email: UserData.email,
      password_digest: UserData.password_digest,
      admin: UserData.admin,
    },
    {
      id: 3,
      name: User2Data.name,
      email: User2Data.email,
      password_digest: User2Data.password_digest,
      admin: User2Data.admin,
    },
    {
      id: 4,
      name: User3Data.name,
      email: User3Data.email,
      password_digest: User3Data.password_digest,
      admin: User3Data.admin,
    },
  ];

  const hashedPasswords = await Promise.all(
    users.map((user) => bcrypt.hash(user.password_digest, 10))
  );

  await Promise.all(
    users.map((user, index) => {
      return db.user.create({
        data: {
          id: user.id,
          name: user.name,
          password_digest: hashedPasswords[index],
          email: user.email,
          admin: user.admin,
        },
      });
    })
  );

  return await db.user.findMany();
}
