import { db } from "../prismaClient";

export async function readFolloweesByUserId(followed_id: number) {
  // readFollowedUsersByFollowerId
  // followerIdが3のユーザーがフォローしているユーザーを取得する
  const follows = await db.relationships.findMany({
    where: {
      followed_id,
    },
    include: {
      follower: {
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
  const followedUsers = follows.map((follow) => follow.follower);

  return followedUsers;
}
