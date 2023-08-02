import { db } from "../prismaClient";

export async function readFollowedUsersByFollowerId() {
  // readFollowedUsersByFollowerId
  // followerIdが3のユーザーがフォローしているユーザーを取得する
  const follows = await db.relationships.findMany({
    where: {
      follower_id: 2,
    },
    include: {
      followed: {
        select: {
          id: true,
          name: true,
          email: true,
          avatar_path: true,
          admin: true,
          created_at: true,
          updated_at: true,
        },
      },
    },
  });

  // フォローしているユーザーだけのリストを作成する
  const followedUsers = follows.map((follow) => follow.followed);

  return followedUsers;
}
