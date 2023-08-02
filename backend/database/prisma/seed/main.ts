// backend\database\prisma\seed\main.ts

import { db } from "../prismaClient";
import { clearDatabase } from "./clearDatabase";
import { createUsers } from "./createUsers";
import { createPosts } from "./createPosts";
import { readSpecificUserPosts } from "./readSpecificUserPosts";
import { createUsersAndFollows } from "./createUsersAndFollows";
import { readFollowersByUserId } from "./readFollowersByUserId";
import { readFolloweesByUserId } from "./readFolloweesByUserId";

async function main() {
  try {
    console.log("Starting to clear database...");
    await clearDatabase();
    console.log("Database cleared.");

    console.log("Starting to create users...");
    const users = await createUsers();
    console.log("Users created:", users);

    console.log("Starting to create posts...");
    const posts = await createPosts(users);
    console.log("Posts created:", posts);

    console.log("Starting to create user follows...");
    const follows = await createUsersAndFollows();
    console.log("User follows created:", follows);

    console.log("Retrieving specific user posts...");
    const userPosts = await readSpecificUserPosts();
    console.log(
      "Specific user posts retrieved",
      JSON.stringify(userPosts, null, 2)
    );

    console.log(`Retrieving followers for user ID: ${users[1].id}...`);
    const followersOfUser = await readFollowersByUserId(users[1].id);
    console.log("Followers retrieved ", followersOfUser);

    console.log(`Retrieving followees for user ID: ${users[1].id}...`);
    const followeesOfUser = await readFolloweesByUserId(users[1].id);
    console.log("Followees retrieved ", followeesOfUser);
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
