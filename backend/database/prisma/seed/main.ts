// backend\database\prisma\seed\main.ts

import { db } from "../prismaClient";
import { deleteAllData } from "./deleteAllData";
import { createUsers } from "./createUsers";
import { createMicroposts } from "./createMicroposts";
import { createUsersAndFollows } from "./createUsersAndFollows";
import { readPostsByUserId } from "./readSpecificUserPosts";
import { readFollowersByUserId } from "./readFollowersByUserId";
import { readFolloweesByUserId } from "./readFolloweesByUserId";

async function main() {
  try {
    console.log("Starting database clearance...");
    await deleteAllData();
    console.log("Database cleared.");

    console.log("Creating users...");
    const users = await createUsers();
    console.log("Users created. Data:", JSON.stringify(users, null, 2));

    console.log("Creating microposts...");
    const microposts = await createMicroposts(users);
    console.log(
      "Microposts created. Data:",
      JSON.stringify(microposts, null, 2)
    );

    console.log("Creating user follows...");
    const follows = await createUsersAndFollows();
    console.log(
      "User follows created. Data:",
      JSON.stringify(follows, null, 2)
    );

    console.log(`Retrieving posts for user ID: ${users[1].id}...`);
    const userPosts = await readPostsByUserId(users[1].id);
    console.log(
      "Specific user posts retrieved. Data:",
      JSON.stringify(userPosts, null, 2)
    );

    console.log(`Retrieving followers for user ID: ${users[1].id}...`);
    const followers = await readFollowersByUserId(users[1].id);
    console.log(
      "Followers retrieved. Data:",
      JSON.stringify(followers, null, 2)
    );

    console.log(`Retrieving followees for user ID: ${users[1].id}...`);
    const followees = await readFolloweesByUserId(users[1].id);
    console.log(
      "Followees retrieved. Data:",
      JSON.stringify(followees, null, 2)
    );
  } catch (error: any) {
    console.error("An error occurred:", error.meta);
  }
}

main()
  .catch((error: any) => {
    console.error("Uncaught error:", error);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Disconnecting database...");
    await db.$disconnect();
    console.log("Database disconnected.");
  });
