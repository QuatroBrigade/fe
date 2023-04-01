import { MapPoint } from "./misc/map";
import { UserType } from "./user";

export type PostType = {
  id: number;
  userId: UserType["id"];
  title: string;
  desc: string;
  createdAt: Date;
  location: MapPoint;
  radius: MapPoint[];
};

export type CreatePostType = Pick<
  PostType,
  "userId" | "title" | "desc" | "location"
>;
